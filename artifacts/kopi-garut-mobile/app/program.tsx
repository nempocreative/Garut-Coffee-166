import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BrandIcon } from '@/components/BrandIcon';
import { Button, Header, Screen } from '@/components/AppUI';
import { ProgramSectionTitle } from '@/components/ProgramUI';
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
      <Animated.View entering={FadeInDown.duration(500)} style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <Image source={require('../assets/images/mountain-banner.png')} contentFit="cover" style={styles.heroImage} />
        <View style={[styles.heroShade, { backgroundColor: colors.foreground }]} />
        <View style={styles.heroContent}>
          <View style={styles.heroTopline}>
            <Text style={[styles.heroKicker, { color: colors.accent }]}>PROGRAM KOPI GARUT</Text>
            <View style={[styles.heroMark, { backgroundColor: colors.primary }]}>
              <BrandIcon name="shield" size={21} color={colors.primaryForeground} />
            </View>
          </View>
          <Text style={[styles.heroTitle, { color: colors.card }]}>Ruang untuk{'\n'}tumbuh bersama.</Text>
          <View style={styles.heroBottom}>
            <View style={[styles.heroLine, { backgroundColor: colors.accent }]} />
            <Text style={[styles.heroMeta, { color: colors.background }]}>DATA  ·  AKSI  ·  DAMPAK</Text>
          </View>
        </View>
      </Animated.View>

      <View style={[styles.statsBar, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
        <View style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>{roleCards.length}</Text><Text style={[styles.statLabel, { color: colors.secondaryForeground }]}>PERAN</Text></View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>{programLinks.length}</Text><Text style={[styles.statLabel, { color: colors.secondaryForeground }]}>LAYANAN</Text></View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>01</Text><Text style={[styles.statLabel, { color: colors.secondaryForeground }]}>EKOSISTEM</Text></View>
      </View>

      <ProgramSectionTitle eyebrow="MULAI DARI PERANMU" title="Pilih ruang kerja" />
      {!session ? (
        <View style={[styles.accessCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={[styles.accessIcon, { backgroundColor: colors.card }]}><BrandIcon name="lock" size={19} color={colors.primary} /></View>
          <View style={styles.accessCopy}>
            <Text style={[styles.accessTitle, { color: colors.foreground }]}>Buka akses program</Text>
            <Text style={[styles.accessText, { color: colors.mutedForeground }]}>Masuk untuk melihat ruang kerja yang sesuai.</Text>
          </View>
          <Button label="Masuk" onPress={() => router.push('/login')} secondary />
        </View>
      ) : (
        <View style={styles.roleList}>
          {visibleRoleCards.map((role) => (
            <Pressable key={role.id} testID={`program-role-${role.id}`} accessibilityRole="button" accessibilityLabel={`Buka ruang ${role.title}`} onPress={() => router.push(role.route as never)} style={({ pressed }) => [styles.roleCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
              <View style={[styles.roleIcon, { backgroundColor: colors.primary }]}><BrandIcon name={role.icon} size={21} color={colors.primaryForeground} /></View>
              <View style={styles.roleCopy}><Text style={[styles.roleLabel, { color: colors.primary }]}>RUANG KERJA</Text><Text style={[styles.roleTitle, { color: colors.foreground }]}>{role.title}</Text></View>
              <View style={[styles.roleArrow, { backgroundColor: colors.secondary }]}><BrandIcon name="arrow-up-right" size={16} color={colors.primary} /></View>
            </Pressable>
          ))}
        </View>
      )}
      <ProgramSectionTitle eyebrow="SEMUA LAYANAN" title="Jelajahi program" />
      {session ? <View style={styles.linkList}>
        {visibleLinks.map((link, index) => (
          <Animated.View key={link.id} entering={FadeInDown.delay(100 + index * 45).duration(420)} style={styles.serviceColumn}>
            <Pressable testID={`program-link-${link.id}`} accessibilityRole="button" accessibilityLabel={link.title} onPress={() => router.push(link.route as never)} style={({ pressed }) => [styles.serviceTile, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
              <View style={styles.serviceTop}>
                <View style={[styles.serviceIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={link.icon} size={18} color={colors.primary} /></View>
                <BrandIcon name="arrow-up-right" size={15} color={colors.primary} />
              </View>
              <Text numberOfLines={2} style={[styles.serviceTitle, { color: colors.foreground }]}>{link.title}</Text>
              <View style={[styles.serviceNumber, { backgroundColor: colors.muted }]}><Text style={[styles.serviceNumberText, { color: colors.mutedForeground }]}>{String(index + 1).padStart(2, '0')}</Text></View>
            </Pressable>
          </Animated.View>
        ))}
      </View> : <Text style={[styles.hiddenHint, { color: colors.mutedForeground }]}>Layanan program akan muncul setelah kamu masuk.</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, minHeight: 238, overflow: 'hidden', position: 'relative' },
  heroImage: { ...StyleSheet.absoluteFill, opacity: 0.38 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.8 },
  heroContent: { minHeight: 238, padding: 18, justifyContent: 'space-between' },
  heroTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.35 },
  heroMark: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 29, lineHeight: 32, letterSpacing: -0.75 },
  heroBottom: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  heroLine: { width: 25, height: 2 },
  heroMeta: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.9, opacity: 0.82 },
  statsBar: { minHeight: 70, borderRadius: 18, borderWidth: 1, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 22, fontWeight: '800' },
  statLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  statDivider: { width: 1, height: 30 },
  roleList: { gap: 10 },
  roleCard: { minHeight: 72, borderRadius: 18, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  roleIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  roleCopy: { flex: 1, gap: 3 },
  roleLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.2 },
  roleTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '800' },
  roleArrow: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  accessCard: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 11 },
  accessIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  accessCopy: { gap: 4 },
  accessTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  accessText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, maxWidth: 250 },
  hiddenHint: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18 },
  linkList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  serviceColumn: { width: '48.5%' },
  serviceTile: { minHeight: 132, borderWidth: 1, borderRadius: 18, padding: 12, justifyContent: 'space-between', overflow: 'hidden', position: 'relative' },
  serviceTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  serviceIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  serviceTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17, fontWeight: '800', paddingRight: 4 },
  serviceNumber: { position: 'absolute', right: 11, bottom: 10, width: 25, height: 18, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  serviceNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.6 },
});