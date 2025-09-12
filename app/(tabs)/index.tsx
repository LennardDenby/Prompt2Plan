import SignInOverlay from '@/components/SignInOverlay';
import { useAuth } from '@/hooks/use-auth';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { user, isLoading, isGuest, signOutUser, continueAsGuest, signInUser } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello {user ? user.user.givenName : isGuest ? "Guest" : ""}!</Text>    
      <SignInOverlay 
        visible={!user && !isGuest}
        onContinueAsGuest={continueAsGuest}
        onSignIn={signInUser}
        isLoading={isLoading}
      />
      {user && (
        <Button
          onPress={signOutUser}
          title="Sign out"
        />
      )}
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
