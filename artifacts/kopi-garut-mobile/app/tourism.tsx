import React from 'react';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Alert as NativeAlert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Header, Screen } from '@/components/AppUI';
import { coffeeTours } from '@/data/hub';
import { formatPrice } from '@/data/coffees';
import { useColors } from '@/hooks/useColors';

export default function TourismScreen() {
  const colors = useColors();
  const book = (title: string) => NativeAlert.alert('Minat dicatat', `Tim kami akan menghubungi kamu untuk paket ${title}.`);
  return <Screen><Header title="Wisata kopi" subtitle="DATANG DAN BAWA CERITA" cart={false} back /><Text style={[styles.intro, { color: colors.mutedForeground }]}>Rasakan Garut dari kebunnya: belajar, tinggal lebih lama, dan bertemu orang-orang di balik kopi.</Text><View style={styles.list}>{coffeeTours.map((tour) => <View key={tour.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}><Image source={tour.image} contentFit="cover" style={styles.image} /><View style={styles.copy}><View style={styles.row}><Text style={[styles.type, { color: colors.primary }]}>{tour.type}</Text><Text style={[styles.duration, { color: colors.mutedForeground }]}>{tour.duration}</Text></View><Text style={[styles.title, { color: colors.foreground }]}>{tour.title}</Text><Text style={[styles.detail, { color: colors.mutedForeground }]}>{tour.location} · {tour.description}</Text><View style={styles.footer}><Text style={[styles.price, { color: colors.primary }]}>{formatPrice(tour.price)}<Text style={[styles.unit, { color: colors.mutedForeground }]}> / orang</Text></Text><Pressable onPress={() => book(tour.title)} style={[styles.book, { backgroundColor: colors.primary }]}><Text style={[styles.bookText, { color: colors.primaryForeground }]}>Pesan</Text><Feather name="arrow-up-right" size={14} color={colors.primaryForeground} /></Pressable></View></View></View>)}</View><View style={[styles.note, { backgroundColor: colors.secondary }]}><Feather name="info" size={18} color={colors.primary} /><Text style={[styles.noteText, { color: colors.secondaryForeground }]}>Paket dapat disesuaikan untuk komunitas, sekolah, cafe, dan rombongan.</Text></View></Screen>;
}

const styles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: -8 },
  list: { gap: 13 },
  card: { borderWidth: 1, borderRadius: 20, overflow: 'hidden' },
  image: { width: '100%', height: 150 },
  copy: { padding: 14, gap: 7 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  type: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  duration: { fontSize: 11 },
  title: { fontSize: 18, fontWeight: '700' },
  detail: { fontSize: 12, lineHeight: 18 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 },
  price: { fontSize: 14, fontWeight: '700' },
  unit: { fontSize: 10, fontWeight: '400' },
  book: { borderRadius: 11, paddingHorizontal: 12, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 6 },
  bookText: { fontSize: 11, fontWeight: '700' },
  note: { borderRadius: 17, padding: 15, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  noteText: { flex: 1, fontSize: 12, lineHeight: 19 },
});