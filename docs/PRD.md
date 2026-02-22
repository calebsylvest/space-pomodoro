# PRD: Space Explorer Pomodoro Timer

## Overview

A themed Pomodoro timer app built around space exploration. Each focus session represents your ship traveling between planets — you watch your progress unfold as you work, and the ship arrives when the session ends. The experience is polished, meditative, and motivating.

**Target platforms:** iOS/Android (primary), Web (development + secondary use)
**Tech stack:** React Native (Expo) for mobile-first delivery; the same codebase renders in a browser via Expo Web during development and as a deployed web app.

---

## Product Goals

- Deliver a focused, distraction-free Pomodoro timer that works reliably
- Use the space travel metaphor as a motivational layer, not a distraction
- Ship a small, polished product — avoid feature bloat
- Enable web use during development; maintain parity post-launch

---

## User Stories

- As a user, I want to start a 25-minute focus session so I can work with intention
- As a user, I want to see visual progress so I stay motivated to finish
- As a user, I want short and long breaks managed automatically so I don't have to track cycles
- As a user, I want to know which "planet" I'm heading to so each session feels purposeful
- As a user, I want a notification when my session ends so I can step away from the screen
- As a user, I want to customize session lengths to match my workflow

---

## Phases

### Phase 1 — Core Timer (Functional Foundation)

**Goal:** Build a reliable, well-tested Pomodoro timer. Theme is minimal — placeholder UI only. This phase is complete when the timer works perfectly as a standalone product.

**Scope:**

- [ ] Project scaffolding with Expo (React Native + Web support)
- [ ] Timer screen with start / pause / reset controls
- [ ] Standard Pomodoro cycle logic:
  - 25-min focus → 5-min short break → repeat
  - After 4 pomodoros → 15-min long break
  - Pomodoro counter persists within a session
- [ ] Countdown display (MM:SS)
- [ ] Visual progress indicator (ring or bar)
- [ ] Audio/haptic alert on session completion
- [ ] Push notification on session end (foreground + background)
- [ ] Settings screen:
  - Focus duration (default 25 min)
  - Short break duration (default 5 min)
  - Long break duration (default 15 min)
  - Pomodoros before long break (default 4)
  - Toggle: auto-start next session
- [ ] Persistent settings (AsyncStorage or MMKV)
- [ ] Basic light/dark mode support
- [ ] Web parity — all features work in browser via Expo Web

**Deliverable:** A fully functional Pomodoro timer deployed to Expo Go and accessible via a web URL for testing.

---

### Phase 2 — Space Theme (Visual Identity)

**Goal:** Layer the space exploration narrative onto the working timer. The ship travels during focus sessions; the destination is a planet. Visual design locks in.

**Scope:**

- [ ] Define the solar system map (8–10 destinations: planets, moons, a space station)
- [ ] Each session type has a destination assignment:
  - Focus → traveling toward next planet
  - Short break → orbiting / docking
  - Long break → planet surface / rest stop
- [ ] Animated ship travel progress (parallax starfield, ship icon moving toward destination)
- [ ] Planet arrival animation on session completion
- [ ] Session label: "Traveling to [Planet]" / "Orbiting [Planet]" / "Docked at [Planet]"
- [ ] Mission log: a simple list of completed sessions shown as "destinations reached"
- [ ] Sound design: ambient space audio (toggleable), arrival chime
- [ ] App icon, splash screen, and overall visual polish
- [ ] Typography and color system finalized

**Deliverable:** Themed app that feels cohesive. Core mechanics unchanged from Phase 1.

---

### Phase 3 — Progression & Retention

**Goal:** Give users a reason to return. Introduce light progression tied to the space metaphor without gamification overload.

**Scope:**

- [ ] Campaign mode: a fixed journey through the solar system
  - Each day's completed pomodoros advance your ship along the route
  - Progress persists across app sessions
- [ ] "Distance traveled" stats: total sessions, total focus time, planets visited
- [ ] Daily goal setting (e.g. "4 pomodoros today")
- [ ] Streak tracking (days with at least 1 completed pomodoro)
- [ ] Unlockable ships or cosmetic variants (earned by milestones, not purchases)
- [ ] Simple onboarding flow explaining the space metaphor
- [ ] Widget support (iOS/Android) showing current streak or today's progress

**Deliverable:** A product users return to daily with meaningful progress feedback.

---

### Phase 4 — Polish & Distribution

**Goal:** Prepare for app store submission and public web launch.

**Scope:**

- [ ] App Store and Google Play submission (Expo EAS Build)
- [ ] Web app deployed to production (Vercel or similar)
- [ ] Privacy policy and terms of service pages
- [ ] Crash reporting (Sentry)
- [ ] Analytics (privacy-respecting: Plausible or PostHog)
- [ ] Performance audit and accessibility review
- [ ] App Store screenshots and preview video
- [ ] Landing page (basic, links to app stores + web app)

---

## Technical Notes

### Stack
- **Framework:** Expo (React Native + Expo Web)
- **Language:** TypeScript
- **Navigation:** Expo Router (file-based)
- **Storage:** MMKV (fast, synchronous key-value)
- **Animations:** React Native Reanimated + Skia (for canvas-based space visuals)
- **Audio:** Expo AV
- **Notifications:** Expo Notifications
- **Build/Deploy:** EAS Build for mobile, Vercel for web

### Constraints
- Phase 1 must not depend on any theme assets — keep concerns separated
- No backend required through Phase 3; all data is local
- Expo SDK version pinned at project start; avoid mid-project upgrades

---

## Out of Scope (v1)

- Accounts / cloud sync
- Social features / sharing sessions
- Subscription / IAP (revisit post-launch based on traction)
- Custom planet/theme creation
- Apple Watch / Wear OS companion
- Task list integration (keep the app focused on timing)

---

## Success Metrics

- Phase 1: Timer runs correctly for 100+ consecutive cycles with no state bugs
- Phase 2: 5 users complete a full day's sessions without confusion about the theme
- Phase 3: 30-day retention > 20%
- Phase 4: App Store approval on first submission
