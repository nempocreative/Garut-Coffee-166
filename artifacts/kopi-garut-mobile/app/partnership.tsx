import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Header, Screen } from '@/components/AppUI';
import { useColors } from '@/hooks/useColors';

export default function PartnershipScreen() {
  const colors = useColors();
  const [cafeName, setCafeName] = useState('');
  const [city, setCity] = useState('');
  const submit = () => {
    if (!cafeName.trim() || !city.trim()) {
      Alert.alert('Lengkapi data', 'Isi nama cafe dan kota terlebih dahulu.');
      return;
    }
    Alert.alert('Pengajuan terkirim', `Terima kasih, ${cafeName}. Tim Kopi Garut akan menghubungi kamu di ${city}.`);
    setCafeName('');
    setCity('');
  };
  return <Screen><Header title="Kemitraan cafe" subtitle="TUMBUH BERSAMA" cart={false} back /><Text style={[styles.intro, { color: colors.mutedForeground }]}>Jadikan cafe kamu bagian dari perjalanan Kopi Garut ke lebih banyak meja di Indonesia.</Text><View style={[styles.benefits, { backgroundColor: colors.secondary }]}><Text style={[styles.benefitTitle, { color: colors.foreground }]}>Cafe mitra bisa:</Text>{['Membeli kopi langsung dari sumbernya', 'Mendapat cerita produk untuk pelanggan', 'Terdaftar sebagai mitra resmi Kopi Garut'].map((item) => <View key={item} style={styles.benefit}><Text style={[styles.check, { color: colors.primary }]}>✓</Text><Text style={[styles.benefitText, { color: colors.secondaryForeground }]}>{item}</Text></View>)}</View><Text style={[styles.section, { color: colors.foreground }]}>Ajukan kerja sama</Text><TextInput value={cafeName} onChangeText={setCafeName} placeholder="Nama cafe" placeholderTextColor={colors.mutedForeground} style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]} /><TextInput value={city} onChangeText={setCity} placeholder="Kota dan area" placeholderTextColor={colors.mutedForeground} style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]} /><Button label="Kirim pengajuan" onPress={submit} icon="send" /></Screen>;
}

const styles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: -8 },
  benefits: { borderRadius: 19, padding: 16, gap: 10 },
  benefitTitle: { fontSize: 17, fontWeight: '700', marginBottom: 2 },
  benefit: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  check: { fontSize: 16, fontWeight: '800' },
  benefitText: { flex: 1, fontSize: 13, lineHeight: 19 },
  section: { fontSize: 19, fontWeight: '700', marginTop: 2 },
  input: { height: 50, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, fontSize: 14 },
});