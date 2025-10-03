![Logo](assets/images/logo.png)
# Prompt2Plan

Minimal app that turns an AI prompt into a calendar event.

## What it does
- Convert a natural-language prompt into a calendar event (title, date/time, etc.).
- Uses **Google Gemini AI** to intelligently parse natural language and extract event details
- Sign in with Google to sync with your Google Calendar.
- Continue as guest for a distraction-free flow.

## Tech
- React Native + Expo Router
- TypeScript
- Google Gemini AI (@google/generative-ai)
- @react-native-google-signin/google-signin
- react-native-add-calendar-event

## Quick start
1. Install dependencies:
   - npm: `npm install`
   - yarn: `yarn`
   - pnpm: `pnpm install`
2. **Set up Gemini API** (see [GEMINI_SETUP.md](GEMINI_SETUP.md) for detailed instructions):
   - Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create `.env` file: `cp .env.example .env`
   - Add your key: `EXPO_PUBLIC_GEMINI_API_KEY=your_key_here`
3. Create a Google Cloud project and OAuth client IDs (Web and iOS).
4. Add the following env vars to `.env`:

````dotenv
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_ios_client_id.apps.googleusercontent.com
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
````

5. Run the app:
   - npx expo run:ios

## Example Prompts
- "Team standup tomorrow at 9am"
- "Lunch with Sarah on Friday at 12:30pm"
- "Dentist appointment next Monday at 2pm"
- "Coffee meeting at Starbucks on Thursday at 10am"

## Notes
- ✅ AI parsing using Google Gemini
- ✅ Native calendar integration
- Gemini API free tier: 60 requests/minute