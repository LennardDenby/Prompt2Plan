# Google Calendar OAuth Setup Guide

This guide will walk you through setting up Google OAuth 2.0 authentication for the Google Calendar API in your Prompt2Plan app.

## Prerequisites

- Google account
- Expo development environment set up
- This React Native project running

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top of the page
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "Prompt2Plan Calendar")
5. Click "CREATE"

## Step 2: Enable the Google Calendar API

1. In your Google Cloud project, navigate to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on "Google Calendar API"
4. Click "ENABLE"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" (unless you have a Google Workspace account)
3. Fill in the required fields:
   - **App name**: Prompt2Plan (or your app name)
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Click "SAVE AND CONTINUE"
5. On the "Scopes" page, you can skip adding scopes for now (we'll handle this in code)
6. Click "SAVE AND CONTINUE"
7. On the "Test users" page, add your email address as a test user
8. Click "SAVE AND CONTINUE"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "OAuth client ID"
3. Select "Web application" as the application type
4. Give it a name (e.g., "Prompt2Plan Web Client")

### Configure Authorized Redirect URIs

For development and production, you'll need different redirect URIs:

**For Expo Development:**
```
https://auth.expo.io/@your-expo-username/prompt2plan
```

**For Development Server:**
```
http://localhost:19000
https://localhost:19000
```

**For Production (if using custom scheme):**
```
prompt2plan://oauth
```

**For EAS Build:**
```
https://auth.expo.io/@your-expo-username/your-app-slug
```

5. Click "CREATE"
6. Copy the **Client ID** - you'll need this for your environment variables

## Step 5: Configure Your App

### Update Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Google Client ID:
   ```env
   EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
   ```

### Update app.json (if needed)

Your `app.json` should already be configured, but make sure it includes:

```json
{
  "expo": {
    "scheme": "prompt2plan",
    // ... other config
  }
}
```

## Step 6: Test the Integration

1. Start your Expo development server:
   ```bash
   npm start
   ```

2. Open your app on a device or simulator
3. Navigate to the "Explore" tab (Google Calendar)
4. Tap "Sign in with Google"
5. Complete the OAuth flow
6. You should see your calendars and upcoming events

## Step 7: Publishing Considerations

### For EAS Build

If you're using EAS Build, make sure to:

1. Update your OAuth redirect URIs to include your EAS build URL
2. Set up environment variables in EAS:
   ```bash
   eas secret:create --scope project --name EXPO_PUBLIC_GOOGLE_CLIENT_ID --value "your-client-id"
   ```

### For App Stores

1. **iOS**: You may need to add additional configuration for iOS app submission
2. **Android**: You might need to add the SHA-1 fingerprint of your app signing key

## Security Best Practices

1. **Never commit your `.env` file** - it's already in `.gitignore`
2. **Use different OAuth clients for development and production**
3. **Regularly rotate your client secrets** (if using client secrets)
4. **Limit OAuth scopes** to only what your app needs
5. **Monitor your API usage** in Google Cloud Console

## Troubleshooting

### Common Issues

1. **"Invalid client" error**
   - Check that your client ID is correct
   - Verify the redirect URI matches exactly

2. **"Access blocked" error**
   - Make sure you've added yourself as a test user
   - Check that the OAuth consent screen is properly configured

3. **"Scope not authorized" error**
   - Verify the Calendar API is enabled
   - Check that your OAuth consent screen allows the required scopes

4. **Network errors**
   - Ensure your device/simulator has internet connectivity
   - Check if there are any firewall restrictions

### Debug Information

The app logs authentication details to the console. Check the Metro bundler logs for:
- OAuth URLs being generated
- Token exchange responses
- API call results

## API Rate Limits

Google Calendar API has the following default quotas:
- **Queries per day**: 1,000,000
- **Queries per 100 seconds per user**: 1,000

For production apps, you may need to request higher quotas.

## Next Steps

Once you have basic authentication working, you can:

1. Implement more calendar features (create, edit, delete events)
2. Add calendar sync capabilities
3. Implement offline support with local storage
4. Add push notifications for calendar events
5. Integrate with other Google services (Gmail, Drive, etc.)

## Support

- [Google Calendar API Documentation](https://developers.google.com/calendar/api)
- [Expo AuthSession Documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [OAuth 2.0 for Mobile Apps](https://developers.google.com/identity/protocols/oauth2/native-app)