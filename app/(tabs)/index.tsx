import CalendarEventModal, { CalendarEventFormValues } from '@/components/CalendarEventModal';
import ExampleInputs from '@/components/ExampleInputs';
import PromptInput from '@/components/PromptInput';
import SignInOverlay from '@/components/SignInOverlay';
import { useAuth } from '@/hooks/use-auth';
import { colors } from '@/theme/colors';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const { user, isLoading, isGuest, signOutUser, continueAsGuest, signInUser } = useAuth();

  const [userInput, setUserInput] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [draftEventTitle, setDraftEventTitle] = useState<string | undefined>(undefined);
  const [lastSavedEvent, setLastSavedEvent] = useState<CalendarEventFormValues | null>(null);
  
  useEffect(() => {
  const showSub = Platform.OS === 'ios'
    ? Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true))
    : Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  const hideSub = Platform.OS === 'ios'
    ? Keyboard.addListener('keyboardWillHide', () => setKeyboardVisible(false))
    : Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
  return () => {
    showSub.remove();
    hideSub.remove();
  };
}, []);

  const handleSubmit = (text: string) => {
    setUserInput('');
    Keyboard.dismiss();
    console.log('Submit prompt:', text);
    // Show the calendar event modal with the prompt as default title
    setDraftEventTitle(text);
    setShowEventModal(true);
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
      <KeyboardAvoidingView
        style={styles.userInput}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ExampleInputs
          setUserInput={setUserInput}
          visible={!keyboardVisible}
        />
        <PromptInput
          value={userInput}
          onChangeText={setUserInput}
          onSubmit={(t) => {
            handleSubmit(t);
          }}
        />
      </KeyboardAvoidingView>
      <CalendarEventModal
        visible={showEventModal}
        defaultTitle={draftEventTitle}
        calendarAccountEmail={user?.user.email}
        onClose={() => setShowEventModal(false)}
        onSave={(values) => {
          setLastSavedEvent(values);
          console.log('Saved event:', values);
        }}
      />
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
  userInput: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    width: '100%'
  }
});
