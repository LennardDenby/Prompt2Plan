import ExampleInputs from '@/components/ExampleInputs';
import PromptInput from '@/components/PromptInput';
import SignInOverlay from '@/components/SignInOverlay';
import { useAuth } from '@/hooks/use-auth';
import { colors } from '@/theme/colors';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const { user, isLoading, isGuest, signOutUser, continueAsGuest, signInUser } = useAuth();

  const [userInput, setUserInput] = useState('');
  
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
      <View>
        <ExampleInputs setUserInput={setUserInput} />
        <PromptInput
                value={userInput}
                onChangeText={setUserInput}
                onSubmit={(t) => {
                  handleSubmit(t);
                  setUserInput('');
                }}
              />
      </View>
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
    paddingBottom: 25,
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
