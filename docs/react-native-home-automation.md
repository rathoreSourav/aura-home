# React Native Home Automation App Blueprint

This document captures a React Native-first plan to build an Apple-quality home automation experience with device control, intelligent assistance (ChatGPT), live video, and rich notifications.

## Stack and platform choices
- **Runtime**: React Native 0.74+ (Expo or bare, depending on native dependencies like WebRTC). TypeScript everywhere.
- **Navigation**: React Navigation (stack + bottom tabs; native stack for performance, nested stacks for device/automation flows).
- **State/data**: React Query for server cache + Zustand/Jotai for client UI state (panels, wizards, sheet visibility). Persist critical slices with `mmkv` or `@react-native-async-storage`.
- **Styling**: NativeWind (Tailwind in RN) or Tamagui for design tokens; use a design-system layer for typography, spacing, corner radii, blur/glass effects, and haptics.
- **Networking**: Axios/Fetch for HTTP; `expo-websocket` or `@microsoft/signalr`/native WebSocket for realtime device updates.
- **Media**: `react-native-webrtc` for two-way streams; HLS fallback with `react-native-video`.
- **Notifications**: `expo-notifications` (managed) or Notifee + FCM/APNs (bare) for rich push with thumbnails/action buttons.
- **Background**: Task Manager/Headless JS for background sync + geofencing; keep payloads small and leverage server-driven throttling.
- **AI**: OpenAI Chat Completions w/ function calling for device control, scene activation, automation authoring, and camera requests.

## App architecture
```
src/
  app/ (navigation containers, linking, deep links)
  design/ (tokens, components, theming, haptics)
  features/
    devices/ (lists, detail sheets, capability controls)
    scenes/ (create/run scenes)
    automations/ (builder, schedule, geofence)
    video/ (live view, playback, alerts)
    assistant/ (chat UI, intent router)
    presence/ (geofence + Wi‑Fi detection UI)
    alerts/ (timeline, push in-app sync)
  services/
    api/ (REST + WebSocket clients)
    openai/ (assistants + functions)
    notifications/ (push registration, handlers)
    storage/ (MMKV/SQLite, migrations)
    auth/ (secure storage, tokens, refresh)
  lib/ (utils, validation, schema)
```

- **Presentation**: Swift/Android-like feel with large headers, card tiles, and glassmorphism; bottom tabs: Home, Devices, Scenes, Video, Assistant.
- **Domain**: Capability-based device model (`power`, `brightness`, `colorTemp`, `lock`, `thermostat`, `motion`, `cameraLive`), scene definitions, automations (triggers/conditions/actions).
- **Data**: REST for CRUD; WebSocket channels for live state, presence, and alerts; background job to reconcile optimistic updates.

## Device control + automations
- Build a **capability router**: device entries map vendor + capabilities to handlers (e.g., `lights:hue`, `thermostat:nest`, `camera:ring`).
- UI flows:
  - Home: favorites + rooms grid with quick toggles and status badges.
  - Devices: searchable list, filters (type/room/vendor), and detail sheets for lights, thermostats, locks, plugs, and cameras.
  - Scenes: snapshot current device states; allow transition duration for lights and HVAC preconditioning.
  - Automations: triggers (time, sunrise/sunset, geofence, motion/contact, occupancy), optional conditions, and actions; simulator preview before saving.
- Offline/slow network: optimistic UI with rollback; command queue persisted to storage; reconciliation polls on app foreground or connectivity change.

## Assistant (ChatGPT) with awareness
- System prompt encodes rooms/devices schema, privacy rules (camera access requires explicit user request & auth), and tone (empathetic, concise confirmations).
- Define functions exposed to the model: `setDeviceState`, `runScene`, `createAutomation`, `showLiveCamera`, `summarizeAlerts`.
- Flow:
  1) User text/voice → send to OpenAI with function calling enabled + short conversation history.
  2) Parse tool calls → dispatch to Device/Scene/Automation services; execute and confirm with natural response.
  3) Sentiment-aware replies; escalate to “Are you safe?” if repeated distress + motion alerts.
- Caching: keep short-term context client-side; drop sensitive data; redact PII before logging.

### Sample function schema (trimmed)
```ts
const functions = [
  {
    name: "setDeviceState",
    description: "Control a device capability (power/level/color/temp/lock).",
    parameters: z.object({
      deviceId: z.string(),
      capability: z.enum([
        "power",
        "brightness",
        "colorTemp",
        "rgb",
        "lock",
        "temperature",
      ]),
      value: z.union([z.boolean(), z.number(), z.string()])
    })
  },
  {
    name: "showLiveCamera",
    description: "Open a camera stream in the UI",
    parameters: z.object({ deviceId: z.string(), reason: z.string().optional() })
  }
];
```

## Video: live view + motion alerts
- **Live**: Request signed WebRTC or HLS URLs from backend; auto-expire tokens; fallback from WebRTC → HLS if negotiation fails.
- **Events**: Backend ingests vendor webhooks → pushes motion/person detections with thumbnail → opens live view when user says “show me the front door”.
- **UI**: Picture-in-picture (iOS) and inline player with mute/talk, snapshot, timeline of last events.

## Push notifications & background handling
- Register APNs/FCM token; send to backend scoped to user/device graph.
- Use rich notifications with actions: `View Live`, `Dismiss`, `Call`. Include thumbnail when motion alert comes from cameras.
- Background handlers:
  - Sync alert state into local store when notification tapped/delivered.
  - Pre-fetch live stream token when user taps `View Live` for faster start.

## Presence & geofencing
- Use geofencing regions for home; combine with Wi‑Fi SSID detection for accuracy.
- Feed presence events into automations (arrive → disarm, depart → arm + turn off lights) with quiet hours and rate limits.

## Security & privacy
- Tokens in Keychain/Keystore; biometric unlock for camera/lock actions if user enables it.
- Cert pinning (where feasible) and ATS/Network Security Config enforced.
- Least-privilege for vendor connectors; per-device ACLs; audit log of sensitive actions.
- Camera/voice only on explicit user request; confirm before sharing camera snapshots in chat.

## Delivery checklist (phased)
1) Scaffold React Native app (Expo/bare), set up navigation, theming, and design system.
2) Add Auth + API client + React Query cache; implement optimistic device toggles.
3) Build Home/Devices UI with capability controls and Scenes basics.
4) Add Automations builder + server sync + simulator preview.
5) Integrate Assistant with ChatGPT function calling; wire to device/scene actions.
6) Implement camera live view (WebRTC + HLS fallback) and motion alert pushes.
7) Add presence (geofence + Wi‑Fi), offline queue, and reconciliation.
8) Harden security (biometric gate for cameras/locks) and ship to TestFlight/internal testing.
