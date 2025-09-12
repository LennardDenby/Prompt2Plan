import SignInOverlay from '@/components/SignInOverlay';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    signInUser();
  }, []);

  const signInUser = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signInSilently();
    const user = await GoogleSignin.getCurrentUser();
    
    if (user == null) {
      console.log("No user logged in.");
      setShowSignInOverlay(true);
    } else {
      console.log("Logged in user: ", user.user.email);
      setUser(user);
      setShowSignInOverlay(false);
    }
  };

  const signOutUser = async () => {
    GoogleSignin.signOut()
  }

  const handleContinueAsGuest = () => {
    setIsGuest(true);
    setShowSignInOverlay(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello {user ? user.user.givenName : ""}!</Text>    
      <SignInOverlay 
        visible={showSignInOverlay}
        onContinueAsGuest={handleContinueAsGuest}
      />
      <Button
        onPress={signOutUser}
        title="Sign out"
      >
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
