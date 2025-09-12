# Prompt2Plan - Calendar Integration App �

This is an [Expo](https://expo.dev) project with Google Calendar integration, created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- 🔐 Google OAuth 2.0 authentication
- 📅 Google Calendar API integration
- 📱 Cross-platform (iOS, Android, Web)
- 🎨 Modern UI with light/dark mode support
- 🔄 Real-time calendar sync

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up Google Calendar API (Required)
   
   Follow the detailed setup guide in [GOOGLE_SETUP.md](./GOOGLE_SETUP.md) to:
   - Create a Google Cloud project
   - Enable the Calendar API
   - Set up OAuth credentials
   - Configure environment variables

3. Create your environment file

   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Google OAuth client ID.

4. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home tab
│   │   └── explore.tsx        # Google Calendar demo
├── components/
│   └── google-calendar-demo.tsx  # Main calendar component
├── constants/
│   └── google-config.ts       # OAuth & API configuration
├── hooks/
│   └── use-google-auth.ts     # Google authentication hook
├── services/
│   └── google-calendar.ts     # Calendar API service
├── .env.example               # Environment variables template
└── GOOGLE_SETUP.md           # Detailed setup instructions
```

## Google Calendar Features

The app demonstrates:

- **Authentication**: Secure OAuth 2.0 login with Google
- **Calendar List**: View all accessible calendars
- **Events**: Display upcoming events with details
- **Event Creation**: Create new calendar events
- **Token Management**: Automatic token refresh and secure storage

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
