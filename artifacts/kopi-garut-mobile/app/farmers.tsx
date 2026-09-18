import React from 'react';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { farmers } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

export default function FarmersScreen() {
  const colors = useColors();
  const router = useRouter();
  return <Screen><Header title="Petani kopi" subtitle="ORANG DI BALIK CANGKIR" cart={false} back /><Text style={[styles.intro, { color: colors.mutedForeground }]}>Kenali petani dan kelompok tani yang menjaga setiap proses dari kebun sampai ke cangkir.</Text><View style={styles.list}>{farmers.map((farmer) => <Pressable key={farmer.id} onPress={() => router.push(`/farmer/${farmer.id}`)} style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}><Image source={farmer.image} contentFit="cover" style={styles.image} /><View style={styles.copy}><Text style={[styles.name, { color: colors.foreground }]}>{farmer.name}</Text><Text style={[styles.group, { color: colors.primary }]}>{farmer.group}</Text><Text style={[styles.meta, { color: colors.mutedForeground }]}>{farmer.location} · {farmer.annualProduction}</Text></View><Feather name="chevron-right" size={18} color={colors.mutedForeground} /></Pressable>)}</View></Screen>;
}

const styles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: -8 },
  list: { gap: 11 },
  card: { borderWidth: 1, borderRadius: 18, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 11 },
  image: { width: 70, height: 70, borderRadius: 14 },
  copy: { flex: 1, gap: 3 },
  name: { fontSize: 15, fontWeight: '700' },
  group: { fontSize: 11, fontWeight: '700' },
  meta: { fontSize: 11, lineHeight: 16 },
});