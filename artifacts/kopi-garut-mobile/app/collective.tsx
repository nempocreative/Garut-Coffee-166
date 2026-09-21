import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BrandIcon, type BrandIconName } from '@/components/BrandIcon';
import { Header, Screen } from '@/components/AppUI';
import { useColors } from '@/hooks/useColors';

type EcosystemRoute =
  | '/farmers'
  | '/regions'
  | '/catalog'
  | '/partnership'
  | '/events'
  | '/tourism'
  | '/standards'
  | '/traceability';

type EcosystemStage = {
  number: string;
  icon: BrandIconName;
  label: string;
  title: string;
  links: Array<{ label: string; route: EcosystemRoute }>;
};

const stages: EcosystemStage[] = [
  {
    number: '01',
    icon: 'map',
    label: 'KEBUN',
    title: 'Kenali asalnya',
    links: [
      { label: 'Petani & kebun', route: '/farmers' },
      { label: 'Wilayah kopi', route: '/regions' },
    ],
  },
  {
    number: '02',
    icon: 'package',
    label: 'PROSES & MUTU',
    title: 'Jaga kualitasnya',
    links: [
      { label: 'Standar Kopi Garut', route: '/standards' },
      { label: 'Lacak lot lewat QR', route: '/traceability' },
    ],
  },
  {
    number: '03',
    icon: 'briefcase',
    label: 'PASAR & MITRA',
    title: 'Bawa lebih jauh',
    links: [
      { label: 'Katalog kopi', route: '/catalog' },
      { label: 'Jadi mitra', route: '/partnership' },
    ],
  },
  {
    number: '04',
    icon: 'coffee',
    label: 'PENGALAMAN',
    title: 'Datang & rasakan',
    links: [
      { label: 'Event & pelatihan', route: '/events' },
      { label: 'Wisata kopi', route: '/tourism' },
    ],
  },
];

const roleItems: Array<{ icon: BrandIconName; title: string; text: string; route: EcosystemRoute }> = [
  { icon: 'user', title: 'Saya petani', text: 'Kelola profil kebun dan cerita panen.', route: '/farmers' },
  { icon: 'coffee', title: 'Saya pembeli', text: 'Temukan kopi dan kenali asalnya.', route: '/catalog' },
  { icon: 'briefcase', title: 'Saya punya usaha', text: 'Jadi mitra dan bawa kopi ke pelanggan.', route: '/partnership' },
  { icon: 'compass', title: 'Saya ingin berkunjung', text: 'Rasakan kopi langsung dari Garut.', route: '/tourism' },
];

