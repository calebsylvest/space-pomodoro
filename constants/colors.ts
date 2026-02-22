export interface ColorTokens {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentMuted: string;
  focus: string;
  shortBreak: string;
  longBreak: string;
  border: string;
  destructive: string;
}

const light: ColorTokens = {
  background: '#f5f5f0',
  surface: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#6b6b80',
  accent: '#7c6aff',
  accentMuted: '#c4beff',
  focus: '#7c6aff',
  shortBreak: '#4CAF82',
  longBreak: '#2196CF',
  border: '#e0e0e8',
  destructive: '#e05c5c',
};

const dark: ColorTokens = {
  background: '#0a0a1a',
  surface: '#12122a',
  text: '#e8e8f0',
  textSecondary: '#8888a0',
  accent: '#7c6aff',
  accentMuted: '#3d3580',
  focus: '#7c6aff',
  shortBreak: '#4CAF82',
  longBreak: '#2196CF',
  border: '#1e1e38',
  destructive: '#e05c5c',
};

export const Colors: Record<'light' | 'dark', ColorTokens> = { light, dark };
