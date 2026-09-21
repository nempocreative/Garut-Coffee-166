import React, { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen, SearchBar } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { farmers } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

const regions = ['Semua', 'Cikajang', 'Cisurupan', 'Pakenjeng', 'Samarang'];

const farmerFollowUps: Record<string, { label: string; detail: string; tone: 'positive' | 'attention' }> = {
  'asep-rahmat': { label: 'Pendampingan aktif', detail: 'Persiapan panen · 23 Sep', tone: 'positive' },
  'iis-nurhayati': { label: 'Perlu ditindaklanjuti', detail: 'Drainase blok 2 · 27 Sep', tone: 'attention' },
  'deni-suhendar': { label: 'Pendampingan aktif', detail: 'Evaluasi pengeringan · 25 Sep', tone: 'positive' },
  'ujang-kusnadi': { label: 'Jadwal berikutnya', detail: 'Evaluasi produksi · 30 Sep', tone: 'positive' },
};

export default function ExtensionFarmersScreen() {
  const colors = useColors();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('Semua');

  const visibleFarmers = useMemo(() => farmers.filter((farmer) => {
    const matchesRegion = region === 'Semua' || farmer.location.startsWith(region);
    const searchable = `${farmer.name} ${farmer.group} ${farmer.location} ${farmer.coffeeType}`.toLowerCase();
    return matchesRegion && searchable.includes(query.toLowerCase());
  }), [query, region]);

  const activeRegions = new Set(farmers.map((farmer) => farmer.location.split(',')[0]));
  const attentionCount = Object.values(farmerFollowUps).filter((item) => item.tone === 'attention').length;

  return (
    <Screen bottomMenu={false}>
      <Header back title="Petani binaan" subtitle="PENYULUH · WILAYAH DAMPINGAN" cart={false} notifications />
      <ProgramIntro
        eyebrow="RUANG KERJA PENYULUH"
        title="Kenali kebun yang didampingi."
        description="Temukan petani berdasarkan nama, kelompok, atau wilayah. Buka profilnya untuk membaca kondisi kebun dan cerita produksinya."
      />

      <View style={[styles.summary, { backgroundColor: colors.foreground }]}>
        <View style={styles.summaryCopy}>
          <Text style={[styles.summaryKicker, { color: colors.accent }]}>WILAYAH DAMPINGAN</Text>
          <Text style={[styles.summaryTitle, { color: colors.card }]}>Pendampingan lebih dekat.</Text>
          <Text style={[styles.summaryText, { color: colors.background }]}>Data petani, kelompok tani, dan catatan lapangan mulai dari satu daftar.</Text>
        </View>
        <View style={styles.summaryStats}>
          <SummaryStat value={String(farmers.length)} label="petani aktif" colors={colors} />
          <SummaryStat value={String(activeRegions.size)} label="wilayah" colors={colors} />
          <SummaryStat value={String(attentionCount)} label="perlu perhatian" colors={colors} />
        </View>
      </View>

      <ProgramSectionTitle eyebrow="DAFTAR PETANI" title="Petani yang didampingi" action={`${visibleFarmers.length} profil`} />
      <SearchBar value={query} onChangeText={setQuery} />
      <View style={styles.filterWrap}>
        {regions.map((item) => (
          <FilterChip key={item} label={item} selected={region === item} onPress={() => setRegion(item)} testID={`extension-farmers-filter-${item.toLowerCase()}`} />
        ))}
      </View>

      {visibleFarmers.length === 0 ? (
        <ProgramCard muted>
          <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="users" size={22} color={colors.primary} /></View>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Petani tidak ditemukan</Text>
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Coba ubah kata kunci atau pilih wilayah dampingan lain.</Text>
        </ProgramCard>
      ) : (
        <View style={styles.list}>
          {visibleFarmers.map((farmer, index) => {
            const followUp = farmerFollowUps[farmer.id] ?? { label: 'Pendampingan aktif', detail: 'Catatan berikutnya belum diatur', tone: 'positive' as const };
            return (
              <Animated.View key={farmer.id} entering={FadeInDown.delay(index * 65).duration(420)}>
                <Pressable
                  testID={`extension-farmer-${farmer.id}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Buka profil petani ${farmer.name}`}
                  onPress={() => router.push(`/farmer/${farmer.id}`)}
                  style={({ pressed }) => [styles.farmerCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}
                >
                  <View style={styles.cardTop}>
                    <View style={styles.photoFrame}>
                      <Image source={farmer.image} contentFit="cover" style={styles.photo} />
                      <LinearGradient colors={['transparent', `${colors.foreground}B8`]} locations={[0.35, 1]} style={StyleSheet.absoluteFill} />
                      <View style={styles.photoBadge}><BrandIcon name="user" size={10} color={colors.accent} /><Text style={[styles.photoBadgeText, { color: colors.card }]}>PETANI BINAAN</Text></View>
                    </View>
                    <View style={styles.identity}>
                      <View style={styles.identityTop}>
                        <View style={styles.location}>
                          <BrandIcon name="map-pin" size={11} color={colors.primary} />
                          <Text style={[styles.locationText, { color: colors.primary }]}>{farmer.location}</Text>
                        </View>
                        <StatusPill label={farmerFollowUps[farmer.id]?.tone === 'attention' ? 'Perlu perhatian' : 'Aktif'} positive={followUp.tone === 'positive'} />
                      </View>
                      <Text style={[styles.name, { color: colors.foreground }]}>{farmer.name}</Text>
                      <Text style={[styles.group, { color: colors.mutedForeground }]}>{farmer.group}</Text>
                      <View style={[styles.coffeeTag, { backgroundColor: colors.secondary }]}>
                        <BrandIcon name="coffee" size={12} color={colors.primary} />
                        <Text numberOfLines={1} style={[styles.coffeeTagText, { color: colors.foreground }]}>{farmer.coffeeType}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.followUp, { backgroundColor: followUp.tone === 'attention' ? `${colors.accent}25` : colors.secondary }]}>
                    <View style={[styles.followUpIcon, { backgroundColor: followUp.tone === 'attention' ? colors.accent : colors.primary }]}>
                      <BrandIcon name={followUp.tone === 'attention' ? 'alert-circle' : 'calendar'} size={13} color={followUp.tone === 'attention' ? colors.accentForeground : colors.primaryForeground} />
                    </View>
                    <View style={styles.followUpCopy}>
                      <Text style={[styles.followUpLabel, { color: followUp.tone === 'attention' ? colors.accentForeground : colors.primary }]}>{followUp.label}</Text>
                      <Text style={[styles.followUpDetail, { color: colors.mutedForeground }]}>{followUp.detail}</Text>
                    </View>
                    <BrandIcon name="chevron-right" size={15} color={colors.mutedForeground} />
                  </View>
                  <View style={[styles.cardBottom, { borderTopColor: colors.border }]}>
                    <View style={styles.fact}><Text style={[styles.factLabel, { color: colors.mutedForeground }]}>LAHAN</Text><Text style={[styles.factValue, { color: colors.foreground }]}>{farmer.landArea}</Text></View>
                    <View style={styles.fact}><Text style={[styles.factLabel, { color: colors.mutedForeground }]}>PRODUKSI TAHUNAN</Text><Text style={[styles.factValue, { color: colors.foreground }]}>{farmer.annualProduction}</Text></View>
                    <View style={styles.cardAction}><Text style={[styles.actionText, { color: colors.primary }]}>Buka profil</Text><BrandIcon name="arrow-up-right" size={14} color={colors.primary} /></View>
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

function SummaryStat({ value, label, colors }: { value: string; label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={styles.summaryStat}>
      <Text style={[styles.summaryValue, { color: colors.card }]}>{value}</Text>
      <Text style={[styles.summaryLabel, { color: colors.background }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { borderRadius: 22, padding: 17, gap: 18 },
  summaryCopy: { gap: 5 },
  summaryKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.4 },
  summaryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, letterSpacing: -0.4 },
  summaryText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, maxWidth: 300 },
  summaryStats: { flexDirection: 'row', gap: 18 },
  summaryStat: { flex: 1, gap: 3 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 20 },
  summaryLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, lineHeight: 14 },
  filterWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  list: { gap: 10 },
  farmerCard: { borderWidth: 1, borderRadius: 20, padding: 12, gap: 11 },
  cardTop: { flexDirection: 'row', gap: 11 },
  photoFrame: { width: 92, height: 118, borderRadius: 15, overflow: 'hidden', position: 'relative' },
  photo: { width: '100%', height: '100%' },
  photoBadge: { position: 'absolute', left: 6, right: 6, bottom: 6, borderRadius: 7, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, backgroundColor: 'rgba(42,32,29,0.72)' },
  photoBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 6.5, letterSpacing: 0.35 },
  identity: { flex: 1, minWidth: 0, gap: 5 },
  identityTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 5 },
  location: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 3 },
  locationText: { fontFamily: 'Manrope_700Bold', fontSize: 8.5, letterSpacing: 0.4, textTransform: 'uppercase' },
  name: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 22 },
  group: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  coffeeTag: { alignSelf: 'flex-start', maxWidth: '100%', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 5 },
  coffeeTagText: { flexShrink: 1, fontFamily: 'Manrope_700Bold', fontSize: 9 },
  followUp: { minHeight: 47, borderRadius: 13, padding: 8, flexDirection: 'row', alignItems: 'center', gap: 8 },
  followUpIcon: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  followUpCopy: { flex: 1, gap: 2 },
  followUpLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  followUpDetail: { fontFamily: 'Manrope_400Regular', fontSize: 9.5 },
  cardBottom: { borderTopWidth: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  fact: { flex: 1, gap: 2 },
  factLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, letterSpacing: 0.65 },
  factValue: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  cardAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  emptyIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});