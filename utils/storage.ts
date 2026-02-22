import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

// MMKV is not available on web — fall back to localStorage
let mmkvStorage: StateStorage;

if (Platform.OS === 'web') {
  mmkvStorage = {
    getItem: (key) => {
      const value = localStorage.getItem(key);
      return value ?? null;
    },
    setItem: (key, value) => {
      localStorage.setItem(key, value);
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  };
} else {
  const { MMKV } = require('react-native-mmkv');
  const storage = new MMKV({ id: 'pomodoro-space' });

  mmkvStorage = {
    getItem: (key) => {
      const value = storage.getString(key);
      return value ?? null;
    },
    setItem: (key, value) => {
      storage.set(key, value);
    },
    removeItem: (key) => {
      storage.delete(key);
    },
  };
}

export { mmkvStorage };
