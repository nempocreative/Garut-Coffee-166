import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BrandIcon, type BrandIconName } from '@/components/BrandIcon';
import { Header, Screen } from '@/components/AppUI';
import { useColors } from '@/hooks/useColors';

type EcosystemRoute =
  | '/farmers'
  | '/regions'
  | '/traceability'
  | '/standards'
  | '/documents'
  | '/catalog'
  | '/partnership'
  | '/events'
  | '/tourism';

type EcosystemStage = {
  number: string;
  icon: BrandIconName;
  label: string;
  title: string;
  description: string;
  links: Array<{ label: string; detail: string; route: EcosystemRoute }>;
};

const stages: EcosystemStage[] = [
  {
    number: '01',
    icon: 'map',
    label: 'KEBUN',
    title: 'Kopi dimulai dari petani dan wilayahnya.',
    description: 'Kenali orang dan lereng yang membentuk karakter setiap kopi Garut.',
    links: [
      { label: 'Petani & kebun', detail: 'Cerita orang di balik kopi', route: '/farmers' },
      { label: 'Wilayah kopi', detail: 'Karakter dari setiap lereng', route: '/regions' },
    ],
  },
  {
    number: '02',
    icon: 'package',
    label: 'PROSES & MUTU',
    title: 'Hasil panen dirawat sampai siap dipercaya.',
    description: 'Lihat bagaimana kopi diproses, dijaga mutunya, dan punya perjalanan yang bisa ditelusuri.',
    links: [
      { label: 'Jejak kopi', detail: 'Lacak dari lot sampai cangkir', route: '/traceability' },
      { label: 'Standar kopi', detail: 'Mutu yang dijaga bersama', route: '/standards' },
      { label: 'Dokumen & panduan', detail: 'Rujukan untuk tumbuh lebih baik', route: '/documents' },
    ],
  },
  {
    number: '03',
    icon: 'briefcase',
    label: 'PASAR & MITRA',
    title: 'Kopi bertemu orang yang ingin membawanya lebih jauh.',
    description: 'Temukan produk pilihan atau buka peluang kerja sama dengan usaha yang punya visi serupa.',
    links: [
      { label: 'Katalog kopi', detail: 'Pilih kopi untuk di rumah', route: '/catalog' },
      { label: 'Jadi mitra', detail: 'Bawa kopi Garut ke usahamu', route: '/partnership' },
    ],
  },
  {
    number: '04',
    icon: 'coffee',
    label: 'PENGALAMAN',
    title: 'Perjalanan berakhir di cangkir dan pertemuan baru.',
    description: 'Datang, belajar, dan rasakan sendiri cerita yang sudah dimulai dari kebun.',
    links: [
      { label: 'Event & pelatihan', detail: 'Agenda untuk bertemu dan belajar', route: '/events' },
      { label: 'Wisata kopi', detail: 'Datang langsung ke sumbernya', route: '/tourism' },
    ],
  },
];

export default function CollectiveScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <Screen>
      <Header title="Ekosistem Kopi" subtitle="DARI KEBUN KE CANGKIR" cart={false} back />

      <Animated.View entering={FadeInDown.duration(500)} style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name="coffee" size={24} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.heroKicker, { color: colors.accent }]}>RANTAI KOPI GARUT</Text>
        <Text style={[styles.heroTitle, { color: colors.card }]}>Satu perjalanan, banyak tangan.</Text>
        <Text style={[styles.heroText, { color: colors.background }]}>
          Dari kebun, proses, pasar, sampai pengalaman. Semuanya terhubung di sini.
        </Text>
      </Animated.View>

      <View style={styles.intro}>
        <Text style={[styles.introKicker, { color: colors.primary }]}>BAGAIMANA KOPI BERJALAN</Text>
        <Text style={[styles.introTitle, { color: colors.foreground }]}>Ikuti alurnya, temukan peranmu.</Text>
        <Text style={[styles.introText, { color: colors.mutedForeground }]}>
          Setiap tahap punya orang, cerita, dan ruangnya sendiri. Pilih bagian yang ingin kamu kenali lebih dekat.
        </Text>
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
              <Text style={[styles.stageDescription, { color: colors.mutedForeground }]}>{stage.description}</Text>
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
                      <Text style={[styles.linkDetail, { color: colors.mutedForeground }]}>{link.detail}</Text>
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
          <Text style={[styles.closingTitle, { color: colors.foreground }]}>Semua tahap saling menguatkan.</Text>
          <Text style={[styles.closingText, { color: colors.secondaryForeground }]}>
            Saat kebun, proses, pasar, dan penikmat terhubung, kopi Garut bisa tumbuh lebih jauh.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 20, gap: 10 },
  heroIcon: { width: 52, height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.25 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 25, lineHeight: 30, fontWeight: '800', letterSpacing: -0.55, maxWidth: 310 },
  heroText: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20, opacity: 0.86 },
  intro: { gap: 5, marginTop: 1 },
  introKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  introTitle: { fontFamily: 'Manrope_700Bold', fontSize: 21, lineHeight: 26, fontWeight: '800', letterSpacing: -0.45 },
  introText: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20, marginTop: 2 },
  stageList: { gap: 0 },
  stage: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 11 },
  stageHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  stageNumber: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stageNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  stageHeading: { flex: 1, gap: 3 },
  stageLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.25 },
  stageTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 20, fontWeight: '800' },
  stageIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stageDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17 },
  linkList: { gap: 0 },
  linkRow: { minHeight: 54, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 8 },
  linkMarker: { width: 7, height: 7, borderRadius: 4 },
  linkCopy: { flex: 1, gap: 2 },
  linkLabel: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  linkDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  connector: { height: 25, alignItems: 'center', justifyContent: 'center' },
  connectorDot: { width: 8, height: 8, borderRadius: 4, zIndex: 2 },
  connectorLine: { position: 'absolute', width: 1, height: '100%' },
  closing: { borderRadius: 19, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 11 },
  closingIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  closingCopy: { flex: 1, gap: 3 },
  closingTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '800' },
  closingText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});