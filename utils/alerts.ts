import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { useSettingsStore } from '@/store/settingsStore';
import type { Phase } from '@/store/timerStore';

const IS_WEB = Platform.OS === 'web';

// Web audio: synthesise a short completion chime using the Web Audio API
function playWebChime() {
  try {
    const ctx = new AudioContext();
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = freq;

      const start = ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.3, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

      osc.start(start);
      osc.stop(start + 0.4);
    });

    // Close context after chime finishes
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // AudioContext not available (e.g. autoplay policy)
  }
}

const PHASE_LABELS: Record<Phase, string> = {
  focus: 'Focus session complete!',
  shortBreak: 'Short break over',
  longBreak: 'Long break over',
};

const PHASE_BODIES: Record<Phase, string> = {
  focus: 'Time for a break. Step away for a moment.',
  shortBreak: 'Ready to focus again?',
  longBreak: "Recharged and ready. Let's go.",
};

// setNotificationHandler is not supported on web
if (!IS_WEB) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function triggerSessionComplete(completedPhase: Phase) {
  const { soundEnabled, hapticsEnabled, notificationsEnabled } =
    useSettingsStore.getState();

  if (soundEnabled && IS_WEB) {
    playWebChime();
  }

  if (hapticsEnabled && !IS_WEB) {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  if (notificationsEnabled && !IS_WEB) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: PHASE_LABELS[completedPhase],
        body: PHASE_BODIES[completedPhase],
        sound: soundEnabled,
      },
      trigger: null,
    });
  }

  // Web fallback: use the browser Notification API if permitted
  if (IS_WEB && notificationsEnabled && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(PHASE_LABELS[completedPhase], {
        body: PHASE_BODIES[completedPhase],
      });
    }
  }
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (IS_WEB) {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}
