import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { useTimer } from '@/hooks/useTimer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useSettingsStore } from '@/store/settingsStore';
import { useTimerStore } from '@/store/timerStore';
import { ProgressRing } from '@/components/ProgressRing';
import { PomodoroCounter } from '@/components/PomodoroCounter';
import { Starfield } from '@/components/Starfield';
import { Colors } from '@/constants/colors';
import { MONO } from '@/constants/typography';
import { formatTime } from '@/utils/format';
import { requestNotificationPermissions } from '@/utils/alerts';

const PHASE_LABELS = {
  focus: 'In Transit',
  shortBreak: 'In Orbit',
  longBreak: 'Docked',
};

const COMPLETION_MESSAGES = {
  focus: 'Destination reached',
  shortBreak: 'Orbit complete',
  longBreak: 'Rest complete',
};

const DESKTOP_BREAKPOINT = 768;

export default function TimerScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'dark'];
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= DESKTOP_BREAKPOINT;

  const { pomodorosBeforeLong } = useSettingsStore();
  const { justCompleted } = useTimerStore();

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

  useDocumentTitle(secondsRemaining, phase, isRunning);

  useKeyboardShortcuts({
    onStartPause: isRunning ? pause : start,
    onReset: reset,
    onSkip: skipPhase,
  });

  const phaseColor = colors[phase as keyof typeof colors] as string;
  const ringSize = isDesktop ? 320 : 280;
  const missionNumber = Math.floor(pomodorosCompleted / pomodorosBeforeLong) + 1;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Starfield />

      {/* Header */}
      <View style={[styles.header, isDesktop && styles.headerDesktop]}>
        <Text style={[styles.appTitle, { color: colors.textSecondary, fontFamily: MONO }]}>
          POMODORO SPACE
        </Text>
        <View style={styles.headerRight}>
          {isDesktop && (
            <Text style={[styles.shortcutHint, { color: colors.textSecondary, fontFamily: MONO }]}>
              Space · R · S
            </Text>
          )}
          <Link href="/settings" asChild>
            <Pressable hitSlop={12} style={styles.settingsBtn}>
              <Text style={[styles.settingsIcon, { color: colors.textSecondary }]}>⚙</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Main content */}
      <View style={[styles.content, isDesktop && styles.contentDesktop]}>
        {/* Left / top: ring */}
        <View style={styles.ringSection}>
          <ProgressRing
            progress={progress}
            size={ringSize}
            strokeWidth={isDesktop ? 14 : 12}
            color={phaseColor}
            trackColor={colors.border}
          />
          <View style={[styles.timerOverlay, { width: ringSize, height: ringSize }]}>
            <Text style={[styles.timerText, { color: colors.text, fontFamily: MONO }]}>
              {formatTime(secondsRemaining)}
            </Text>
            <Text style={[styles.missionCount, { color: colors.textSecondary, fontFamily: MONO }]}>
              / Mission {missionNumber}
            </Text>
          </View>
        </View>

        {/* Right / bottom: info + controls */}
        <View style={[styles.controlSection, isDesktop && styles.controlSectionDesktop]}>
          {/* Phase label */}
          <Text style={[styles.phaseLabel, { color: phaseColor, fontFamily: MONO }, isDesktop && styles.phaseLabelDesktop]}>
            {PHASE_LABELS[phase].toUpperCase()}
          </Text>

          {/* Pomodoro dots */}
          <PomodoroCounter
            completed={pomodorosCompleted}
            total={pomodorosBeforeLong}
            phase={phase}
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
              <Text style={[styles.secondaryButtonText, { color: colors.textSecondary, fontFamily: MONO }]}>
                Reset
              </Text>
              {isDesktop && (
                <Text style={[styles.keyHint, { color: colors.textSecondary, fontFamily: MONO }]}>R</Text>
              )}
            </Pressable>

            <Pressable
              style={[styles.primaryButton, { backgroundColor: phaseColor }]}
              onPress={isRunning ? pause : start}
            >
              <Text style={[styles.primaryButtonText, { fontFamily: MONO }]}>
                {isRunning ? 'Pause' : 'Start'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.secondaryButton, { borderColor: colors.border }]}
              onPress={skipPhase}
              hitSlop={8}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.textSecondary, fontFamily: MONO }]}>
                Skip
              </Text>
              {isDesktop && (
                <Text style={[styles.keyHint, { color: colors.textSecondary, fontFamily: MONO }]}>S</Text>
              )}
            </Pressable>
          </View>

          {/* Desktop: keyboard shortcut hint for space bar */}
          {isDesktop && (
            <Text style={[styles.spaceHint, { color: colors.textSecondary, fontFamily: MONO }]}>
              Space to start / pause
            </Text>
          )}
        </View>
      </View>

      {/* Session complete banner */}
      {justCompleted && (
        <View style={[
          styles.completionBanner,
          { backgroundColor: colors[justCompleted as keyof typeof colors] as string },
        ]}>
          <Text style={[styles.completionText, { fontFamily: MONO }]}>
            {COMPLETION_MESSAGES[justCompleted]}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  headerDesktop: {
    paddingHorizontal: 40,
    paddingTop: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  appTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
  shortcutHint: {
    fontSize: 11,
    letterSpacing: 1.5,
    opacity: 0.5,
  },
  settingsBtn: {},
  settingsIcon: {
    fontSize: 22,
  },
  // Mobile: vertical stack
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  // Desktop: horizontal split, centered vertically
  contentDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 80,
    paddingHorizontal: 80,
    paddingBottom: 0,
  },
  ringSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 64,
    fontWeight: '400',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  missionCount: {
    fontSize: 11,
    marginTop: 8,
    letterSpacing: 2,
    opacity: 0.6,
  },
  controlSection: {
    alignItems: 'center',
    gap: 28,
  },
  controlSectionDesktop: {
    alignItems: 'flex-start',
    minWidth: 260,
  },
  phaseLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
  },
  phaseLabelDesktop: {
    fontSize: 13,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    fontWeight: '700',
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
    fontWeight: '400',
  },
  keyHint: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.5,
    marginTop: 2,
  },
  spaceHint: {
    fontSize: 11,
    letterSpacing: 0.5,
    opacity: 0.4,
  },
  completionBanner: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  completionText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
