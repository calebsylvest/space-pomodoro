import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { Link } from 'expo-router';
import { useTimer } from '@/hooks/useTimer';
import { useSettingsStore } from '@/store/settingsStore';
import { ProgressRing } from '@/components/ProgressRing';
import { PomodoroCounter } from '@/components/PomodoroCounter';
import { Colors } from '@/constants/colors';
import { formatTime } from '@/utils/format';
import { requestNotificationPermissions } from '@/utils/alerts';

const PHASE_LABELS = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

const RING_SIZE = 280;
const STROKE_WIDTH = 12;

export default function TimerScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'dark'];
  const { pomodorosBeforeLong } = useSettingsStore();

  const {
    phase,
    secondsRemaining,
    pomodorosCompleted,
    isRunning,
    progress,
    start,
    pause,
    reset,
    skipPhase,
  } = useTimer();

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const phaseColor = colors[phase as keyof typeof colors] as string;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.appTitle, { color: colors.textSecondary }]}>
            POMODORO SPACE
          </Text>
          <Link href="/settings" asChild>
            <Pressable hitSlop={12}>
              <Text style={[styles.settingsIcon, { color: colors.textSecondary }]}>⚙</Text>
            </Pressable>
          </Link>
        </View>

        {/* Phase label */}
        <Text style={[styles.phaseLabel, { color: phaseColor }]}>
          {PHASE_LABELS[phase].toUpperCase()}
        </Text>

        {/* Ring + timer */}
        <View style={styles.ringContainer}>
          <ProgressRing
            progress={progress}
            size={RING_SIZE}
            strokeWidth={STROKE_WIDTH}
            color={phaseColor}
            trackColor={colors.border}
          />
          <View style={styles.timerOverlay}>
            <Text style={[styles.timerText, { color: colors.text }]}>
              {formatTime(secondsRemaining)}
            </Text>
            <Text style={[styles.sessionCount, { color: colors.textSecondary }]}>
              Session {Math.floor(pomodorosCompleted / pomodorosBeforeLong) + 1}
            </Text>
          </View>
        </View>

        {/* Pomodoro dots */}
        <PomodoroCounter
          completed={pomodorosCompleted}
          total={pomodorosBeforeLong}
          color={phaseColor}
          trackColor={colors.border}
        />

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable
            style={[styles.secondaryButton, { borderColor: colors.border }]}
            onPress={reset}
            hitSlop={8}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
              Reset
            </Text>
          </Pressable>

          <Pressable
            style={[styles.primaryButton, { backgroundColor: phaseColor }]}
            onPress={isRunning ? pause : start}
          >
            <Text style={styles.primaryButtonText}>
              {isRunning ? 'Pause' : 'Start'}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.secondaryButton, { borderColor: colors.border }]}
            onPress={skipPhase}
            hitSlop={8}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
              Skip
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  settingsIcon: {
    fontSize: 22,
  },
  phaseLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 8,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 64,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
    letterSpacing: -2,
  },
  sessionCount: {
    fontSize: 13,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  primaryButton: {
    width: 120,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButton: {
    width: 72,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
