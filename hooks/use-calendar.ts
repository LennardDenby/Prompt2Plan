import { Alert, Platform } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { EventDetails } from './use-gemini';
import { check, request, RESULTS, openSettings, PERMISSIONS } from 'react-native-permissions';

export function useCalendar() {
    const iosCalendarPermission = PERMISSIONS.IOS.CALENDARS;

  async function ensurePermission(): Promise<boolean> {
    if (Platform.OS !== 'ios') return true; // Android handled internally by intent
    const status = await check(iosCalendarPermission);
    if (status === RESULTS.GRANTED) return true;
    if (status === RESULTS.BLOCKED) {
      Alert.alert(
        'Calendar Access Blocked',
        'Enable calendar access in Settings to add events.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => openSettings() },
        ]
      );
      return false;
    }
    const req = await request(iosCalendarPermission);
    return req === RESULTS.GRANTED;
  }
  const createEvent = async (eventDetails: EventDetails): Promise<boolean> => {
    try {
      const permitted = await ensurePermission();
      if (!permitted) return false;
      const eventConfig: AddCalendarEvent.CreateOptions = {
        title: eventDetails.title,
        startDate: eventDetails.startDate,
        endDate: eventDetails.endDate,
        notes: eventDetails.notes || undefined,
        location: eventDetails.location || undefined,
      };
      
      console.log('Event Config:', eventConfig);
      
      const eventInfo = await AddCalendarEvent.presentEventCreatingDialog(eventConfig);
      
      console.log('Event Info:', JSON.stringify(eventInfo, null, 2));
      return true;
    } catch (error) {
      console.error('Calendar error:', error);
      Alert.alert('Error', 'Could not create calendar event.');
      return false;
    }
  };

  return {
    createEvent,
  };
}