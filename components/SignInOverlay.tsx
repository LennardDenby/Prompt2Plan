import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GoogleSigninUI from './GoogleSigninUI';

interface SignInOverlayProps {
  visible: boolean;
  onContinueAsGuest: () => void;
}

export default function SignInOverlay({ visible, onContinueAsGuest }: SignInOverlayProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Prompt2Plan</Text>
          <Text style={styles.subtitle}>Sign in to connect your Google Calendar</Text>
          
          <View style={styles.signInContainer}>
            <GoogleSigninUI />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.guestButton}
          onPress={onContinueAsGuest}
        >
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  logo: {
    width: 400,
    height: 400,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  signInContainer: {
    marginBottom: 40,
  },
  guestButton: {
    position: 'absolute',
    bottom: 40,
  },
  guestButtonText: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
});