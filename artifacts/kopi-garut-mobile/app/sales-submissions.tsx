import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon } from '@/components/BrandIcon';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORAGE_KEY = '@kopi-garut/sales-submissions';
const processes = ['Natural', 'Washed', 'Honey'] as const;
const statuses = ['Semua', 'Tersedia', 'Dipesan', 'Dikirim', 'Selesai'] as const;

type SaleStatus = Exclude<(typeof statuses)[number], 'Semua'>;
type SaleProcess = (typeof processes)[number];

type SaleLot = {
  id: string;
  name: string;
  date: string;
  quantity: number;
  process: SaleProcess;
  price: number;
  status: SaleStatus;
  buyer?: string;
};

type BuyerRequest = {
  id: string;
  lotId: string;
  buyer: string;
  quantity: number;
  offer: number;
  note: string;
  status: 'Menunggu respons' | 'Diterima';
};

const initialLots: SaleLot[] = [
  {
    id: 'lot-papandayan-01',
    name: 'Papandayan Series',
    date: 'Panen 18 September 2026',
    quantity: 80,
    process: 'Natural',
    price: 85000,
    status: 'Tersedia',
  },
  {
    id: 'lot-cikuray-02',
    name: 'Cikuray Honey Lot',
    date: 'Panen 8 September 2026',
    quantity: 45,
    process: 'Honey',
    price: 98000,
    status: 'Dipesan',
    buyer: 'Kedai Lereng Garut',
  },
  {
    id: 'lot-talagasari-03',
    name: 'Talagasari Pagi',
    date: 'Panen 27 Agustus 2026',
    quantity: 32,
    process: 'Washed',
    price: 92000,
    status: 'Dikirim',
    buyer: 'Koperasi Cikuray Mandiri',
  },
];

const initialRequests: BuyerRequest[] = [
  {
    id: 'request-koperasi-01',
    lotId: 'lot-papandayan-01',
    buyer: 'Koperasi Cikuray Mandiri',
    quantity: 60,
    offer: 85000,
    note: 'Dibutuhkan untuk pengiriman kolektif akhir bulan.',
    status: 'Menunggu respons',
  },
  {
    id: 'request-roastery-02',
    lotId: 'lot-papandayan-01',
    buyer: 'Ruang Seduh Bandung',
    quantity: 20,
    offer: 88000,
    note: 'Mencari lot natural untuk menu single origin.',
    status: 'Menunggu respons',
  },
];

function formatRupiah(value: number) {
  return `Rp ${Math.round(value).toLocaleString('id-ID')}`;
}

function numberValue(value: string) {
  return Number.parseFloat(value.replace(',', '.').replace(/[^\d.-]/g, ''));
}

function nextStatus(status: SaleStatus): SaleStatus | null {
  if (status === 'Dipesan') return 'Dikirim';
  if (status === 'Dikirim') return 'Selesai';
  return null;
}

function statusPositive(status: SaleStatus) {
  return status === 'Tersedia' || status === 'Selesai';
}

