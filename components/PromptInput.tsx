import { colors } from '@/theme/colors';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

type Props = {
  placeholder?: string;
  onSubmit?: (text: string) => void;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function PromptInput({
  placeholder = 'Describe your event…',
  onSubmit,
  value: controlledValue,
  onChangeText,
}: Props) {
  const [internal, setInternal] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internal;
  const setValue = onChangeText ?? setInternal;

  const canSend = value.trim().length > 0;

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSubmit?.(text);
    if (controlledValue === undefined) {
      setInternal('');
    } else {
      onChangeText?.('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}
    >
      <View style={styles.wrapper}>
        <View style={[styles.card, styles.cardLight]}>
          <TouchableOpacity
            accessibilityLabel="Add options"
            accessibilityRole="button"
            style={styles.iconBtn}
          >
            <Text style={styles.iconText}>＋</Text>
          </TouchableOpacity>

          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={'#9AA0A6'}
            returnKeyType="send"
            multiline={false}
            textAlignVertical="top"
            style={[styles.input, styles.inputLight]}
            onSubmitEditing={handleSend}
            accessibilityLabel="Event prompt input"
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={!canSend}
            accessibilityRole="button"
            accessibilityLabel="Send prompt"
            style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
          >
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    // Shadow (iOS) / Elevation (Android)
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEDF0',
  },
  cardDark: {
    backgroundColor: '#1F1F23',
    borderWidth: 1,
    borderColor: '#2A2A2F',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    marginRight: 6,
  },
  iconText: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: -1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    minHeight: 44,
    maxHeight: 140,
    lineHeight: 20,
  },
  inputLight: {
    color: '#11181C',
  },
  inputDark: {
    color: '#ECEDEE',
  },
  smallBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    backgroundColor: '#F3F4F6',
  },
  sendBtn: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});