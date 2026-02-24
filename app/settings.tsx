import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { useSettingsStore } from '@/store/settingsStore';
import { useTimerStore } from '@/store/timerStore';
import { SettingRow } from '@/components/SettingRow';
import { Colors, ColorTokens } from '@/constants/colors';
import { MONO } from '@/constants/typography';

function SectionHeader({ title, colors }: { title: string; colors: ColorTokens }) {
  return (
    <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontFamily: MONO }]}>
      {title.toUpperCase()}
    </Text>
  );
}

export default function SettingsScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'dark'];

  const {
    focusDuration, setFocusDuration,
    shortBreakDuration, setShortBreakDuration,
    longBreakDuration, setLongBreakDuration,
    autoStart, setAutoStart,
    soundEnabled, setSoundEnabled,
    hapticsEnabled, setHapticsEnabled,
    notificationsEnabled, setNotificationsEnabled,
  } = useSettingsStore();

  // When durations change, always reset the active timer to the new full duration
  const { phase, setIsRunning, setSecondsRemaining } = useTimerStore();

  const handleFocusChange = (v: number) => {
    setFocusDuration(v);
    if (phase === 'focus') { setIsRunning(false); setSecondsRemaining(v * 60); }
  };
  const handleShortBreakChange = (v: number) => {
    setShortBreakDuration(v);
    if (phase === 'shortBreak') { setIsRunning(false); setSecondsRemaining(v * 60); }
  };
  const handleLongBreakChange = (v: number) => {
    setLongBreakDuration(v);
    if (phase === 'longBreak') { setIsRunning(false); setSecondsRemaining(v * 60); }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.surface }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Durations */}
        <SectionHeader title="Durations" colors={colors} />
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <SettingRow
            type="stepper"
            label="Focus"
            value={focusDuration}
            min={1} max={90} unit=" min"
            onChange={handleFocusChange}
            colors={colors}
          />
          <SettingRow
            type="stepper"
            label="Short Break"
            value={shortBreakDuration}
            min={1} max={30} unit=" min"
            onChange={handleShortBreakChange}
            colors={colors}
          />
          <SettingRow
            type="stepper"
            label="Long Break"
            value={longBreakDuration}
            min={1} max={60} unit=" min"
            onChange={handleLongBreakChange}
            colors={colors}
          />
        </View>

        {/* Behavior */}
        <SectionHeader title="Behavior" colors={colors} />
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <SettingRow
            type="toggle"
            label="Auto-start Next Session"
            value={autoStart}
            onChange={setAutoStart}
            colors={colors}
          />
        </View>

        {/* Alerts */}
        <SectionHeader title="Alerts" colors={colors} />
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <SettingRow
            type="toggle"
            label="Sound"
            value={soundEnabled}
            onChange={setSoundEnabled}
            colors={colors}
          />
          <SettingRow
            type="toggle"
            label="Haptics"
            value={hapticsEnabled}
            onChange={setHapticsEnabled}
            colors={colors}
          />
          <SettingRow
            type="toggle"
            label="Notifications"
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
            colors={colors}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
});
