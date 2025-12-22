# Aura Home – React Native App (Scaffold)

This folder contains the starting point for a React Native (Expo) client that mirrors the Apple-like home automation experience:

- **Tabs**: Home, Devices, Scenes, Video, Assistant.
- **Foundations**: basic design tokens, layout primitives, and screen placeholders wired through React Navigation.
- **Next steps**: add real device data via your backend, integrate ChatGPT function-calling in the Assistant, and wire WebRTC/HLS for live camera views.

## Quick start
1) Install dependencies (from this folder): `npm install` or `pnpm install`.
2) Start the app: `npx expo start` (press `i` for iOS simulator, `a` for Android emulator, or scan QR with Expo Go).
3) Edit screens in `src/screens/` and shared UI in `src/components/`.

## Notes
- Expo managed workflow; adjust `app.json` for bundle ID, icons, splash, and permissions (camera/mic/location for presence/geofence).
- React Navigation is set up with a bottom tab navigator and per-screen stacks to expand later.
