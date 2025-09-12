![Logo](assets/images/logo.png)
# Prompt2Plan

Minimal app that turns an AI prompt into a calendar event.

## What it does
- Convert a natural-language prompt into a calendar event (title, date/time, etc.).
- Sign in with Google to sync with your Google Calendar.
- Continue as guest for a distraction-free flow.

## Tech
- React Native + Expo Router
- TypeScript
- @react-native-google-signin/google-signin

## Quick start
1. Install dependencies:
   - npm: `npm install`
   - yarn: `yarn`
   - pnpm: `pnpm install`
2. Create a Google Cloud project and OAuth client IDs (Web and iOS).
3. Add the following env vars (Expo reads EXPO_PUBLIC_* on the client):

````dotenv
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_ios_client_id.apps.googleusercontent.com
````

4. Run the app:
   - npx expo run:ios

## Notes
- Roadmap: AI parsing and calendar write-through.