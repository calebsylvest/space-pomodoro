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

// Space theme — dark navy, for users in light OS mode
const light: ColorTokens = {
  background: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  textSecondary: 'rgba(249, 250, 251, 0.4)',
  accent: '#ff6b35',
  accentMuted: 'rgba(255, 107, 53, 0.15)',
  focus: '#ff6b35',
  shortBreak: '#00d4aa',
  longBreak: '#4a8fff',
  border: 'rgba(249, 250, 251, 0.1)',
  destructive: '#ff4040',
};

// Space theme — pure black void
const dark: ColorTokens = {
  background: '#000000',
  surface: '#111111',
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.35)',
  accent: '#ff6b35',
  accentMuted: 'rgba(255, 107, 53, 0.12)',
  focus: '#ff6b35',
  shortBreak: '#00d4aa',
  longBreak: '#4a8fff',
  border: 'rgba(255, 255, 255, 0.08)',
  destructive: '#ff4040',
};

export const Colors: Record<'light' | 'dark', ColorTokens> = { light, dark };
