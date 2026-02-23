import { useEffect } from 'react';
import { Platform } from 'react-native';
import type { Phase } from '@/store/timerStore';
import { formatTime } from '@/utils/format';

const PHASE_SHORT: Record<Phase, string> = {
  focus: 'Focus',
  shortBreak: 'Break',
  longBreak: 'Long Break',
};

export function useDocumentTitle(secondsRemaining: number, phase: Phase, isRunning: boolean) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    if (isRunning) {
      document.title = `${formatTime(secondsRemaining)} · ${PHASE_SHORT[phase]} — Pomodoro Space`;
    } else {
      document.title = 'Pomodoro Space';
    }
  }, [secondsRemaining, phase, isRunning]);

  // Reset title on unmount
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    return () => { document.title = 'Pomodoro Space'; };
  }, []);
}
