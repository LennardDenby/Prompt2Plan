import ExampleInputs from '@/components/ExampleInputs';
import PromptInput from '@/components/PromptInput';
import { useCalendar } from '@/hooks/use-calendar';
import { useGemini } from '@/hooks/use-gemini';
import { colors } from '@/theme/colors';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from 'react-native';

export default function HomeScreen() {
  const [userInput, setUserInput] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { extractEventDetails, isLoading: isGeminiLoading } = useGemini();
  const { createEvent } = useCalendar();

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

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setUserInput('');
    Keyboard.dismiss();

    try {
      const eventDetails = await extractEventDetails(text);

      if (!eventDetails) {
        Alert.alert('Error', 'Could not understand the event details. Please try again.');
        return;
      }

      await createEvent(eventDetails);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the event.');
    }
  }

  return (
    <View style={styles.container}>
      {isGeminiLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      
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
  },
  loadingOverlay: {
    position: 'absolute',
    top: -300,
    bottom: 0,
    justifyContent: 'center',
  }
});
