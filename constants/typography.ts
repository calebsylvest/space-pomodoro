import { Platform } from 'react-native';

// Space Mono on web (loaded via app/+html.tsx), Courier New as native fallback
export const MONO = Platform.OS === 'web' ? "'Space Mono', monospace" : 'Courier New';
