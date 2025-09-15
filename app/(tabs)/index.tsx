import ExampleInputs from '@/components/ExampleInputs';
import SignInOverlay from '@/components/SignInOverlay';
import { useAuth } from '@/hooks/use-auth';
import { colors } from '@/theme/colors';
import React from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const { user, isLoading, isGuest, signOutUser, continueAsGuest, signInUser } = useAuth();

  const handleSubmit = (text: string) => {
    console.log('Submit prompt:', text);
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Hello{user ? ' ' + user.user.givenName : isGuest ? ' Guest' : ''}!
        </Text>
        <SignInOverlay
          visible={!user && !isGuest}
          onContinueAsGuest={continueAsGuest}
          onSignIn={signInUser}
          isLoading={isLoading}
        />
        {user && <Button onPress={signOutUser} title="Sign out" />}
        {isGuest && <Button onPress={signOutUser} title="Sign in" />}
      </View>
      <ExampleInputs onSubmit={handleSubmit} />
    </View>
  );
}             

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    paddingTop: 90,
    gap: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
