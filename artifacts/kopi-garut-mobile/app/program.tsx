import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandIcon } from '@/components/BrandIcon';
import { Button, Header, Screen } from '@/components/AppUI';
import { ProgramIntro, ProgramSectionTitle, ProgramTile } from '@/components/ProgramUI';
import { programLinks } from '@/data/program';
import { useAuth } from '@/context/AuthContext';
import { canAccessRoute } from '@/data/auth';
import { useColors } from '@/hooks/useColors';

const roleCards = [
  { id: 'farmer', role: 'petani', icon: 'coffee' as const, title: 'Petani', description: 'Verifikasi kebun, mutu lot, dan akses pasar.', route: '/verification' },
  { id: 'group', role: 'petani', icon: 'users' as const, title: 'Ketua kelompok', description: 'Pantau anggota, produksi, dan program bantuan.', route: '/group-dashboard' },
  { id: 'extension', role: 'penyuluh', icon: 'map-pin' as const, title: 'Penyuluh', description: 'Catat kunjungan dan tindak lanjut kebun.', route: '/extension-dashboard' },
];

export default function ProgramScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session } = useAuth();
  const visibleLinks = programLinks.filter((link) => canAccessRoute(link.route, session?.id));
  const visibleRoleCards = roleCards.filter((role) => role.role === session?.id);
  return (
    <Screen>
      <Header back title="Program Kopi Garut" subtitle="PROGRAM · GARUT" />
      <ProgramIntro eyebrow="SATU RUANG UNTUK TUMBUH" title="Program Kopi Garut" description="Layanan digital untuk memastikan kopi Garut tumbuh dari kebun, kelompok tani, sampai pembeli dengan data yang jelas." />
      <View style={[styles.signal, { backgroundColor: colors.foreground }]}>
        <View style={styles.signalCopy}><Text style={[styles.signalKicker, { color: colors.accent }]}>STATUS EKOSISTEM</Text><Text style={[styles.signalTitle, { color: colors.card }]}>Data bergerak bersama.</Text><Text style={[styles.signalText, { color: colors.background }]}>Pilih ruang kerja yang paling dekat dengan peranmu.</Text></View>
        <View style={[styles.signalMark, { backgroundColor: colors.primary }]}><BrandIcon name="arrow-up-right" size={22} color={colors.primaryForeground} /></View>
      </View>
      <ProgramSectionTitle eyebrow="MULAI DARI PERANMU" title="Ruang kerja pilihan" />
      {!session ? (
        <View style={[styles.accessCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={[styles.accessIcon, { backgroundColor: colors.card }]}><BrandIcon name="lock" size={20} color={colors.primary} /></View>
          <View style={styles.accessCopy}>
            <Text style={[styles.accessTitle, { color: colors.foreground }]}>Masuk untuk membuka menu program</Text>
            <Text style={[styles.accessText, { color: colors.mutedForeground }]}>Pilih akun Pengguna, Petani, atau Penyuluh agar ruang kerja yang sesuai tampil di sini.</Text>
          </View>
          <Button label="Masuk" onPress={() => router.push('/login')} secondary />
        </View>
      ) : (
        <View style={styles.roleList}>
          {visibleRoleCards.map((role) => (
          <Pressable key={role.id} testID={`program-role-${role.id}`} accessibilityRole="button" accessibilityLabel={`Buka ruang ${role.title}`} onPress={() => router.push(role.route as never)} style={({ pressed }) => [styles.roleCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
            <View style={[styles.roleIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={role.icon} size={21} color={colors.primary} /></View>
            <View style={styles.roleCopy}><Text style={[styles.roleTitle, { color: colors.foreground }]}>{role.title}</Text><Text style={[styles.roleDescription, { color: colors.mutedForeground }]}>{role.description}</Text></View>
            <BrandIcon name="chevron-right" size={17} color={colors.mutedForeground} />
          </Pressable>
          ))}
        </View>
      )}
      <ProgramSectionTitle eyebrow="SEMUA LAYANAN" title="Jelajahi program" />
      {session ? <View style={styles.linkList}>
        {visibleLinks.map((link) => <ProgramTile key={link.id} testID={`program-link-${link.id}`} icon={link.icon} title={link.title} description={link.description} onPress={() => router.push(link.route as never)} />)}
      </View> : <Text style={[styles.hiddenHint, { color: colors.mutedForeground }]}>Layanan program akan muncul setelah kamu masuk.</Text>}
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
  accessCard: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 11 },
  accessIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  accessCopy: { gap: 4 },
  accessTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  accessText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  hiddenHint: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18 },
  linkList: { gap: 10 },
});