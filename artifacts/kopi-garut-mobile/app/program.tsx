import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandIcon } from '@/components/BrandIcon';
import { Header, Screen } from '@/components/AppUI';
import { ProgramIntro, ProgramSectionTitle, ProgramTile } from '@/components/ProgramUI';
import { programLinks } from '@/data/program';
import { useColors } from '@/hooks/useColors';

const roleCards = [
  { id: 'farmer', icon: 'coffee' as const, title: 'Petani', description: 'Verifikasi kebun, mutu lot, dan akses pasar.', route: '/verification' },
  { id: 'group', icon: 'users' as const, title: 'Ketua kelompok', description: 'Pantau anggota, produksi, dan program bantuan.', route: '/group-dashboard' },
  { id: 'extension', icon: 'map-pin' as const, title: 'Penyuluh', description: 'Catat kunjungan dan tindak lanjut kebun.', route: '/extension-dashboard' },
];

export default function ProgramScreen() {
  const colors = useColors();
  const router = useRouter();
  return (
    <Screen>
      <Header back title="Program Kopi Garut" subtitle="PROGRAM · GARUT" />
      <ProgramIntro eyebrow="SATU RUANG UNTUK TUMBUH" title="Program Kopi Garut" description="Layanan digital untuk memastikan kopi Garut tumbuh dari kebun, kelompok tani, sampai pembeli dengan data yang jelas." />
      <View style={[styles.signal, { backgroundColor: colors.foreground }]}>
        <View style={styles.signalCopy}><Text style={[styles.signalKicker, { color: colors.accent }]}>STATUS EKOSISTEM</Text><Text style={[styles.signalTitle, { color: colors.card }]}>Data bergerak bersama.</Text><Text style={[styles.signalText, { color: colors.background }]}>Pilih ruang kerja yang paling dekat dengan peranmu.</Text></View>
        <View style={[styles.signalMark, { backgroundColor: colors.primary }]}><BrandIcon name="arrow-up-right" size={22} color={colors.primaryForeground} /></View>
      </View>
      <ProgramSectionTitle eyebrow="MULAI DARI PERANMU" title="Ruang kerja pilihan" />
      <View style={styles.roleList}>
        {roleCards.map((role) => (
          <Pressable key={role.id} testID={`program-role-${role.id}`} accessibilityRole="button" accessibilityLabel={`Buka ruang ${role.title}`} onPress={() => router.push(role.route as never)} style={({ pressed }) => [styles.roleCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
            <View style={[styles.roleIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={role.icon} size={21} color={colors.primary} /></View>
            <View style={styles.roleCopy}><Text style={[styles.roleTitle, { color: colors.foreground }]}>{role.title}</Text><Text style={[styles.roleDescription, { color: colors.mutedForeground }]}>{role.description}</Text></View>
            <BrandIcon name="chevron-right" size={17} color={colors.mutedForeground} />
          </Pressable>
        ))}
      </View>
      <ProgramSectionTitle eyebrow="SEMUA LAYANAN" title="Jelajahi program" />
      <View style={styles.linkList}>
        {programLinks.map((link) => <ProgramTile key={link.id} testID={`program-link-${link.id}`} icon={link.icon} title={link.title} description={link.description} onPress={() => router.push(link.route as never)} />)}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  signal: { borderRadius: 22, padding: 17, minHeight: 132, flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  signalCopy: { flex: 1, gap: 5 },
  signalKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  signalTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, letterSpacing: -0.5 },
  signalText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.78 },
  signalMark: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  roleList: { gap: 10 },
  roleCard: { minHeight: 76, borderRadius: 18, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  roleIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  roleCopy: { flex: 1, gap: 3 },
  roleTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  roleDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15 },
  linkList: { gap: 10 },
});