import { useEffect } from 'react';
import { Platform } from 'react-native';

interface Shortcuts {
  onStartPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function useKeyboardShortcuts({ onStartPause, onReset, onSkip }: Shortcuts) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          onStartPause();
          break;
        case 'r':
        case 'R':
          onReset();
          break;
        case 's':
        case 'S':
          onSkip();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onStartPause, onReset, onSkip]);
}
