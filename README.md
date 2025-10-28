# Prompt2Plan

A small Expo React Native app that converts natural-language prompts into calendar events.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Start the dev tools (Expo)

```bash
npm run start
```

3. Native builds (required for Share Intent and extension testing)

```bash
# macOS iOS
npx expo prebuild --clean
npx expo run:ios
```

Note: Share-to-app (share extension / intent) does NOT work in Expo Go; you must run a native build.

## Share intent (share-to-app)

- The project uses `expo-share-intent` configured in `app.json`.
- Wrap your root layout with `ShareIntentProvider` (see `app/_layout.tsx`).
- Catch unmatched deep links with a catch-all route file named `[...missing].tsx` that redirects to `/`.

If shared text isn't being received, ensure you:

1. Added the plugin config in `app.json` (see `expo-share-intent` section).
2. Ran `npx expo prebuild --clean` and rebuilt the app natively.
3. Test sharing from another app (Safari / Notes) — select text → Share → Prompt2Plan.

## Where to look

- `app/_layout.tsx` — root layout and `ShareIntentProvider` wrapper.
- `app/index.tsx` — home screen; consumes `useShareIntent()` and processes shared text.
- `components/PromptInput.tsx` — input UI used to type or paste prompts.
- `hooks/use-gemini.ts` — extracts event JSON from natural language using Google GenAI.
- `hooks/use-calendar.ts` — creates calendar events using `react-native-add-calendar-event`.

## Notes

- Keep the `scheme` value in `app.json` (currently `prompt2plan`) in sync with iOS native config if you modify it.
- The app expects a native build for any OS-level integrations (share extension, calendar creation).