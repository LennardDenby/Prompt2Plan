import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

type Suggestion = { title: string; subtitle: string };
type Props = {
  setUserInput: (text: string) => void;
  suggestions?: Suggestion[];
  visible: boolean;
};

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { title: 'Quick Meeting', subtitle: 'Team standup tomorrow at 9am' },
  { title: 'Lunch Plans', subtitle: 'Lunch with Sarah on Friday at 12:30pm' },
  { title: 'Appointment', subtitle: 'Dentist appointment next Monday at 2pm' },
  { title: 'Coffee Chat', subtitle: 'Coffee meeting at Starbucks on Thursday at 10am' },
  { title: 'Weekly Check-in', subtitle: 'Project review meeting every Tuesday at 3pm' },
];

export default function ExampleInputs({
  setUserInput,
  suggestions = DEFAULT_SUGGESTIONS,
  visible
}: Props) {
  const isDark = useColorScheme() === 'dark';

  return (
    visible && (
    <View style={styles.container}>
      <View style={styles.suggestionsRow}>
        <FlatList
          data={suggestions}
          keyExtractor={(item, i) => item.title + i}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsContent}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.suggestionCard,
                isDark ? styles.cardDark : styles.cardLight,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
              ]}
              onPress={() => setUserInput(item.subtitle)}
            >
              <Text style={[styles.suggestionTitle, isDark && { color: '#E5E7EB' }]}>{item.title}</Text>
              <Text style={[styles.suggestionSubtitle, isDark && { color: '#9CA3AF' }]}>
                {item.subtitle}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  suggestionsRow: {
    marginBottom: 8,
  },
  suggestionsContent: {
    paddingLeft: 4,
    marginLeft: 12
  },
  suggestionCard: {
    borderRadius: 18,
    marginRight: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minWidth: 220,
    maxWidth: 280,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardLight: {
    backgroundColor: '#fff',
    borderColor: '#EBEDF0',
  },
  cardDark: {
    backgroundColor: '#1F1F23',
    borderColor: '#2A2A2F',
  },
  suggestionTitle: {
    fontWeight: '700',
    color: '#11181C',
    marginBottom: 2,
  },
  suggestionSubtitle: {
    color: '#6B7280',
  },
});
