import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';

interface SettingsState {
  focusDuration: number;        // minutes
  shortBreakDuration: number;   // minutes
  longBreakDuration: number;    // minutes
  pomodorosBeforeLong: number;
  autoStart: boolean;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  notificationsEnabled: boolean;
  setFocusDuration: (v: number) => void;
  setShortBreakDuration: (v: number) => void;
  setLongBreakDuration: (v: number) => void;
  setPomodorosBeforeLong: (v: number) => void;
  setAutoStart: (v: boolean) => void;
  setSoundEnabled: (v: boolean) => void;
  setHapticsEnabled: (v: boolean) => void;
  setNotificationsEnabled: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      pomodorosBeforeLong: 4,
      autoStart: false,
      soundEnabled: true,
      hapticsEnabled: true,
      notificationsEnabled: true,
      setFocusDuration: (focusDuration) => set({ focusDuration }),
      setShortBreakDuration: (shortBreakDuration) => set({ shortBreakDuration }),
      setLongBreakDuration: (longBreakDuration) => set({ longBreakDuration }),
      setPomodorosBeforeLong: (pomodorosBeforeLong) => set({ pomodorosBeforeLong }),
      setAutoStart: (autoStart) => set({ autoStart }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
