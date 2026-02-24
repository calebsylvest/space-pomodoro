# Tasks

Status markers: `[ ]` todo · `[x]` done · `[-]` in progress · `[~]` deferred

> **Platform priority:** Desktop web first (Phases 1–3). Mobile (Expo Go, EAS builds, native notifications, haptics, widgets, background timer) is deferred to Phase 4.

---

## Phase 1 — Core Timer

### Completed
- [x] Project scaffolding (Expo 52, TypeScript, Expo Router)
- [x] Pomodoro cycle logic (focus → short break → long break)
- [x] Countdown display (MM:SS)
- [x] Animated progress ring (SVG, CSS transition on web / Reanimated on native)
- [x] Start / Pause / Reset / Skip controls
- [x] Pomodoro dot counter
- [x] Settings screen (durations, auto-start, sound, haptics, notifications)
- [x] Persistent settings (MMKV on device, localStorage on web)
- [x] Light / dark mode (system preference)
- [x] Web support (Expo Web, localStorage fallback)
- [x] Push notifications on session complete (native)
- [x] Browser Notification API fallback (web)
- [x] Haptic feedback on session complete (native)

### Remaining
- [x] **Audio** — Web Audio API chime wired in `utils/alerts.ts`; respects `soundEnabled` setting
- [x] **Browser tab title** — implemented in `hooks/useDocumentTitle.ts`; updates every second while running
- [~] **Background timer** — deferred to Phase 4 (mobile)
- [~] **Prevent sleep** — deferred to Phase 4 (mobile)
- [~] **Mobile smoke test** — deferred to Phase 4 (mobile)

---

## Phase 2 — Space Theme

### Design
- [ ] Define solar system destinations (8–10 planets / moons / stations with names)
- [ ] Choose visual style (pixel art vs. illustrated vs. minimal vector)
- [ ] Typography and color system finalized
- [ ] App icon design (currently a placeholder solid color)
- [ ] Splash screen design

### Animations & Visuals
- [ ] Starfield background (parallax scrolling star layers)
- [ ] Ship sprite / illustration
- [ ] Ship travel animation during focus session (ship moves toward destination as time elapses)
- [ ] Orbit / docking animation during short break
- [ ] Planet surface / rest animation during long break
- [ ] Planet arrival animation on session completion
- [ ] Phase transition animation (ship enters orbit, then lands)

### Narrative Layer
- [ ] Phase labels → themed copy: "Traveling to Mars" / "Orbiting Mars" / "Docked at Mars"
- [ ] Session type determines destination (focus = next planet, breaks = orbit/dock)
- [ ] Mission log screen — list of completed sessions shown as "destinations reached"
- [ ] Mission log entry: planet name, session duration, timestamp

### Audio
- [ ] Ambient space audio (toggleable, loops during focus)
- [ ] Distinct arrival chime per planet
- [ ] Break audio (softer, ambient)

---

## Phase 3 — Progression & Retention

### Campaign Mode
- [ ] Fixed solar system journey map (linear route through all destinations)
- [ ] Daily pomodoros advance the ship along the route
- [ ] Journey progress persists across app sessions
- [ ] Visual map screen showing current position and upcoming destinations

### Stats & Goals
- [ ] Total sessions completed (lifetime)
- [ ] Total focus time (lifetime, formatted as hours)
- [ ] Planets visited count
- [ ] Current streak (days with ≥1 completed pomodoro)
- [ ] Longest streak
- [ ] Daily goal setting (e.g. "complete 4 pomodoros today")
- [ ] Daily goal progress indicator on timer screen

### Retention Hooks
- [ ] Onboarding flow (2–3 screens explaining the space metaphor on first launch)
- [ ] Streak reminder notification (opt-in)
- [ ] Unlockable ship variants (earned by milestones, not purchases)

### Widgets
- [~] iOS widget — deferred to Phase 4 (mobile)
- [~] Android widget — deferred to Phase 4 (mobile)