export default function SalesSubmissionsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 0 : insets.top;
  const [lots, setLots] = useState<SaleLot[]>(initialLots);
  const [requests, setRequests] = useState<BuyerRequest[]>(initialRequests);
  const [filter, setFilter] = useState<(typeof statuses)[number]>('Semua');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [process, setProcess] = useState<SaleProcess>('Natural');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const stored = JSON.parse(value) as { lots?: SaleLot[]; requests?: BuyerRequest[] };
        if (stored.lots?.length) setLots(stored.lots);
        if (stored.requests?.length) setRequests(stored.requests);
      } catch {
        setFeedback('Data pengajuan belum dapat dibaca. Data contoh tetap ditampilkan.');
      }
    }).catch(() => setFeedback('Data pengajuan belum dapat dimuat.'));
  }, []);

  const persist = async (nextLots: SaleLot[], nextRequests: BuyerRequest[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ lots: nextLots, requests: nextRequests }));
    } catch {
      setFeedback('Perubahan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  const visibleLots = useMemo(
    () => filter === 'Semua' ? lots : lots.filter((lot) => lot.status === filter),
    [filter, lots],
  );
  const pendingRequests = requests.filter((request) => request.status === 'Menunggu respons');
  const availableWeight = lots.filter((lot) => lot.status === 'Tersedia').reduce((total, lot) => total + lot.quantity, 0);

  const addLot = async () => {
    const quantityValue = numberValue(quantity);
    const priceValue = numberValue(price);
    if (!name.trim() || !Number.isFinite(quantityValue) || quantityValue <= 0 || !Number.isFinite(priceValue) || priceValue <= 0) {
      setFeedback('Lengkapi nama lot, jumlah kilogram, dan harga penawaran.');
      return;
    }

    const nextLot: SaleLot = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      date: 'Diajukan hari ini',
      quantity: quantityValue,
      process,
      price: priceValue,
      status: 'Tersedia',
    };
    const nextLots = [nextLot, ...lots];
    setLots(nextLots);
    setName('');
    setQuantity('');
    setPrice('');
    setFeedback('Lot siap ditawarkan kepada pembeli.');
    await persist(nextLots, requests);
  };

  const acceptRequest = async (request: BuyerRequest) => {
    const lot = lots.find((item) => item.id === request.lotId);
    if (!lot || lot.status !== 'Tersedia' || lot.quantity < request.quantity) {
      setFeedback('Lot tidak cukup atau sudah memiliki permintaan lain.');
      return;
    }
    const nextLots = lots.map((item) => item.id === request.lotId ? {
      ...item,
      status: 'Dipesan' as const,
      buyer: request.buyer,
      quantity: request.quantity,
    } : item);
    const nextRequests = requests.map((item) => item.id === request.id ? { ...item, status: 'Diterima' as const } : item);
    setLots(nextLots);
    setRequests(nextRequests);
    setFeedback(`Permintaan ${request.buyer} diterima. Lot masuk status dipesan.`);
    await persist(nextLots, nextRequests);
  };

  const advanceLot = async (lot: SaleLot) => {
    const status = nextStatus(lot.status);
    if (!status) return;
    const nextLots = lots.map((item) => item.id === lot.id ? { ...item, status } : item);
    setLots(nextLots);
    setFeedback(`${lot.name} sekarang berstatus ${status.toLowerCase()}.`);
    await persist(nextLots, requests);
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Pengajuan penjualan" subtitle="PETANI · PASAR" cart={false} notifications />
      <ProgramIntro
        eyebrow="AKSES PASAR PETANI"
        title="Lot siap, pembeli datang."
        description="Tawarkan hasil kebun dengan data yang jelas, lalu pantau setiap permintaan sampai kopi selesai dikirim."
      />

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.foreground }]}>
          <BrandIcon name="package" size={18} color={colors.accent} />
          <Text style={[styles.summaryValue, { color: colors.primaryForeground }]}>{lots.length}</Text>
          <Text style={[styles.summaryLabel, { color: colors.primaryForeground }]}>total lot tercatat</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="trending-up" size={18} color={colors.primary} />
          <Text style={[styles.summaryValue, { color: colors.foreground }]}>{availableWeight} kg</Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>siap ditawarkan</Text>
        </View>
      </View>

      <ProgramSectionTitle eyebrow="01 · LOT BARU" title="Ajukan hasil panen" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Nama lot</Text>
        <TextInput
          testID="sale-lot-name"
          accessibilityLabel="Nama lot penjualan"
          value={name}
          onChangeText={setName}
          placeholder="Contoh: Papandayan Series"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
        />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Jumlah (kg)</Text>
            <TextInput
              testID="sale-lot-quantity"
              accessibilityLabel="Jumlah lot dalam kilogram"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Contoh: 80"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="decimal-pad"
              style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Harga / kg (Rp)</Text>
            <TextInput
              testID="sale-lot-price"
              accessibilityLabel="Harga lot per kilogram"
              value={price}
              onChangeText={setPrice}
              placeholder="Contoh: 85000"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="number-pad"
              style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
            />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Proses pascapanen</Text>
        <View style={styles.optionRow}>
          {processes.map((item) => {
            const selected = process === item;
            return (
              <Pressable
                key={item}
                testID={`sale-process-${item.toLowerCase()}`}
                accessibilityRole="button"
                accessibilityLabel={`Pilih proses ${item}`}
                accessibilityState={{ selected }}
                onPress={() => setProcess(item)}
                style={({ pressed }) => [styles.option, { backgroundColor: selected ? colors.primary : colors.background, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}
              >
                <Text style={[styles.optionText, { color: selected ? colors.primaryForeground : colors.foreground }]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </ProgramCard>
      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('tersimpan') || feedback.includes('ditawarkan') || feedback.includes('diterima') || feedback.includes('sekarang') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <Pressable
        testID="sale-lot-submit"
        accessibilityRole="button"
        accessibilityLabel="Ajukan lot untuk dijual"
        onPress={() => void addLot()}
        style={({ pressed }) => [styles.saveButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
      >
        <BrandIcon name="send" size={17} color={colors.primaryForeground} />
        <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>Ajukan lot untuk dijual</Text>
      </Pressable>

      <ProgramSectionTitle eyebrow={`${pendingRequests.length} PERMINTAAN MASUK`} title="Pembeli ingin membeli" />
      {pendingRequests.length === 0 ? (
        <ProgramCard muted>
          <View style={styles.emptyRow}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.card }]}><BrandIcon name="bell" size={19} color={colors.primary} /></View>
            <View style={styles.emptyCopy}>
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada permintaan baru</Text>
              <Text style={[styles.helper, { color: colors.mutedForeground }]}>Lot yang aktif akan terlihat oleh pembeli dan koperasi yang mencari kopi Garut.</Text>
            </View>
          </View>
        </ProgramCard>
      ) : (
        <View style={styles.requestList}>
          {pendingRequests.map((request) => {
            const lot = lots.find((item) => item.id === request.lotId);
            return (
              <ProgramCard key={request.id}>
                <View style={styles.requestTop}>
                  <View style={[styles.requestIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="users" size={18} color={colors.primary} /></View>
                  <View style={styles.requestCopy}>
                    <Text style={[styles.requestBuyer, { color: colors.foreground }]}>{request.buyer}</Text>
                    <Text style={[styles.requestLot, { color: colors.mutedForeground }]}>{lot?.name ?? 'Lot pilihan'} · {request.quantity} kg</Text>
                  </View>
                  <StatusPill label="Menunggu respons" positive={false} />
                </View>
                <Text style={[styles.requestNote, { color: colors.mutedForeground }]}>{request.note}</Text>
                <View style={[styles.offerRow, { borderTopColor: colors.border }]}>
                  <View>
                    <Text style={[styles.offerLabel, { color: colors.mutedForeground }]}>Penawaran</Text>
                    <Text style={[styles.offerValue, { color: colors.primary }]}>{formatRupiah(request.offer)} / kg</Text>
                  </View>
                  <Pressable
                    testID={`sale-request-accept-${request.id}`}
                    accessibilityRole="button"
                    accessibilityLabel={`Terima permintaan dari ${request.buyer}`}
                    onPress={() => void acceptRequest(request)}
                    style={({ pressed }) => [styles.acceptButton, { backgroundColor: colors.foreground, opacity: pressed ? 0.8 : 1 }]}
                  >
                    <BrandIcon name="check" size={15} color={colors.primaryForeground} />
                    <Text style={[styles.acceptText, { color: colors.primaryForeground }]}>Terima</Text>
                  </Pressable>
                </View>
              </ProgramCard>
            );
          })}
        </View>
      )}

      <ProgramSectionTitle eyebrow="02 · PERJALANAN LOT" title="Pantau status penjualan" />
      <View style={styles.filters}>
        {statuses.map((item) => <FilterChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} testID={`sale-filter-${item.toLowerCase()}`} />)}
      </View>
      {visibleLots.length === 0 ? (
        <ProgramCard muted><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada lot di status ini</Text><Text style={[styles.helper, { color: colors.mutedForeground }]}>Coba pilih status lain untuk melihat perjalanan lot.</Text></ProgramCard>
      ) : (
        <View style={styles.lotList}>
          {visibleLots.map((lot) => {
            const upcoming = nextStatus(lot.status);
            return (
              <ProgramCard key={lot.id}>
                <View style={styles.lotTop}>
                  <View style={styles.lotCopy}>
                    <Text style={[styles.lotName, { color: colors.foreground }]}>{lot.name}</Text>
                    <Text style={[styles.lotMeta, { color: colors.mutedForeground }]}>{lot.date} · {lot.process} · {lot.quantity} kg</Text>
                  </View>
                  <StatusPill label={lot.status} positive={statusPositive(lot.status)} />
                </View>
                <View style={styles.progressRow}>
                  {(['Tersedia', 'Dipesan', 'Dikirim', 'Selesai'] as SaleStatus[]).map((status) => <View key={status} style={[styles.progressStep, { backgroundColor: ['Tersedia', 'Dipesan', 'Dikirim', 'Selesai'].indexOf(status) <= ['Tersedia', 'Dipesan', 'Dikirim', 'Selesai'].indexOf(lot.status) ? colors.primary : colors.muted }]} />)}
                </View>
                <View style={styles.lotFoot}>
                  <View style={styles.lotPriceCopy}>
                    <Text style={[styles.lotBuyer, { color: colors.mutedForeground }]}>{lot.buyer ? `Untuk ${lot.buyer}` : 'Terbuka untuk pembeli'}</Text>
                    <Text style={[styles.lotPrice, { color: colors.primary }]}>{formatRupiah(lot.price)} / kg</Text>
                  </View>
                  {upcoming && (
                    <Pressable
                      testID={`sale-advance-${lot.id}`}
                      accessibilityRole="button"
                      accessibilityLabel={`Ubah status menjadi ${upcoming}`}
                      onPress={() => void advanceLot(lot)}
                      style={({ pressed }) => [styles.advanceButton, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
                    >
                      <Text style={[styles.advanceText, { color: colors.foreground }]}>{upcoming}</Text>
                      <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
                    </Pressable>
                  )}
                </View>
              </ProgramCard>
            );
          })}
        </View>
      )}
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 17, gap: 12 },
  summaryRow: { flexDirection: 'row', gap: 10 },
  summaryCard: { flex: 1, minHeight: 112, borderRadius: 18, padding: 14, gap: 7 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 20 },
  summaryLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 11, marginBottom: 6 },
  inputRow: { flexDirection: 'row', gap: 10 },
  inputHalf: { flex: 1 },
  input: { minHeight: 46, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, fontFamily: 'Manrope_400Regular', fontSize: 12, marginBottom: 12 },
  optionRow: { flexDirection: 'row', gap: 8 },
  option: { flex: 1, borderWidth: 1, borderRadius: 13, paddingVertical: 11, alignItems: 'center' },
  optionText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  saveButton: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  saveButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  requestList: { gap: 10 },
  requestTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  requestIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  requestCopy: { flex: 1, gap: 3 },
  requestBuyer: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  requestLot: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  requestNote: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  offerRow: { borderTopWidth: 1, paddingTop: 11, marginTop: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  offerLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  offerValue: { fontFamily: 'Manrope_700Bold', fontSize: 12, marginTop: 2 },
  acceptButton: { minHeight: 38, borderRadius: 12, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 6 },
  acceptText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  filters: { flexDirection: 'row', gap: 7, flexWrap: 'wrap' },
  lotList: { gap: 10 },
  lotTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  lotCopy: { flex: 1, gap: 3 },
  lotName: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18 },
  lotMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  progressRow: { flexDirection: 'row', gap: 4, marginTop: 3 },
  progressStep: { flex: 1, height: 5, borderRadius: 3 },
  lotFoot: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 },
  lotPriceCopy: { flex: 1, gap: 3 },
  lotBuyer: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  lotPrice: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  advanceButton: { minHeight: 34, borderWidth: 1, borderRadius: 11, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  advanceText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  emptyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  emptyIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  emptyCopy: { flex: 1, gap: 3 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18 },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});