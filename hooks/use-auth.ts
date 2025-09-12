import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  const signInUser = async () => {
    setIsLoading(true)

    GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
          offlineAccess: true,
          hostedDomain: '',
          forceCodeForRefreshToken: true,
          iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
        });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('SHOUD CLOSE NOW:', userInfo);

      setUser(userInfo.data)
      setIsGuest(false)
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
      setIsLoading(false);
    }
  }

  const signInUserSilent = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signInSilently();
      const user = await GoogleSignin.getCurrentUser();
      
      if (user == null) {
        console.log("No user logged in.");
        return false;
      } else {
        console.log("Logged in user: ", user.user.email);
        setUser(user);
        setIsGuest(false)
        return true;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      setIsGuest(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setIsLoading(false);
  };

  useEffect(() => {
    signInUserSilent();
  }, []);

  return {
    user,
    isLoading,
    isGuest,
    signInUser,
    signInUserSilent,
    signOutUser,
    continueAsGuest,
  };
};