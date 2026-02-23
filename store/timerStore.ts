import { create } from 'zustand';

export type Phase = 'focus' | 'shortBreak' | 'longBreak';

interface TimerState {
  phase: Phase;
  secondsRemaining: number;
  pomodorosCompleted: number;
  isRunning: boolean;
  justCompleted: Phase | null;
  setPhase: (phase: Phase) => void;
  setSecondsRemaining: (seconds: number) => void;
  setPomodorosCompleted: (count: number) => void;
  setIsRunning: (running: boolean) => void;
  setJustCompleted: (phase: Phase | null) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  phase: 'focus',
  secondsRemaining: 25 * 60,
  pomodorosCompleted: 0,
  isRunning: false,
  justCompleted: null,
  setPhase: (phase) => set({ phase }),
  setSecondsRemaining: (secondsRemaining) => set({ secondsRemaining }),
  setPomodorosCompleted: (pomodorosCompleted) => set({ pomodorosCompleted }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setJustCompleted: (justCompleted) => set({ justCompleted }),
}));
