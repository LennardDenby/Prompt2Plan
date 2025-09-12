import { StyleSheet } from 'react-native';
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState, useEffect } from 'react';

export default function GoogleSigninUI() {
  const [isInProgress, setInProgress] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
    });
  }, []);

  const startSignInFlow = async () => {
    try {
      setInProgress(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User signed in:', userInfo);
      // Handle successful sign-in
    } catch (error: any) {
      if (error.code === 'SIGN_IN_CANCELLED') {
        console.log('User cancelled sign in');
      } else if (error.code === 'IN_PROGRESS') {
        console.log('Sign in already in progress');
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        console.log('Play services not available');
      } else {
        console.error('Sign in error:', error);
      }
    } finally {
      setInProgress(false);
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={startSignInFlow}
      disabled={isInProgress}
    />
  );
}

const styles = StyleSheet.create({
  
});