---

## Future — History

A ledger of all completed sessions, stored locally.

### Data Model
- [ ] Define session record schema: `{ id, phase, duration, completedAt, destination? }`
- [ ] Session log store (Zustand + MMKV) — append on each completed session
- [ ] Cap or paginate stored records (e.g. keep last 365 days)

### History Screen
- [ ] Chronological list of sessions grouped by day
- [ ] Each entry shows: session type (focus/break), duration, time of day, destination (phase 2)
- [ ] Daily summary row: total focus time, pomodoros completed
- [ ] Empty state for new users
- [ ] Clear history option (with confirmation)

### Filtering & Navigation
- [ ] Filter by session type (focus only, breaks only, all)
- [ ] Jump to a specific date (calendar picker or month/week toggle)
- [ ] Infinite scroll or pagination for older records

---

## Future — Stats

Data views and charts derived from the session history.

### Summary Cards
- [ ] Today: sessions completed, total focus time, goal progress
- [ ] This week: sessions, focus time, avg sessions/day
- [ ] All time: total sessions, total focus hours, longest streak, current streak, planets visited (phase 2)

### Charts
- [ ] Daily focus time — bar chart, last 7 / 30 days
- [ ] Sessions per day — bar chart, last 7 / 30 days
- [ ] Time of day heatmap — when during the day the user tends to focus
- [ ] Streak calendar — GitHub-style contribution grid (days with sessions highlighted)
- [ ] Weekly trend line — rolling average over time

### Chart Library
- [ ] Evaluate charting options for Expo Web: `victory-native`, `react-native-chart-kit`, or a web-only lib like `recharts` behind a Platform guard
- [ ] Decide on a library before building any charts

### Export
- [ ] Export session history as CSV (web: download, mobile: share sheet)

---

## Phase 4 — Distribution

### Mobile *(deferred — desktop-first)*
- [~] EAS Build configuration (`eas.json`)
- [~] Real app icon (1024×1024, all sizes generated)
- [~] Real splash screen
- [~] iOS TestFlight build and internal testing
- [~] App Store submission
- [~] Google Play submission

### Web
- [ ] Production deployment (Vercel or similar)
- [ ] Custom domain
- [ ] `<meta>` tags / Open Graph for sharing

### Operational
- [ ] Crash reporting (Sentry)
- [ ] Privacy-respecting analytics (Plausible or PostHog)
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] Landing page (links to app stores + web app)

---

## Bugs & Polish

- [x] ~~Notifications crash on web~~ — `expo-notifications` not supported on web; fixed with `Platform` guard + browser Notification API fallback
- [x] ~~Progress ring fills on load~~ — Reanimated SVG init issue on web; fixed with CSS transition approach
- [x] ~~Timer ignores persisted settings on load~~ — timer store hardcoded 25:00; fixed with mount sync from settings
- [x] **Settings don't reset timer when changed mid-session** — settings changes immediately call `setSecondsRemaining` in `app/settings.tsx`
- [x] **Long break counter display** — dots reset correctly via `positionInCycle % total` logic in `components/PomodoroCounter.tsx`
- [x] **No "session complete" screen** — bottom banner implemented in `app/index.tsx`; shows for 2.5s with phase-specific message
- [ ] **Web: settings opens as page, not modal** — on web, modal presentation pushes to a full page; acceptable for now but could be improved

---

## Technical Debt

- [ ] Add ESLint config
- [ ] Add Prettier config
- [ ] `npm install --legacy-peer-deps` required due to RN peer dep conflicts — evaluate upgrade path to Expo 53/54
- [ ] `react-native-screens` version mismatch warning (installed 4.23, Expo 52 expects ~4.4.0)
- [ ] Placeholder PNG assets need replacing with real designed assets before any public release
- [ ] No tests — at minimum, unit test the timer state machine in `useTimer.ts`
