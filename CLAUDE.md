# Claude Instructions — Pomodoro Space

## Working Style
- Work autonomously without checking in for routine decisions
- Prefer editing existing files over creating new ones
- Keep solutions simple; don't over-engineer or add unrequested features
- Never auto-commit; always let the user trigger commits explicitly

## Docs
- `docs/IDEA.md` — original concept
- `docs/PRD.md` — product requirements
- `docs/memory/` — Claude's persistent session notes (not project docs)

## Stack
- Expo (React Native + Expo Web), TypeScript, Expo Router
- MMKV for storage, Reanimated + Skia for animations
- EAS Build for mobile distribution

## Approved Actions (no confirmation needed)
- All file reads, writes, and edits within this project
- Running: `npm`, `npx`, `expo`, `eas`, `tsc`, `jest`, `prettier`, `eslint`
- Running: `git status`, `git diff`, `git log`, `git add`, `git stash`
- Creating directories and project scaffold files

## Always Confirm
- `git commit` — user triggers commits explicitly
- `git push` — never push without explicit instruction
- `npm install <package>` for packages not already in use — confirm the package first
- Any action that affects files outside this project directory