export default function CollectiveScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <Screen>
      <Header title="Ekosistem Kopi" subtitle="DARI KEBUN KE CANGKIR" cart={false} back />

      <Animated.View entering={FadeInDown.duration(500)} style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <Image source={require('../assets/images/hero-coffee.jpg')} contentFit="cover" style={styles.heroImage} />
        <View style={[styles.heroShade, { backgroundColor: colors.foreground }]} />
        <View style={styles.heroContent}>
          <View style={styles.heroTopline}>
            <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
              <BrandIcon name="coffee" size={24} color={colors.primaryForeground} />
            </View>
            <View style={[styles.heroBadge, { backgroundColor: colors.card }]}>
              <Text style={[styles.heroBadgeText, { color: colors.primary }]}>01—04</Text>
            </View>
          </View>
          <Text style={[styles.heroKicker, { color: colors.accent }]}>RANTAI KOPI GARUT</Text>
          <Text style={[styles.heroTitle, { color: colors.card }]}>Satu alur,{'\n'}banyak peran.</Text>
          <View style={styles.heroRoute}>
            <View style={[styles.heroRouteLine, { backgroundColor: colors.accent }]} />
            <Text style={[styles.heroRouteText, { color: colors.background }]}>KEBUN  ·  MUTU  ·  PASAR  ·  CANGKIR</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.intro}>
        <Text style={[styles.introKicker, { color: colors.primary }]}>BAGAIMANA KOPI BERJALAN</Text>
        <Text style={[styles.introTitle, { color: colors.foreground }]}>Kopi Garut bukan hanya katalog.</Text>
        <Text style={[styles.introText, { color: colors.mutedForeground }]}>Ini adalah ruang yang menghubungkan petani, pembeli, pelaku usaha, dan pengunjung dalam satu perjalanan kopi.</Text>
      </View>

      <View style={styles.roleSection}>
        <Text style={[styles.roleSectionTitle, { color: colors.foreground }]}>Kamu datang sebagai siapa?</Text>
        <View style={styles.roleGrid}>
          {roleItems.map((role, index) => (
            <Pressable
              key={role.title}
              accessibilityRole="button"
              accessibilityLabel={role.title}
              onPress={() => router.push(role.route as never)}
              style={({ pressed }) => [
                styles.roleCard,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={[styles.roleIcon, { backgroundColor: index % 2 === 0 ? colors.secondary : colors.accent }]}>
                <BrandIcon name={role.icon} size={17} color={index % 2 === 0 ? colors.primary : colors.accentForeground} />
              </View>
              <View style={styles.roleCopy}>
                <Text style={[styles.roleTitle, { color: colors.foreground }]}>{role.title}</Text>
                <Text style={[styles.roleText, { color: colors.mutedForeground }]}>{role.text}</Text>
              </View>
              <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.stageList}>
        {stages.map((stage, stageIndex) => (
          <React.Fragment key={stage.number}>
            <Animated.View entering={FadeInDown.delay(100 + stageIndex * 70).duration(500)} style={[styles.stage, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.stageHeader}>
                <View style={[styles.stageNumber, { backgroundColor: stageIndex === 0 ? colors.primary : colors.secondary }]}>
                  <Text style={[styles.stageNumberText, { color: stageIndex === 0 ? colors.primaryForeground : colors.primary }]}>{stage.number}</Text>
                </View>
                <View style={styles.stageHeading}>
                  <Text style={[styles.stageLabel, { color: colors.primary }]}>{stage.label}</Text>
                  <Text style={[styles.stageTitle, { color: colors.foreground }]}>{stage.title}</Text>
                </View>
                <View style={[styles.stageIcon, { backgroundColor: colors.secondary }]}>
                  <BrandIcon name={stage.icon} size={19} color={colors.primary} />
                </View>
              </View>
              <View style={styles.linkList}>
                {stage.links.map((link) => (
                  <Pressable
                    key={link.label}
                    accessibilityRole="button"
                    accessibilityLabel={`Buka ${link.label}`}
                    onPress={() => router.push(link.route as never)}
                    style={({ pressed }) => [
                      styles.linkRow,
                      { borderTopColor: colors.border, opacity: pressed ? 0.62 : 1 },
                    ]}
                  >
                    <View style={[styles.linkMarker, { backgroundColor: colors.accent }]} />
                    <View style={styles.linkCopy}>
                      <Text style={[styles.linkLabel, { color: colors.foreground }]}>{link.label}</Text>
                    </View>
                    <BrandIcon name="arrow-up-right" size={16} color={colors.primary} />
                  </Pressable>
                ))}
              </View>
            </Animated.View>
            {stageIndex < stages.length - 1 && (
              <View style={styles.connector} pointerEvents="none">
                <View style={[styles.connectorDot, { backgroundColor: colors.primary }]} />
                <View style={[styles.connectorLine, { backgroundColor: colors.border }]} />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>

      <View style={[styles.closing, { backgroundColor: colors.secondary }]}>
        <View style={[styles.closingIcon, { backgroundColor: colors.accent }]}>
          <BrandIcon name="heart" size={19} color={colors.accentForeground} />
        </View>
        <View style={styles.closingCopy}>
          <Text style={[styles.closingTitle, { color: colors.foreground }]}>Sekarang pilih langkahmu.</Text>
          <Text style={[styles.closingText, { color: colors.secondaryForeground }]}>Mulai dari kebun, kopi, usaha, atau pengalaman.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, minHeight: 246, overflow: 'hidden', position: 'relative' },
  heroImage: { ...StyleSheet.absoluteFill, opacity: 0.42 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.78 },
  heroContent: { padding: 18, gap: 10, minHeight: 246, justifyContent: 'space-between' },
  heroTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroIcon: { width: 52, height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  heroBadge: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 12, opacity: 0.92 },
  heroBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.25 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 28, lineHeight: 31, fontWeight: '800', letterSpacing: -0.65, maxWidth: 310 },
  heroRoute: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 3 },
  heroRouteLine: { width: 24, height: 2 },
  heroRouteText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.8, opacity: 0.82 },
  intro: { gap: 5, marginTop: 1, paddingHorizontal: 2 },
  introKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  introTitle: { fontFamily: 'Manrope_700Bold', fontSize: 21, lineHeight: 26, fontWeight: '800', letterSpacing: -0.45 },
  introText: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, marginTop: 2 },
  roleSection: { gap: 10 },
  roleSectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '800' },
  roleGrid: { gap: 8 },
  roleCard: { minHeight: 67, borderWidth: 1, borderRadius: 16, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 9 },
  roleIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  roleCopy: { flex: 1, gap: 2 },
  roleTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  roleText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  stageList: { gap: 0 },
  stage: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 12 },
  stageHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  stageNumber: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stageNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  stageHeading: { flex: 1, gap: 3 },
  stageLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.25 },
  stageTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 20, fontWeight: '800' },
  stageIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  linkList: { gap: 0 },
  linkRow: { minHeight: 47, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 6 },
  linkMarker: { width: 7, height: 7, borderRadius: 4 },
  linkCopy: { flex: 1, gap: 2 },
  linkLabel: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  connector: { height: 25, alignItems: 'center', justifyContent: 'center' },
  connectorDot: { width: 8, height: 8, borderRadius: 4, zIndex: 2 },
  connectorLine: { position: 'absolute', width: 1, height: '100%' },
  closing: { borderRadius: 19, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 11 },
  closingIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  closingCopy: { flex: 1, gap: 3 },
  closingTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '800' },
  closingText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});