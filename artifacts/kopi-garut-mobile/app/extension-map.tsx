import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { healthCheck } from '@workspace/api-client-react';
import { AppState, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, MetricCard, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';

const STORAGE_KEY = '@kopi-garut/extension-farm-map';
const filters = ['Semua', 'Perlu perhatian', 'Skor baik'] as const;

type FarmFilter = (typeof filters)[number];
type ConnectionStatus = 'checking' | 'online' | 'offline';

type FarmMarker = {
  id: string;
  name: string;
  group: string;
  location: string;
  latitude: number;
  longitude: number;
  x: number;
  y: number;
  score: number;
  condition: 'Baik' | 'Baik dengan catatan' | 'Perlu perhatian';
  lastVisit: string;
  nextAction: string;
  factors: Array<{ label: string; value: number; icon: BrandIconName }>;
};

type LocalMapState = {
  savedFarmIds: string[];
  lastLocation?: { latitude: number; longitude: number };
  savedAt?: string;
};

const farms: FarmMarker[] = [
  {
    id: 'cikuray-mandiri',
    name: 'KTH Cikuray Mandiri',
    group: 'Iis Nurhayati · 12 petani',
    location: 'Mekarsari, Cikajang',
    latitude: -7.32841,
    longitude: 107.7982,
    x: 26,
    y: 61,
    score: 86,
    condition: 'Baik dengan catatan',
    lastVisit: '19 Sep 2026',
    nextAction: 'Cek drainase blok 2 pada kunjungan berikutnya.',
    factors: [
      { label: 'Kesehatan tanaman', value: 88, icon: 'coffee' },
      { label: 'Perawatan kebun', value: 91, icon: 'grid' },
      { label: 'Drainase', value: 72, icon: 'trending-up' },
      { label: 'Pencatatan', value: 94, icon: 'bar-chart-2' },
    ],
  },
  {
    id: 'papandayan-lestari',
    name: 'KTH Papandayan Lestari',
    group: 'Asep Hidayat · 18 petani',
    location: 'Sirnajaya, Cisurupan',
    latitude: -7.29971,
    longitude: 107.7328,
    x: 59,
    y: 28,
    score: 93,
    condition: 'Baik',
    lastVisit: '12 Sep 2026',
    nextAction: 'Pertahankan ritme pemantauan menjelang panen.',
    factors: [
      { label: 'Kesehatan tanaman', value: 95, icon: 'coffee' },
      { label: 'Perawatan kebun', value: 94, icon: 'grid' },
      { label: 'Drainase', value: 89, icon: 'trending-up' },
      { label: 'Pencatatan', value: 96, icon: 'bar-chart-2' },
    ],
  },
  {
    id: 'mekar-tani',
    name: 'KTH Mekar Tani',
    group: 'Deni Suhendar · 9 petani',
    location: 'Pakenjeng',
    latitude: -7.46121,
    longitude: 107.7465,
    x: 73,
    y: 77,
    score: 68,
    condition: 'Perlu perhatian',
    lastVisit: '10 Sep 2026',
    nextAction: 'Ukur kadar air dua kali sehari dan jadwalkan kunjungan ulang.',
    factors: [
      { label: 'Kesehatan tanaman', value: 74, icon: 'coffee' },
      { label: 'Perawatan kebun', value: 69, icon: 'grid' },
      { label: 'Drainase', value: 61, icon: 'trending-up' },
      { label: 'Pencatatan', value: 68, icon: 'bar-chart-2' },
    ],
  },
  {
    id: 'talaga-hijau',
    name: 'Kelompok Tani Talaga',
    group: 'Wati Sulastri · 14 petani',
    location: 'Kamojang',
    latitude: -7.13223,
    longitude: 107.751,
    x: 82,
    y: 42,
    score: 81,
    condition: 'Baik dengan catatan',
    lastVisit: '08 Sep 2026',
    nextAction: 'Lengkapi foto lot dan catatan asal blok.',
    factors: [
      { label: 'Kesehatan tanaman', value: 84, icon: 'coffee' },
      { label: 'Perawatan kebun', value: 82, icon: 'grid' },
      { label: 'Drainase', value: 78, icon: 'trending-up' },
      { label: 'Pencatatan', value: 79, icon: 'bar-chart-2' },
    ],
  },
];

function scoreColor(score: number, colors: ReturnType<typeof useColors>) {
  return score >= 85 ? colors.primary : score >= 75 ? colors.accent : colors.destructive;
}

function locationLabel(location: { latitude: number; longitude: number }) {
  return `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`;
}

export default function ExtensionMapScreen() {
  const colors = useColors();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(farms[0].id);
  const [filter, setFilter] = useState<FarmFilter>('Semua');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
  const [localState, setLocalState] = useState<LocalMapState>({ savedFarmIds: [] });
  const [locationPermission, requestLocationPermission] = Location.useForegroundPermissions();
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const parsed = JSON.parse(value) as Partial<LocalMapState>;
        setLocalState({
          savedFarmIds: Array.isArray(parsed.savedFarmIds) ? parsed.savedFarmIds : [],
          lastLocation: parsed.lastLocation,
          savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : undefined,
        });
      } catch {
        setFeedback('Catatan offline belum dapat dibaca. Data peta tetap ditampilkan.');
      }
    }).catch(() => setFeedback('Catatan offline belum dapat dimuat dari perangkat.'));
  }, []);

  useEffect(() => {
    let mounted = true;
    const checkConnection = async () => {
      try {
        await healthCheck();
        if (mounted) setConnectionStatus('online');
      } catch {
        if (mounted) setConnectionStatus('offline');
      }
    };
    void checkConnection();
    const interval = setInterval(() => void checkConnection(), 15000);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void checkConnection();
    });
    return () => {
      mounted = false;
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  const visibleFarms = useMemo(() => farms.filter((farm) => {
    if (filter === 'Semua') return true;
    if (filter === 'Perlu perhatian') return farm.condition === 'Perlu perhatian';
    return farm.score >= 85;
  }), [filter]);
  const selectedFarm = farms.find((farm) => farm.id === selectedId) ?? visibleFarms[0] ?? farms[0];
  const attentionCount = farms.filter((farm) => farm.condition === 'Perlu perhatian').length;
  const averageScore = Math.round(farms.reduce((sum, farm) => sum + farm.score, 0) / farms.length);
  const savedSelected = localState.savedFarmIds.includes(selectedFarm.id);
  const statusColor = connectionStatus === 'offline' ? colors.accent : colors.primary;
  const statusTitle = connectionStatus === 'offline' ? 'Mode offline aktif' : connectionStatus === 'checking' ? 'Memeriksa koneksi' : 'Data lapangan siap';
  const statusDescription = connectionStatus === 'offline'
    ? 'Catatan kebun tersimpan di perangkat. Kamu tetap bisa membuka skor dan menandai kebun.'
    : localState.savedFarmIds.length > 0
      ? `${localState.savedFarmIds.length} catatan lokal tersimpan di perangkat.`
      : 'Perubahan lokal akan tetap tersedia jika sinyal terputus.';

  const persistLocalState = async (next: LocalMapState) => {
    setLocalState(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setFeedback('Perubahan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  const captureLocation = async () => {
    try {
      if (!locationPermission?.granted) {
        const permission = await requestLocationPermission();
        if (!permission.granted) {
          setFeedback('Akses lokasi ditolak. Peta kebun tetap bisa digunakan tanpa lokasi perangkat.');
          return;
        }
      }
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const lastLocation = { latitude: current.coords.latitude, longitude: current.coords.longitude };
      await persistLocalState({ ...localState, lastLocation });
      setFeedback(`Lokasi perangkat tersimpan · ${locationLabel(lastLocation)}`);
    } catch {
      setFeedback('Lokasi perangkat belum bisa didapatkan. Peta kebun tetap bisa digunakan.');
    }
  };

  const saveSelectedFarmOffline = async () => {
    const nextIds = savedSelected
      ? localState.savedFarmIds.filter((id) => id !== selectedFarm.id)
      : [...localState.savedFarmIds, selectedFarm.id];
    await persistLocalState({ ...localState, savedFarmIds: nextIds, savedAt: new Date().toISOString() });
    setFeedback(savedSelected ? `${selectedFarm.name} dihapus dari catatan lokal.` : `${selectedFarm.name} disimpan untuk dibawa saat offline.`);
  };

  return (
    <Screen>
      <Header back title="Peta & skor kebun" subtitle="PENYULUH · PEMANTAUAN" cart={false} notifications />
      <ProgramIntro
        eyebrow="PANTAU WILAYAH BINAAN"
        title="Lihat kebun, bukan hanya angka."
        description="Pilih titik kebun untuk membaca skor kondisi, menyiapkan kunjungan, dan tetap bekerja ketika jaringan tidak stabil."
      />

      <View style={styles.metrics}>
        <MetricCard icon="map-pin" value={String(farms.length)} label="Titik kebun" />
        <MetricCard icon="trending-up" value={String(averageScore)} label="Skor rata-rata" />
        <MetricCard icon="alert-circle" value={String(attentionCount)} label="Perlu perhatian" />
        <MetricCard icon="check" value={String(localState.savedFarmIds.length)} label="Catatan offline" />
      </View>

      <ProgramSectionTitle eyebrow="PETA WILAYAH BINAAN" title="Pilih titik kebun" />
      <View style={[styles.mapCard, { backgroundColor: colors.foreground }]}>
        <Image source={require('../assets/images/mountain-banner.png')} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.foreground, opacity: 0.68 }]} />
        <View style={[styles.mapContour, styles.mapContourOne, { borderColor: colors.primaryForeground }]} />
        <View style={[styles.mapContour, styles.mapContourTwo, { borderColor: colors.accent }]} />
        <View style={styles.mapTop}>
          <View>
            <Text style={[styles.mapKicker, { color: colors.accent }]}>JEJAK PENDAMPINGAN</Text>
            <Text style={[styles.mapTitle, { color: colors.card }]}>Garut Selatan</Text>
            <Text style={[styles.mapSubtitle, { color: colors.background }]}>4 titik aktif · diperbarui dari catatan lapangan</Text>
          </View>
          <Pressable testID="extension-map-locate" accessibilityRole="button" accessibilityLabel="Gunakan lokasi perangkat" onPress={() => void captureLocation()} style={({ pressed }) => [styles.locateButton, { backgroundColor: colors.card, opacity: pressed ? 0.72 : 1 }]}>
            <BrandIcon name="compass" size={17} color={colors.primary} />
          </Pressable>
        </View>
        <View style={styles.mapCanvas}>
          <View style={[styles.routeLine, { backgroundColor: colors.primaryForeground }]} />
          {visibleFarms.map((farm) => {
            const selected = farm.id === selectedFarm.id;
            const markerColor = scoreColor(farm.score, colors);
            return (
              <Pressable
                key={farm.id}
                testID={`extension-map-marker-${farm.id}`}
                accessibilityRole="button"
                accessibilityLabel={`Pilih titik ${farm.name}`}
                onPress={() => setSelectedId(farm.id)}
                style={({ pressed }) => [styles.marker, { left: `${farm.x}%`, top: `${farm.y}%`, opacity: pressed ? 0.72 : 1 }]}
              >
                {selected && <View style={[styles.markerPulse, { borderColor: markerColor }]} />}
                <View style={[styles.markerDot, { backgroundColor: markerColor, borderColor: colors.card, transform: [{ scale: selected ? 1.18 : 1 }] }]} />
              </Pressable>
            );
          })}
          {!!localState.lastLocation && <View style={[styles.currentLocation, { left: '47%', top: '47%', borderColor: colors.card, backgroundColor: colors.primary }]}><View style={[styles.currentLocationInner, { backgroundColor: colors.card }]} /></View>}
        </View>
        <View style={styles.mapLegend}>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: colors.primary }]} /><Text style={[styles.legendText, { color: colors.background }]}>Skor baik</Text></View>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: colors.accent }]} /><Text style={[styles.legendText, { color: colors.background }]}>Pantau</Text></View>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: colors.destructive }]} /><Text style={[styles.legendText, { color: colors.background }]}>Prioritas</Text></View>
        </View>
      </View>

      <View style={styles.filters}>
        {filters.map((item) => <FilterChip key={item} label={item} selected={filter === item} onPress={() => { setFilter(item); const first = item === 'Semua' ? farms[0] : farms.find((farm) => item === 'Perlu perhatian' ? farm.condition === 'Perlu perhatian' : farm.score >= 85); if (first) setSelectedId(first.id); }} testID={`extension-map-filter-${item.toLowerCase().replaceAll(' ', '-')}`} />)}
      </View>

      <ProgramSectionTitle eyebrow="SKOR KEBUN TERPILIH" title={selectedFarm.name} />
      <ProgramCard>
        <View style={styles.scoreHeader}>
          <View style={[styles.scoreCircle, { backgroundColor: `${scoreColor(selectedFarm.score, colors)}1A`, borderColor: scoreColor(selectedFarm.score, colors) }]}>
            <Text style={[styles.scoreValue, { color: scoreColor(selectedFarm.score, colors) }]}>{selectedFarm.score}</Text>
            <Text style={[styles.scoreOutOf, { color: colors.mutedForeground }]}>/100</Text>
          </View>
          <View style={styles.scoreCopy}>
            <Text style={[styles.scoreGroup, { color: colors.primary }]}>{selectedFarm.group}</Text>
            <Text style={[styles.scoreLocation, { color: colors.mutedForeground }]}>{selectedFarm.location} · kunjungan {selectedFarm.lastVisit}</Text>
            <StatusPill label={selectedFarm.condition} positive={selectedFarm.condition === 'Baik'} />
          </View>
        </View>
        <View style={styles.factorList}>
          {selectedFarm.factors.map((factor) => (
            <View key={factor.label} style={styles.factorRow}>
              <View style={[styles.factorIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={factor.icon} size={14} color={colors.primary} /></View>
              <Text style={[styles.factorLabel, { color: colors.foreground }]}>{factor.label}</Text>
              <View style={[styles.factorTrack, { backgroundColor: colors.muted }]}><View style={[styles.factorFill, { width: `${factor.value}%`, backgroundColor: scoreColor(factor.value, colors) }]} /></View>
              <Text style={[styles.factorValue, { color: colors.foreground }]}>{factor.value}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.nextAction, { borderTopColor: colors.border }]}>
          <BrandIcon name="calendar" size={15} color={colors.accent} />
          <Text style={[styles.nextActionText, { color: colors.mutedForeground }]}>{selectedFarm.nextAction}</Text>
        </View>
        <Pressable testID="extension-map-save-offline" accessibilityRole="button" accessibilityLabel={savedSelected ? 'Hapus catatan kebun dari perangkat' : 'Simpan catatan kebun untuk offline'} onPress={() => void saveSelectedFarmOffline()} style={({ pressed }) => [styles.saveOfflineButton, { backgroundColor: savedSelected ? colors.secondary : colors.primary, opacity: pressed ? 0.78 : 1 }]}>
          <BrandIcon name={savedSelected ? 'check' : 'package'} size={15} color={savedSelected ? colors.primary : colors.primaryForeground} />
          <Text style={[styles.saveOfflineText, { color: savedSelected ? colors.primary : colors.primaryForeground }]}>{savedSelected ? 'Tersimpan di perangkat' : 'Simpan untuk mode offline'}</Text>
        </Pressable>
      </ProgramCard>

      <View style={[styles.offlineCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.offlineIcon, { backgroundColor: `${statusColor}1A` }]}><BrandIcon name={connectionStatus === 'offline' ? 'alert-circle' : 'repeat'} size={18} color={statusColor} /></View>
        <View style={styles.offlineCopy}>
          <View style={styles.offlineTitleRow}><Text style={[styles.offlineTitle, { color: colors.foreground }]}>{statusTitle}</Text><View style={[styles.statusDot, { backgroundColor: statusColor }]} /></View>
          <Text style={[styles.offlineDescription, { color: colors.mutedForeground }]}>{statusDescription}</Text>
          {!!localState.lastLocation && <Text style={[styles.offlineLocation, { color: colors.primary }]}>Lokasi terakhir · {locationLabel(localState.lastLocation)}</Text>}
        </View>
      </View>

      <ProgramSectionTitle eyebrow="AKSES CEPAT" title="Bawa data ke lapangan" />
      <View style={styles.quickGrid}>
        <Pressable testID="extension-map-open-visits" accessibilityRole="button" accessibilityLabel="Buka kunjungan lapangan" onPress={() => router.push('/extension-visits')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="map-pin" size={17} color={colors.primary} /></View>
          <Text style={[styles.quickTitle, { color: colors.foreground }]}>Kunjungan</Text>
          <Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Catat hasil lapangan</Text>
        </Pressable>
        <Pressable testID="extension-map-open-reports" accessibilityRole="button" accessibilityLabel="Buka laporan pendampingan" onPress={() => router.push('/extension-reports')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="bar-chart-2" size={17} color={colors.primary} /></View>
          <Text style={[styles.quickTitle, { color: colors.foreground }]}>Laporan</Text>
          <Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Baca rekap wilayah</Text>
        </Pressable>
      </View>

      {!!feedback && <Text style={[styles.feedback, { color: colors.primary }]}>{feedback}</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  mapCard: { minHeight: 320, borderRadius: 22, padding: 15, overflow: 'hidden', gap: 12 },
  mapContour: { position: 'absolute', borderWidth: 1, borderRadius: 120, opacity: 0.17 },
  mapContourOne: { width: 260, height: 150, left: -42, top: 112, transform: [{ rotate: '-18deg' }] },
  mapContourTwo: { width: 220, height: 120, right: -45, top: 78, transform: [{ rotate: '24deg' }] },
  mapTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  mapKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.25 },
  mapTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 28, marginTop: 4 },
  mapSubtitle: { fontFamily: 'Manrope_400Regular', fontSize: 10, opacity: 0.76, marginTop: 3 },
  locateButton: { width: 39, height: 39, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  mapCanvas: { height: 175, position: 'relative', marginHorizontal: 4 },
  routeLine: { position: 'absolute', left: '13%', right: '11%', top: '52%', height: 2, opacity: 0.22, transform: [{ rotate: '-9deg' }] },
  marker: { position: 'absolute', width: 34, height: 34, marginLeft: -17, marginTop: -17, alignItems: 'center', justifyContent: 'center' },
  markerPulse: { position: 'absolute', width: 32, height: 32, borderWidth: 1, borderRadius: 16, opacity: 0.52 },
  markerDot: { width: 16, height: 16, borderWidth: 3, borderRadius: 10 },
  currentLocation: { position: 'absolute', width: 17, height: 17, borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginLeft: -8, marginTop: -8 },
  currentLocationInner: { width: 5, height: 5, borderRadius: 3 },
  mapLegend: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  scoreHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scoreCircle: { width: 83, height: 83, borderRadius: 42, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  scoreValue: { fontFamily: 'Manrope_700Bold', fontSize: 28, lineHeight: 31 },
  scoreOutOf: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  scoreCopy: { flex: 1, gap: 4 },
  scoreGroup: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  scoreLocation: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  factorList: { gap: 10 },
  factorRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  factorIcon: { width: 26, height: 26, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  factorLabel: { width: 112, fontFamily: 'Manrope_400Regular', fontSize: 9.5 },
  factorTrack: { flex: 1, height: 7, borderRadius: 7, overflow: 'hidden' },
  factorFill: { height: 7, borderRadius: 7 },
  factorValue: { width: 25, textAlign: 'right', fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  nextAction: { borderTopWidth: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'center', gap: 7 },
  nextActionText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  saveOfflineButton: { minHeight: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  saveOfflineText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  offlineCard: { borderWidth: 1, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  offlineIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  offlineCopy: { flex: 1, gap: 4 },
  offlineTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  offlineTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12.5 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  offlineDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  offlineLocation: { fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  quickGrid: { flexDirection: 'row', gap: 9 },
  quickAction: { flex: 1, minHeight: 105, borderWidth: 1, borderRadius: 17, padding: 11, gap: 6 },
  quickIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  quickTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  quickDetail: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, lineHeight: 14 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
});