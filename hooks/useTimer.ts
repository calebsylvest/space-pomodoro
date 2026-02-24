import { useEffect, useRef, useCallback } from 'react';
import { useTimerStore } from '@/store/timerStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useTravelStore } from '@/store/travelStore';
import { getPath } from '@/data/paths';
import { triggerSessionComplete } from '@/utils/alerts';

export function useTimer() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    phase,
    secondsRemaining,
    pomodorosCompleted,
    isRunning,
    setIsRunning,
    setSecondsRemaining,
    setPhase,
    setPomodorosCompleted,
    setJustCompleted,
  } = useTimerStore();

  const { focusDuration, shortBreakDuration, longBreakDuration, autoStart } = useSettingsStore();

  const { currentPathId } = useTravelStore();
  const cycleLength = currentPathId ? (getPath(currentPathId)?.nodes.length ?? 4) : 4;

  // Sync timer to persisted settings on first mount (MMKV is synchronous, so
  // settings are already hydrated by the time this runs).
  useEffect(() => {
    if (!isRunning) {
      const { focusDuration, shortBreakDuration, longBreakDuration } =
        useSettingsStore.getState();
      const durations: Record<typeof phase, number> = {
        focus: focusDuration * 60,
        shortBreak: shortBreakDuration * 60,
        longBreak: longBreakDuration * 60,
      };
      setSecondsRemaining(durations[phase]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount only

  const durationForPhase = useCallback(
    (p: typeof phase) => {
      if (p === 'focus') return focusDuration * 60;
      if (p === 'shortBreak') return shortBreakDuration * 60;
      return longBreakDuration * 60;
    },
    [focusDuration, shortBreakDuration, longBreakDuration],
  );

  const advance = useCallback(() => {
    const newCompleted =
      phase === 'focus' ? pomodorosCompleted + 1 : pomodorosCompleted;

    let nextPhase: typeof phase;
    if (phase === 'focus') {
      nextPhase =
        newCompleted % cycleLength === 0 ? 'longBreak' : 'shortBreak';
    } else {
      nextPhase = 'focus';
    }

    if (phase === 'focus') {
      useTravelStore.getState().advanceDistance();
    }

    triggerSessionComplete(phase);
    setJustCompleted(phase);
    setTimeout(() => setJustCompleted(null), 2500);

    setPomodorosCompleted(newCompleted);
    setPhase(nextPhase);
    setSecondsRemaining(durationForPhase(nextPhase));
    setIsRunning(autoStart);
  }, [
    phase,
    pomodorosCompleted,
    cycleLength,
    autoStart,
    durationForPhase,
    setPomodorosCompleted,
    setPhase,
    setSecondsRemaining,
    setIsRunning,
    setJustCompleted,
  ]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const current = useTimerStore.getState().secondsRemaining;
      if (current <= 1) {
        useTimerStore.setState({ secondsRemaining: 0 });
        if (intervalRef.current) clearInterval(intervalRef.current);
        advance();
      } else {
        useTimerStore.setState({ secondsRemaining: current - 1 });
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, advance]);

  const start = useCallback(() => setIsRunning(true), [setIsRunning]);
  const pause = useCallback(() => setIsRunning(false), [setIsRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsRemaining(durationForPhase(phase));
  }, [setIsRunning, setSecondsRemaining, durationForPhase, phase]);

  const skipPhase = useCallback(() => {
    setIsRunning(false);
    advance();
  }, [setIsRunning, advance]);

  const progress =
    1 - secondsRemaining / durationForPhase(phase);

  return {
    phase,
    secondsRemaining,
    pomodorosCompleted,
    isRunning,
    progress,
    start,
    pause,
    reset,
    skipPhase,
  };
}
