# Space Pomodoro

A space-themed Pomodoro timer. Each focus session is your ship traveling between planets — watch your progress unfold as you work, and arrive at your destination when the session ends.

Built with Expo (React Native + Web), targeting iOS, Android, and browser.

## Status

- [x] Phase 1 — Core timer
- [ ] Phase 2 — Space theme
- [ ] Phase 3 — Progression & retention
- [ ] Phase 4 — Distribution

## Running locally

```bash
npm install --legacy-peer-deps

npm start          # Expo Go (scan QR)
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Browser at localhost:8081
```

## Stack

- [Expo](https://expo.dev) (SDK 52) + React Native
- [Expo Router](https://expo.github.io/router) — file-based navigation
- [Zustand](https://zustand-demo.pmnd.rs) — state management
- [MMKV](https://github.com/mrousavy/react-native-mmkv) — persistent storage
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/) + [react-native-svg](https://github.com/software-mansion/react-native-svg) — animated progress ring
- [Expo Notifications](https://docs.expo.dev/push-notifications/overview/) — session completion alerts

## Project structure

```
app/
  _layout.tsx       # Root layout, navigation config
  index.tsx         # Timer screen
  settings.tsx      # Settings modal
components/
  ProgressRing.tsx  # Animated SVG progress ring
  PomodoroCounter.tsx
  SettingRow.tsx
hooks/
  useTimer.ts       # Pomodoro state machine
store/
  timerStore.ts     # Runtime timer state
  settingsStore.ts  # Persisted user settings
utils/
  alerts.ts         # Haptics, notifications, web Notification API
  storage.ts        # MMKV / localStorage adapter
  format.ts         # MM:SS formatter
docs/
  PRD.md            # Product requirements
  IDEA.md           # Original concept notes
```
