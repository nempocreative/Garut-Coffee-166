import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { hubEvents } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function EventsScreen() {
  const colors = useColors();
  return <Screen><Header title="Event & pelatihan" subtitle="AGENDA EKOSISTEM KOPI" cart={false} back /><Text style={[styles.intro, { color: colors.mutedForeground }]}>Temukan agenda yang mempertemukan petani, usaha, pemerintah, dan pecinta kopi.</Text><View style={styles.list}>{hubEvents.map((event) => <View key={event.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.date, { backgroundColor: colors.secondary }]}><BrandIcon name="calendar" size={19} color={colors.primary} /><Text style={[styles.dateText, { color: colors.primary }]}>{event.date}</Text></View><Text style={[styles.type, { color: colors.primary }]}>{event.type}</Text><Text style={[styles.title, { color: colors.foreground }]}>{event.title}</Text><Text style={[styles.meta, { color: colors.mutedForeground }]}>{event.location}</Text><Text style={[styles.description, { color: colors.mutedForeground }]}>{event.description}</Text></View>)}</View></Screen>;
}

const styles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: -8 },
  list: { gap: 12 },
  card: { borderRadius: 19, borderWidth: 1, padding: 15, gap: 6 },
  date: { alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 11, fontWeight: '700' },
  type: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginTop: 4 },
  title: { fontSize: 18, fontWeight: '700' },
  meta: { fontSize: 11 },
  description: { fontSize: 12, lineHeight: 19, marginTop: 3 },
});