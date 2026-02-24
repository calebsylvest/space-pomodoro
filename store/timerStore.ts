import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';

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

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'timer',
      storage: createJSONStorage(() => mmkvStorage),
      // Only persist cycle progress — not running state or transient completion flag
      partialize: (state) => ({
        phase: state.phase,
        pomodorosCompleted: state.pomodorosCompleted,
      }),
    },
  ),
);
