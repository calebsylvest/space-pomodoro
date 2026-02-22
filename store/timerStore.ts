import { create } from 'zustand';

export type Phase = 'focus' | 'shortBreak' | 'longBreak';

interface TimerState {
  phase: Phase;
  secondsRemaining: number;
  pomodorosCompleted: number;
  isRunning: boolean;
  setPhase: (phase: Phase) => void;
  setSecondsRemaining: (seconds: number) => void;
  setPomodorosCompleted: (count: number) => void;
  setIsRunning: (running: boolean) => void;
}

// Default focus = 25 min. Settings store drives real defaults at reset time.
export const useTimerStore = create<TimerState>((set) => ({
  phase: 'focus',
  secondsRemaining: 25 * 60,
  pomodorosCompleted: 0,
  isRunning: false,
  setPhase: (phase) => set({ phase }),
  setSecondsRemaining: (secondsRemaining) => set({ secondsRemaining }),
  setPomodorosCompleted: (pomodorosCompleted) => set({ pomodorosCompleted }),
  setIsRunning: (isRunning) => set({ isRunning }),
}));
