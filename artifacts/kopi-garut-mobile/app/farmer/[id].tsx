import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState, Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { coffees } from '@/data/coffees';
import { farmers } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';

type MentoringVisit = {
  id: string;
  farmerId?: string;
  farmer: string;
  date: string;
  time?: string;
  purpose: string;
  condition: string;
  issue: string;
  recommendation: string;
  followUp: string;
  status: 'Terjadwal' | 'Selesai';
};

const visitStorageKey = '@kopi-garut/extension-visits';

const fallbackHistory: Record<string, MentoringVisit[]> = {
  'iis-nurhayati': [{
    id: 'fallback-iis-1',
    farmerId: 'iis-nurhayati',
    farmer: 'Iis Nurhayati',
    date: '2026-09-19',
    time: '08.00',
    purpose: 'Pemeriksaan blok setelah hujan panjang',
    condition: 'Baik dengan catatan',
    issue: 'Daun menguning di blok 2 dan aliran air belum lancar.',
    recommendation: 'Perbaiki drainase dan lakukan pemupukan berimbang setelah tanah tidak jenuh.',
    followUp: 'Minta foto tindak lanjut pada kunjungan berikutnya.',
    status: 'Selesai',
  }],
};

export default function FarmerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const farmer = farmers.find((item) => item.id === id);
  const colors = useColors();
  const { session } = useAuth();
  const [visits, setVisits] = useState<MentoringVisit[]>([]);

  useEffect(() => {
    if (!farmer) return;
    AsyncStorage.getItem(visitStorageKey).then((value) => {
      if (!value) return;
      try {
        const stored = JSON.parse(value) as MentoringVisit[];
        if (Array.isArray(stored)) {
          const farmerName = farmer.name.replace(/^H\.\s*/i, '').toLowerCase();
          setVisits(stored.filter((visit) => {
            const visitName = visit.farmer.replace(/^H\.\s*/i, '').toLowerCase();
            return visit.farmerId === farmer.id || visitName === farmerName || visitName.includes(farmerName) || farmerName.includes(visitName);
          }));
        }
      } catch {
        setVisits([]);
      }
    }).catch(() => setVisits([]));
  }, [farmer, id]);

  if (!farmer) return <Screen><EmptyState title="Petani tidak ditemukan" text="Profil petani yang kamu cari belum tersedia." action="Kembali ke daftar" onAction={() => router.replace('/farmers')} /></Screen>;
  const farmerCoffee = coffees.find((coffee) => farmer.products.includes(coffee.series));
  const mentoringHistory = visits.length > 0 ? visits : (fallbackHistory[farmer.id] ?? []);
  const profileAction = session?.id === 'penyuluh'
    ? { label: 'Buka tugas terkait', route: '/extension-issues' as const }
    : session?.id === 'petani'
      ? { label: 'Kirim laporan kebun', route: '/farm-issues' as const }
      : undefined;

  return (
    <Screen>
      <Header title="Profil petani" subtitle="ORANG DI BALIK RASA" cart={false} back />
      <View style={styles.hero}>
        <Image source={farmer.image} contentFit="cover" style={StyleSheet.absoluteFill} />
        <LinearGradient colors={['transparent', colors.foreground]} locations={[0.1, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.heroCopy}>
          <View style={styles.heroTag}><BrandIcon name="map-pin" size={12} color={colors.primaryForeground} /><Text style={[styles.heroTagText, { color: colors.primaryForeground }]}>{farmer.location}</Text></View>
          <Text style={[styles.heroName, { color: colors.card }]}>{farmer.name}</Text>
          <Text style={[styles.heroGroup, { color: colors.background }]}>{farmer.group}</Text>
        </View>
      </View>
      <View style={styles.storyHeader}><Text style={[styles.kicker, { color: colors.primary }]}>CERITA KOPI GARUT</Text><Text style={[styles.storyTitle, { color: colors.foreground }]}>Menjaga rasa dari sumbernya.</Text><Text style={[styles.story, { color: colors.mutedForeground }]}>{farmer.story}</Text></View>
      <View style={[styles.facts, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="map" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>LOKASI</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.location}</Text></View>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="grid" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>LUAS LAHAN</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.landArea}</Text></View>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="coffee" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>JENIS KOPI</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.coffeeType}</Text></View>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="trending-up" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>PRODUKSI / TAHUN</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.annualProduction}</Text></View>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="calendar" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>ANGGOTA SEJAK</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.joinedAt}</Text></View>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="shield" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>ID KEANGGOTAAN</Text><Text style={[styles.value, { color: colors.primary }]}>{farmer.membershipId}</Text></View>
      </View>
      <View style={[styles.extensionCard, { backgroundColor: colors.foreground }]}>
        <View style={styles.extensionTop}>
          <View style={[styles.extensionIcon, { backgroundColor: colors.accent }]}><BrandIcon name="users" size={17} color={colors.accentForeground} /></View>
          <View style={styles.extensionCopy}>
            <Text style={[styles.extensionKicker, { color: colors.accent }]}>PENDAMPING UTAMA</Text>
            <Text style={[styles.extensionName, { color: colors.card }]}>Rani Permata</Text>
            <Text style={[styles.extensionMeta, { color: colors.background }]}>Penyuluh lapangan · Wilayah {farmer.location.split(',')[0]}</Text>
          </View>
          <View style={[styles.connectedDot, { backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.extensionText, { color: colors.background }]}>Laporan masalah, arahan, jadwal kunjungan, dan foto tindak lanjut tersambung pada profil ini.</Text>
        {profileAction && <Pressable testID="farmer-profile-extension-action" accessibilityRole="button" accessibilityLabel={profileAction.label} onPress={() => router.push(profileAction.route)} style={({ pressed }) => [styles.extensionButton, { backgroundColor: colors.card, opacity: pressed ? 0.78 : 1 }]}><Text style={[styles.extensionButtonText, { color: colors.foreground }]}>{profileAction.label}</Text><BrandIcon name="arrow-up-right" size={14} color={colors.primary} /></Pressable>}
      </View>
      <View style={styles.sectionHeading}><View><Text style={[styles.kicker, { color: colors.primary }]}>RIWAYAT PENDAMPINGAN</Text><Text style={[styles.section, { color: colors.foreground }]}>Catatan bersama penyuluh</Text></View><BrandIcon name="map-pin" size={21} color={colors.primary} /></View>
      {mentoringHistory.length === 0 ? (
        <View style={[styles.emptyHistory, { borderColor: colors.border }]}><BrandIcon name="calendar" size={19} color={colors.primary} /><Text style={[styles.emptyHistoryTitle, { color: colors.foreground }]}>Belum ada kunjungan tercatat</Text><Text style={[styles.emptyHistoryText, { color: colors.mutedForeground }]}>Catatan kunjungan penyuluh akan muncul di profil petani ini.</Text></View>
      ) : (
        <View style={styles.historyList}>
          {mentoringHistory.slice(0, 4).map((visit) => (
            <View key={visit.id} style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.historyHeader}>
                <View style={[styles.historyIcon, { backgroundColor: visit.condition === 'Perlu perhatian' ? `${colors.accent}25` : colors.secondary }]}><BrandIcon name={visit.condition === 'Perlu perhatian' ? 'alert-circle' : 'check'} size={15} color={visit.condition === 'Perlu perhatian' ? colors.accent : colors.primary} /></View>
                <View style={styles.historyCopy}><Text style={[styles.historyDate, { color: colors.foreground }]}>{visit.date}{visit.time ? ` · ${visit.time}` : ''}</Text><Text style={[styles.historyPurpose, { color: colors.mutedForeground }]}>{visit.purpose}</Text></View><Text style={[styles.historyStatus, { color: visit.status === 'Selesai' ? colors.primary : colors.accent }]}>{visit.status}</Text>
              </View>
              <Text style={[styles.historyIssue, { color: colors.foreground }]}>{visit.issue}</Text>
              <View style={[styles.historyNote, { borderTopColor: colors.border }]}><BrandIcon name="check" size={13} color={colors.primary} /><View style={styles.historyNoteCopy}><Text style={[styles.historyNoteLabel, { color: colors.primary }]}>REKOMENDASI</Text><Text style={[styles.historyNoteText, { color: colors.mutedForeground }]}>{visit.recommendation}</Text><Text style={[styles.historyFollowUp, { color: colors.foreground }]}>Tindak lanjut: {visit.followUp}</Text></View></View>
            </View>
          ))}
        </View>
      )}
      <View style={styles.sectionHeading}><View><Text style={[styles.kicker, { color: colors.primary }]}>HASIL KEBUN</Text><Text style={[styles.section, { color: colors.foreground }]}>Produk yang dihasilkan</Text></View><BrandIcon name="coffee" size={21} color={colors.primary} /></View>
      <View style={styles.products}>
        {farmer.products.map((product) => <Pressable key={product} onPress={() => farmerCoffee && router.push(`/product/${farmerCoffee.id}`)} style={({ pressed }) => [styles.product, { backgroundColor: colors.accent, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name="coffee" size={16} color={colors.accentForeground} /><View style={styles.productCopy}><Text style={[styles.productText, { color: colors.accentForeground }]}>{product}</Text>{farmerCoffee && <Text style={[styles.productMeta, { color: colors.accentForeground }]}>Lihat profil kopi dan catatan rasanya</Text>}</View><BrandIcon name="arrow-up-right" size={15} color={colors.accentForeground} /></Pressable>)}
      </View>
      <View style={[styles.note, { backgroundColor: colors.secondary }]}>
        <View style={[styles.noteIcon, { backgroundColor: colors.primary }]}><BrandIcon name="heart" size={16} color={colors.primaryForeground} /></View>
        <View style={styles.noteCopy}><Text style={[styles.noteTitle, { color: colors.foreground }]}>Setiap pembelian mendukung kebun</Text><Text style={[styles.noteText, { color: colors.mutedForeground }]}>Kenali asalnya, nikmati rasanya, dan ikut menjaga cerita petani tetap berjalan.</Text></View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { height: 286, borderRadius: 23, overflow: 'hidden' },
  heroCopy: { flex: 1, justifyContent: 'flex-end', padding: 17, gap: 5 },
  heroTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroTagText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  heroName: { fontFamily: 'Manrope_700Bold', fontSize: 30, lineHeight: 35, fontWeight: '800', letterSpacing: -0.8 },
  heroGroup: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  storyHeader: { gap: 5 },
  kicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  storyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', marginTop: 1 },
  story: { fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 22, marginTop: 4 },
  facts: { borderWidth: 1, borderRadius: 19, padding: 13, gap: 13 },
  fact: { minHeight: 42, paddingLeft: 47, justifyContent: 'center', position: 'relative', gap: 2 },
  factIcon: { position: 'absolute', left: 0, top: 1, width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1.1, fontWeight: '800' },
  value: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  section: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 25, fontWeight: '700', marginTop: 4 },
  products: { gap: 9 },
  product: { minHeight: 63, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  productCopy: { flex: 1, gap: 3 },
  productText: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  productMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  note: { borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  noteIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  noteCopy: { flex: 1, gap: 3 },
  noteTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  noteText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  extensionCard: { borderRadius: 20, padding: 15, gap: 11 },
  extensionTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  extensionIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  extensionCopy: { flex: 1, gap: 3 },
  extensionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1.2 },
  extensionName: { fontFamily: 'Manrope_700Bold', fontSize: 16 },
  extensionMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  connectedDot: { width: 9, height: 9, borderRadius: 5, marginTop: 3 },
  extensionText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.82 },
  extensionButton: { minHeight: 38, borderRadius: 12, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  extensionButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 10.5 },
  historyList: { gap: 10 },
  historyCard: { borderWidth: 1, borderRadius: 18, padding: 13, gap: 10 },
  historyHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  historyIcon: { width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  historyCopy: { flex: 1, gap: 3 },
  historyDate: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  historyPurpose: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  historyStatus: { fontFamily: 'Manrope_700Bold', fontSize: 9 },
  historyIssue: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  historyNote: { borderTopWidth: 1, paddingTop: 9, flexDirection: 'row', alignItems: 'flex-start', gap: 7 },
  historyNoteCopy: { flex: 1, gap: 3 },
  historyNoteLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1 },
  historyNoteText: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  historyFollowUp: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, lineHeight: 15 },
  emptyHistory: { minHeight: 120, borderWidth: 1, borderStyle: 'dashed', borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 6, padding: 15 },
  emptyHistoryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  emptyHistoryText: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15, textAlign: 'center' },
});