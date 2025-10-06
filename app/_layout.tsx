import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShareIntentProvider, useShareIntent } from "expo-share-intent";
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ShareIntentProvider>
      <Slot />
      <StatusBar style="auto" />
    </ShareIntentProvider>
  );
}
