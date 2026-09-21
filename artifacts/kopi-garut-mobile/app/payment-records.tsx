import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon } from '@/components/BrandIcon';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORAGE_KEY = '@kopi-garut/payment-records';
const counterpartyTypes = ['Koperasi', 'Pembeli'] as const;
const paymentFilters = ['Semua', 'Belum lunas', 'Lunas'] as const;

type CounterpartyType = (typeof counterpartyTypes)[number];
type PaymentStatus = Exclude<(typeof paymentFilters)[number], 'Semua'>;

type PaymentRecord = {
  id: string;
  counterpartyType: CounterpartyType;
  counterparty: string;
  lot: string;
  date: string;
  quantity: number;
  salePrice: number;
  total: number;
  downPayment: number;
  remaining: number;
  status: PaymentStatus;
  dueDate: string;
};

const initialRecords: PaymentRecord[] = [
  {
    id: 'payment-koperasi-cikuray',
    counterpartyType: 'Koperasi',
    counterparty: 'Koperasi Cikuray Mandiri',
    lot: 'Talagasari Pagi · Washed',
    date: '27 Agustus 2026',
    quantity: 32,
    salePrice: 92000,
    total: 2944000,
    downPayment: 1500000,
    remaining: 1444000,
    status: 'Belum lunas',
    dueDate: '30 September 2026',
  },
  {
    id: 'payment-kedai-lereng',
    counterpartyType: 'Pembeli',
    counterparty: 'Kedai Lereng Garut',
    lot: 'Cikuray Honey Lot · Honey',
    date: '8 September 2026',
    quantity: 45,
    salePrice: 98000,
    total: 4410000,
    downPayment: 4410000,
    remaining: 0,
    status: 'Lunas',
    dueDate: 'Selesai 12 September 2026',
  },
  {
    id: 'payment-ruang-seduh',
    counterpartyType: 'Pembeli',
    counterparty: 'Ruang Seduh Bandung',
    lot: 'Papandayan Series · Natural',
    date: '18 September 2026',
    quantity: 20,
    salePrice: 88000,
    total: 1760000,
    downPayment: 800000,
    remaining: 960000,
    status: 'Belum lunas',
    dueDate: '5 Oktober 2026',
  },
];

function formatRupiah(value: number) {
  return `Rp ${Math.round(value).toLocaleString('id-ID')}`;
}

function numberValue(value: string) {
  return Number.parseFloat(value.replace(',', '.').replace(/[^\d.-]/g, ''));
}

