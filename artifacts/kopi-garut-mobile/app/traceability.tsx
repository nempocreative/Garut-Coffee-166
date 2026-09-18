import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { coffees } from '@/data/coffees';
import { farmers } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function TraceabilityScreen() {
  const colors = useColors();
  const [scanned, setScanned] = useState(false);
  const coffee = coffees[0];
  const farmer = farmers[0];
  return <Screen><Header title="Jejak produk" subtitle="JEJAK PRODUK" cart={false} back /><View style={[styles.hero, { backgroundColor: colors.foreground }]}><View style={[styles.qr, { backgroundColor: colors.card }]}><BrandIcon name="maximize" size={42} color={colors.primary} /></View><Text style={[styles.heroKicker, { color: colors.accent }]}>SCAN QR KEMASAN</Text><Text style={[styles.heroTitle, { color: colors.card }]}>Tahu persis dari mana kopimu berasal.</Text><Text style={[styles.heroText, { color: colors.background }]}>Petani, kebun, tanggal panen, dan proses pascapanen dalam satu jejak.</Text><Pressable onPress={() => setScanned(true)} style={[styles.scanButton, { backgroundColor: colors.primary }]}><BrandIcon name={scanned ? 'check' : 'maximize'} size={16} color={colors.primaryForeground} /><Text style={[styles.scanText, { color: colors.primaryForeground }]}>{scanned ? 'Jejak terbuka' : 'Simulasikan scan QR'}</Text></Pressable></View>{scanned && <View style={styles.result}><Image source={coffee.image} contentFit="cover" style={styles.image} /><View style={styles.resultCopy}><Text style={[styles.resultKicker, { color: colors.primary }]}>HASIL SCAN</Text><Text style={[styles.resultTitle, { color: colors.foreground }]}>{coffee.name}</Text><Text style={[styles.resultMeta, { color: colors.mutedForeground }]}>{farmer.name} · {coffee.origin}</Text></View><View style={[styles.facts, { backgroundColor: colors.card, borderColor: colors.border }]}><View><Text style={[styles.label, { color: colors.mutedForeground }]}>TANGGAL PANEN</Text><Text style={[styles.value, { color: colors.foreground }]}>18 Mei 2026</Text></View><View><Text style={[styles.label, { color: colors.mutedForeground }]}>PROSES</Text><Text style={[styles.value, { color: colors.foreground }]}>{coffee.process}</Text></View><View><Text style={[styles.label, { color: colors.mutedForeground }]}>KELOMPOK TANI</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.group}</Text></View></View></View>}</Screen>;
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 20, alignItems: 'flex-start', gap: 10 },
  qr: { width: 70, height: 70, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  heroKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { fontSize: 24, lineHeight: 29, fontWeight: '700' },
  heroText: { fontSize: 13, lineHeight: 19, opacity: 0.85 },
  scanButton: { borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 3 },
  scanText: { fontSize: 11, fontWeight: '700' },
  result: { gap: 12 },
  image: { width: '100%', height: 190, borderRadius: 20 },
  resultCopy: { gap: 3 },
  resultKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  resultTitle: { fontSize: 22, fontWeight: '700' },
  resultMeta: { fontSize: 12 },
  facts: { borderWidth: 1, borderRadius: 18, padding: 14, gap: 12 },
  label: { fontSize: 9, letterSpacing: 1, fontWeight: '700' },
  value: { fontSize: 14, fontWeight: '700', marginTop: 4 },
});