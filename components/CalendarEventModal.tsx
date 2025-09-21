import { colors } from '@/theme/colors';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';

export type CalendarEventFormValues = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  repeat: 'Never' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  participants: string; // comma separated for now
  location: string;
  description: string;
  calendarAccount?: string; // display only
};

type Props = {
  visible: boolean;
  defaultTitle?: string;
  onClose: () => void;
  onSave: (values: CalendarEventFormValues) => void;
  calendarAccountEmail?: string;
};

export default function CalendarEventModal({
  visible,
  defaultTitle,
  onClose,
  onSave,
  calendarAccountEmail,
}: Props) {
  const now = new Date();
  const defaultEnd = new Date(now.getTime() + 30 * 60 * 1000);

  const [title, setTitle] = useState(defaultTitle ?? '');
  const [start, setStart] = useState(now);
  const [end, setEnd] = useState(defaultEnd);
  const [allDay, setAllDay] = useState(false);
  const [repeat, setRepeat] = useState<CalendarEventFormValues['repeat']>('Never');
  const [participants, setParticipants] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(defaultTitle ?? '');
  }, [defaultTitle]);

  const durationLabel = useMemo(() => {
    const mins = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
    if (mins < 60) return `${mins}min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }, [start, end]);

  const dateLabel = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    return fmt.format(start);
  }, [start]);

  const fmtTime = (d: Date) =>
    new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(d);

  const cycle = <T,>(values: readonly T[], current: T): T => {
    const idx = values.indexOf(current);
    return values[(idx + 1) % values.length];
  };

  const handleSave = () => {
    onSave({
      title: title.trim(),
      start,
      end,
      allDay,
      repeat,
      participants,
      location,
      description,
      calendarAccount: calendarAccountEmail,
    });
    onClose();
  };

  const shiftStart = (mins: number) => setStart((d) => new Date(d.getTime() + mins * 60000));
  const shiftEnd = (mins: number) => setEnd((d) => new Date(d.getTime() + mins * 60000));

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Pressable onPress={onClose} accessibilityRole="button">
              <Text style={styles.headerAction}>Cancel</Text>
            </Pressable>
            <Text style={styles.headerTitle}>Event</Text>
            <Pressable onPress={handleSave} accessibilityRole="button">
              <Text style={[styles.headerAction, styles.primary]}>Save</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              style={styles.titleInput}
            />

            <View style={styles.rowGroup}>
              <View style={styles.rowTimes}>
                <Text style={styles.timeText}>{allDay ? 'All-day' : fmtTime(start)}</Text>
                <Text style={styles.arrow}>→</Text>
                <Text style={styles.timeText}>{allDay ? 'All-day' : fmtTime(end)}</Text>
                {!allDay && <Text style={styles.duration}> {durationLabel}</Text>}
              </View>
              <Text style={styles.dateLabel}>{dateLabel}</Text>

              {!allDay && (
                <View style={styles.quickAdjustRow}>
                  <Text style={styles.quickAdjustLabel}>Adjust:</Text>
                  {[ -30, -5, +5, +30 ].map((m) => (
                    <Pressable key={m} onPress={() => { shiftStart(m); shiftEnd(m); }} style={styles.chip}>
                      <Text style={styles.chipText}>{m > 0 ? `+${m}m` : `${m}m`}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>All-day</Text>
              <Switch value={allDay} onValueChange={setAllDay} />
            </View>
            <Pressable
              style={styles.row}
              onPress={() => setRepeat((r) => cycle(['Never', 'Daily', 'Weekly', 'Monthly', 'Yearly'] as const, r))}
            >
              <Text style={styles.label}>Repeat</Text>
              <Text style={styles.value}>{repeat}</Text>
            </Pressable>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Participants</Text>
              <TextInput
                style={styles.textInput}
                placeholder="email1, email2"
                value={participants}
                onChangeText={setParticipants}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Add location"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <View style={styles.inputRowMulti}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Add description"
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
              />
            </View>

            <View style={styles.row}>
              <View style={styles.calendarDot} />
              <Text style={[styles.value, styles.calendarEmail]} numberOfLines={1}>
                {calendarAccountEmail ?? 'Default calendar'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '92%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  header: {
    height: 52,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerAction: {
    fontSize: 16,
    color: '#444',
  },
  primary: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 14,
  },
  titleInput: {
    fontSize: 22,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  rowGroup: {
    gap: 4,
  },
  rowTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 18,
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
  duration: {
    fontSize: 16,
    color: '#666',
  },
  dateLabel: {
    fontSize: 16,
    color: '#666',
  },
  quickAdjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  quickAdjustLabel: {
    color: '#666',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 14,
  },
  chipText: {
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
  value: {
    color: '#333',
  },
  inputRow: {
    gap: 6,
  },
  inputRowMulti: {
    gap: 6,
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 100,
  },
  calendarDot: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#32D74B', // iOS green-ish
    marginRight: 8,
  },
  calendarEmail: {
    flex: 1,
  },
});