function today() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function PaymentRecordsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const [records, setRecords] = useState<PaymentRecord[]>(initialRecords);
  const [filter, setFilter] = useState<(typeof paymentFilters)[number]>('Semua');
  const [counterpartyType, setCounterpartyType] = useState<CounterpartyType>('Koperasi');
  const [counterparty, setCounterparty] = useState('');
  const [lot, setLot] = useState('');
  const [quantity, setQuantity] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const storedRecords = JSON.parse(value) as PaymentRecord[];
        if (Array.isArray(storedRecords)) setRecords(storedRecords);
      } catch {
        setFeedback('Riwayat pembayaran belum dapat dibaca. Data contoh tetap ditampilkan.');
      }
    }).catch(() => setFeedback('Riwayat pembayaran belum dapat dimuat.'));
  }, []);

  const persist = async (nextRecords: PaymentRecord[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
    } catch {
      setFeedback('Perubahan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  const totals = useMemo(() => ({
    sales: records.reduce((sum, record) => sum + record.total, 0),
    paid: records.reduce((sum, record) => sum + record.downPayment, 0),
    remaining: records.reduce((sum, record) => sum + record.remaining, 0),
  }), [records]);

  const visibleRecords = useMemo(
    () => filter === 'Semua' ? records : records.filter((record) => record.status === filter),
    [filter, records],
  );

  const addRecord = async () => {
    const quantityValue = numberValue(quantity);
    const salePriceValue = numberValue(salePrice);
    const downPaymentValue = numberValue(downPayment);
    const total = quantityValue * salePriceValue;

    if (!counterparty.trim() || !lot.trim() || !Number.isFinite(quantityValue) || quantityValue <= 0 || !Number.isFinite(salePriceValue) || salePriceValue <= 0 || !Number.isFinite(downPaymentValue) || downPaymentValue < 0) {
      setFeedback('Lengkapi nama koperasi/pembeli, lot, jumlah, harga jual, dan uang muka.');
      return;
    }
    if (downPaymentValue > total) {
      setFeedback('Uang muka tidak boleh lebih besar dari total harga jual.');
      return;
    }

    const remaining = total - downPaymentValue;
    const nextRecord: PaymentRecord = {
      id: makeId(),
      counterpartyType,
      counterparty: counterparty.trim(),
      lot: lot.trim(),
      date: today(),
      quantity: quantityValue,
      salePrice: salePriceValue,
      total,
      downPayment: downPaymentValue,
      remaining,
      status: remaining === 0 ? 'Lunas' : 'Belum lunas',
      dueDate: remaining === 0 ? `Selesai ${today()}` : 'Belum ditentukan',
    };
    const nextRecords = [nextRecord, ...records];
    setRecords(nextRecords);
    setCounterparty('');
    setLot('');
    setQuantity('');
    setSalePrice('');
    setDownPayment('');
    setFeedback('Transaksi pembayaran tersimpan di handphone.');
    await persist(nextRecords);
  };

  const markAsPaid = async (record: PaymentRecord) => {
    const nextRecords = records.map((item) => item.id === record.id ? {
      ...item,
      downPayment: item.total,
      remaining: 0,
      status: 'Lunas' as const,
      dueDate: `Selesai ${today()}`,
    } : item);
    setRecords(nextRecords);
    setFeedback(`${record.counterparty} ditandai sudah lunas.`);
    await persist(nextRecords);
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Pencatatan pembayaran" subtitle="PETANI · KEUANGAN" cart={false} notifications />
      <ProgramIntro
        eyebrow="BUKU PEMBAYARAN KEBUN"
        title="Uang masuk, jelas."
        description="Catat harga jual, uang muka, dan sisa pembayaran agar setiap transaksi dengan koperasi atau pembeli mudah ditelusuri."
      />

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.foreground }]}>
          <BrandIcon name="trending-up" size={18} color={colors.accent} />
          <Text style={[styles.summaryValue, { color: colors.primaryForeground }]}>{formatRupiah(totals.sales)}</Text>
          <Text style={[styles.summaryLabel, { color: colors.primaryForeground }]}>total harga jual</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="check" size={18} color={colors.primary} />
          <Text style={[styles.summaryValue, { color: colors.foreground }]}>{formatRupiah(totals.paid)}</Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>sudah diterima</Text>
        </View>
      </View>
      <View style={[styles.outstandingCard, { backgroundColor: colors.primary }]}>
        <View style={styles.outstandingIcon}><BrandIcon name="calendar" size={19} color={colors.primaryForeground} /></View>
        <View style={styles.outstandingCopy}>
          <Text style={[styles.outstandingLabel, { color: colors.primaryForeground }]}>SISA PEMBAYARAN</Text>
          <Text style={[styles.outstandingValue, { color: colors.primaryForeground }]}>{formatRupiah(totals.remaining)}</Text>
        </View>
        <Text style={[styles.outstandingNote, { color: colors.primaryForeground }]}>dari semua transaksi belum lunas</Text>
      </View>

      <ProgramSectionTitle eyebrow="01 · TRANSAKSI BARU" title="Catat pembayaran masuk" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Jenis transaksi</Text>
        <View style={styles.optionRow}>
          {counterpartyTypes.map((item) => <Pressable key={item} testID={`payment-type-${item.toLowerCase()}`} accessibilityRole="button" accessibilityLabel={`Pilih transaksi ${item}`} accessibilityState={{ selected: counterpartyType === item }} onPress={() => setCounterpartyType(item)} style={({ pressed }) => [styles.option, { backgroundColor: counterpartyType === item ? colors.primary : colors.background, borderColor: counterpartyType === item ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name={item === 'Koperasi' ? 'users' : 'briefcase'} size={15} color={counterpartyType === item ? colors.primaryForeground : colors.primary} /><Text style={[styles.optionText, { color: counterpartyType === item ? colors.primaryForeground : colors.foreground }]}>{item}</Text></Pressable>)}
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Nama koperasi atau pembeli</Text>
        <TextInput testID="payment-counterparty" accessibilityLabel="Nama koperasi atau pembeli" value={counterparty} onChangeText={setCounterparty} placeholder={counterpartyType === 'Koperasi' ? 'Contoh: Koperasi Cikuray Mandiri' : 'Contoh: Kedai Lereng Garut'} placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Nama lot</Text>
        <TextInput testID="payment-lot" accessibilityLabel="Nama lot pembayaran" value={lot} onChangeText={setLot} placeholder="Contoh: Papandayan Series · Natural" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Jumlah (kg)</Text>
            <TextInput testID="payment-quantity" accessibilityLabel="Jumlah transaksi dalam kilogram" value={quantity} onChangeText={setQuantity} placeholder="Contoh: 80" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Harga jual / kg</Text>
            <TextInput testID="payment-sale-price" accessibilityLabel="Harga jual per kilogram" value={salePrice} onChangeText={setSalePrice} placeholder="Contoh: 85000" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Uang muka diterima (Rp)</Text>
        <TextInput testID="payment-down-payment" accessibilityLabel="Uang muka diterima" value={downPayment} onChangeText={setDownPayment} placeholder="Contoh: 1500000" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <View style={[styles.calculation, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.calculationLabel, { color: colors.mutedForeground }]}>Sisa akan dihitung otomatis</Text>
          <Text style={[styles.calculationValue, { color: colors.primary }]}>{formatRupiah(Math.max(0, (numberValue(quantity) || 0) * (numberValue(salePrice) || 0) - (numberValue(downPayment) || 0)))}</Text>
        </View>
      </ProgramCard>
      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('tersimpan') || feedback.includes('ditandai') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <Pressable testID="payment-save" accessibilityRole="button" accessibilityLabel="Simpan transaksi pembayaran" onPress={() => void addRecord()} style={({ pressed }) => [styles.saveButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
        <BrandIcon name="check" size={18} color={colors.primaryForeground} />
        <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>Simpan transaksi</Text>
      </Pressable>

      <ProgramSectionTitle eyebrow={`${records.length} TRANSAKSI TERCATAT`} title="Riwayat pembayaran" />
      <View style={styles.filters}>{paymentFilters.map((item) => <FilterChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} testID={`payment-filter-${item.toLowerCase().replace(' ', '-')}`} />)}</View>
      <View style={styles.recordList}>
        {visibleRecords.map((record) => (
          <ProgramCard key={record.id}>
            <View style={styles.recordTop}>
              <View style={[styles.recordIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={record.counterpartyType === 'Koperasi' ? 'users' : 'briefcase'} size={17} color={colors.primary} /></View>
              <View style={styles.recordCopy}>
                <Text style={[styles.recordType, { color: colors.primary }]}>{record.counterpartyType}</Text>
                <Text style={[styles.recordName, { color: colors.foreground }]}>{record.counterparty}</Text>
                <Text style={[styles.recordMeta, { color: colors.mutedForeground }]}>{record.lot} · {record.quantity} kg · {record.date}</Text>
              </View>
              <StatusPill label={record.status} positive={record.status === 'Lunas'} />
            </View>
            <View style={[styles.amountGrid, { borderTopColor: colors.border }]}>
              <View style={styles.amountCell}><Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>Harga jual</Text><Text style={[styles.amountValue, { color: colors.foreground }]}>{formatRupiah(record.total)}</Text></View>
              <View style={styles.amountCell}><Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>Uang muka</Text><Text style={[styles.amountValue, { color: colors.primary }]}>{formatRupiah(record.downPayment)}</Text></View>
              <View style={styles.amountCell}><Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>Sisa</Text><Text style={[styles.amountValue, { color: record.remaining > 0 ? colors.accent : colors.primary }]}>{formatRupiah(record.remaining)}</Text></View>
            </View>
            <View style={styles.recordFoot}>
              <View style={styles.dueCopy}><BrandIcon name={record.remaining > 0 ? 'calendar' : 'check'} size={14} color={colors.mutedForeground} /><Text style={[styles.dueText, { color: colors.mutedForeground }]}>{record.remaining > 0 ? `Jatuh tempo ${record.dueDate}` : record.dueDate}</Text></View>
              {record.remaining > 0 && <Pressable testID={`payment-mark-paid-${record.id}`} accessibilityRole="button" accessibilityLabel={`Tandai transaksi ${record.counterparty} sudah lunas`} onPress={() => void markAsPaid(record)} style={({ pressed }) => [styles.paidButton, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}><Text style={[styles.paidButtonText, { color: colors.foreground }]}>Tandai lunas</Text><BrandIcon name="arrow-up-right" size={14} color={colors.primary} /></Pressable>}
            </View>
          </ProgramCard>
        ))}
      </View>
      <View style={[styles.noteCard, { backgroundColor: colors.secondary }]}>
        <BrandIcon name="info" size={17} color={colors.primary} />
        <Text style={[styles.noteText, { color: colors.secondaryForeground }]}>Catatan ini tersimpan di handphone. Cocokkan bukti transfer atau kuitansi dengan setiap transaksi agar riwayat pembayaran tetap rapi.</Text>
      </View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 17, gap: 12 },
  summaryRow: { flexDirection: 'row', gap: 10 },
  summaryCard: { flex: 1, minHeight: 112, borderRadius: 18, padding: 14, gap: 7 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 16 },
  summaryLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  outstandingCard: { minHeight: 91, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  outstandingIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.16)' },
  outstandingCopy: { flex: 1, gap: 4 },
  outstandingLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.05 },
  outstandingValue: { fontFamily: 'Manrope_700Bold', fontSize: 20 },
  outstandingNote: { alignSelf: 'flex-end', fontFamily: 'Manrope_400Regular', fontSize: 9, maxWidth: 82, lineHeight: 13, textAlign: 'right' },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 11, marginBottom: 6 },
  optionRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  option: { flex: 1, minHeight: 42, borderWidth: 1, borderRadius: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  optionText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  inputRow: { flexDirection: 'row', gap: 10 },
  inputHalf: { flex: 1 },
  input: { minHeight: 46, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, fontFamily: 'Manrope_400Regular', fontSize: 12, marginBottom: 12 },
  calculation: { minHeight: 48, borderRadius: 13, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  calculationLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  calculationValue: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  saveButton: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  saveButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  filters: { flexDirection: 'row', gap: 7, flexWrap: 'wrap' },
  recordList: { gap: 10 },
  recordTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  recordIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  recordCopy: { flex: 1, gap: 2 },
  recordType: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' },
  recordName: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  recordMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  amountGrid: { borderTopWidth: 1, marginTop: 12, paddingTop: 11, flexDirection: 'row', gap: 8 },
  amountCell: { flex: 1, gap: 3 },
  amountLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  amountValue: { fontFamily: 'Manrope_700Bold', fontSize: 10, lineHeight: 14 },
  recordFoot: { marginTop: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  dueCopy: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 },
  dueText: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13 },
  paidButton: { minHeight: 34, borderWidth: 1, borderRadius: 11, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  paidButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  noteCard: { borderRadius: 17, padding: 13, flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});