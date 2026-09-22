import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon } from '@/components/BrandIcon';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORAGE_KEY = '@kopi-garut/farm-costs';
const REVENUE_STORAGE_KEY = '@kopi-garut/farm-costs/revenue';
const SALES_STORAGE_KEY = '@kopi-garut/sales-submissions';
const categories = ['Pupuk', 'Tenaga kerja', 'Transportasi', 'Pengeringan', 'Kemasan'] as const;

type CostCategory = (typeof categories)[number];

type FarmCost = {
  id: string;
  category: CostCategory;
  description: string;
  amount: number;
  date: string;
};

type StoredSaleData = {
  lots?: Array<{ quantity?: number; price?: number }>;
};

const initialCosts: FarmCost[] = [
  { id: 'cost-fertilizer', category: 'Pupuk', description: 'Pupuk organik dan dolomit', amount: 1200000, date: 'September 2026' },
  { id: 'cost-labor', category: 'Tenaga kerja', description: 'Sortasi dan pemeliharaan kebun', amount: 2800000, date: 'September 2026' },
  { id: 'cost-transport', category: 'Transportasi', description: 'Angkut cherry dari kebun', amount: 800000, date: 'September 2026' },
  { id: 'cost-drying', category: 'Pengeringan', description: 'Sewa rumah jemur dan rak', amount: 900000, date: 'September 2026' },
  { id: 'cost-packaging', category: 'Kemasan', description: 'Karung GrainPro dan label lot', amount: 500000, date: 'September 2026' },
];

const defaultRevenue = 14154000;

function formatRupiah(value: number) {
  return `Rp ${Math.round(value).toLocaleString('id-ID')}`;
}

function numberValue(value: string) {
  return Number.parseFloat(value.replace(',', '.').replace(/[^\d.-]/g, ''));
}

function today() {
  return new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

export default function FarmCostsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 0 : insets.top;
  const [costs, setCosts] = useState<FarmCost[]>(initialCosts);
  const [revenue, setRevenue] = useState(defaultRevenue);
  const [category, setCategory] = useState<CostCategory>('Pupuk');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(REVENUE_STORAGE_KEY), AsyncStorage.getItem(SALES_STORAGE_KEY)]).then(([costsValue, revenueValue, salesValue]) => {
      if (costsValue) {
        try {
          const storedCosts = JSON.parse(costsValue) as FarmCost[];
          if (Array.isArray(storedCosts)) setCosts(storedCosts);
        } catch {
          setFeedback('Catatan biaya belum dapat dibaca. Data contoh tetap ditampilkan.');
        }
      }
      if (revenueValue) {
        const storedRevenue = Number(revenueValue);
        if (Number.isFinite(storedRevenue) && storedRevenue >= 0) setRevenue(storedRevenue);
      } else if (salesValue) {
        try {
          const storedSales = JSON.parse(salesValue) as StoredSaleData;
          const salesRevenue = storedSales.lots?.reduce((total, lot) => total + (lot.quantity ?? 0) * (lot.price ?? 0), 0) ?? 0;
          if (salesRevenue > 0) setRevenue(salesRevenue);
        } catch {
          setFeedback('Nilai penjualan belum dapat dihitung. Gunakan perkiraan yang tampil.');
        }
      }
    }).catch(() => setFeedback('Catatan biaya belum dapat dimuat.'));
  }, []);

  const totalCosts = useMemo(() => costs.reduce((total, item) => total + item.amount, 0), [costs]);
  const netProfit = revenue - totalCosts;

  const persist = async (nextCosts: FarmCost[], nextRevenue = revenue) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextCosts));
      await AsyncStorage.setItem(REVENUE_STORAGE_KEY, String(nextRevenue));
    } catch {
      setFeedback('Perubahan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  const saveRevenue = async () => {
    if (!Number.isFinite(revenue) || revenue < 0) {
      setFeedback('Masukkan perkiraan pendapatan yang valid.');
      return;
    }
    await persist(costs, revenue);
    setFeedback('Perkiraan pendapatan diperbarui.');
  };

  const addCost = async () => {
    const amountValue = numberValue(amount);
    if (!description.trim() || !Number.isFinite(amountValue) || amountValue <= 0) {
      setFeedback('Lengkapi keterangan dan nominal biaya kebun.');
      return;
    }
    const nextCost: FarmCost = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      category,
      description: description.trim(),
      amount: amountValue,
      date: today(),
    };
    const nextCosts = [nextCost, ...costs];
    setCosts(nextCosts);
    setDescription('');
    setAmount('');
    setFeedback('Biaya kebun tersimpan di handphone.');
    await persist(nextCosts);
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Biaya kebun" subtitle="PETANI · KEUANGAN" cart={false} notifications />
      <ProgramIntro
        eyebrow="BUKU KEUANGAN KEBUN"
        title="Tahu biaya, tahu nilai."
        description="Catat pengeluaran dari kebun sampai kemasan agar perkiraan hasil penjualan tidak berhenti di omzet."
      />

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="trending-up" size={18} color={colors.primary} />
          <Text style={[styles.summaryValue, { color: colors.foreground }]}>{formatRupiah(revenue)}</Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>perkiraan pendapatan</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.foreground }]}>
          <BrandIcon name="package" size={18} color={colors.accent} />
          <Text style={[styles.summaryValue, { color: colors.primaryForeground }]}>{formatRupiah(totalCosts)}</Text>
          <Text style={[styles.summaryLabel, { color: colors.primaryForeground }]}>total biaya kebun</Text>
        </View>
      </View>
      <View style={[styles.profitCard, { backgroundColor: netProfit >= 0 ? colors.primary : colors.destructive }]}>
        <View style={styles.profitIcon}><BrandIcon name={netProfit >= 0 ? 'trending-up' : 'alert-circle'} size={19} color={colors.primaryForeground} /></View>
        <View style={styles.profitCopy}>
          <Text style={[styles.profitLabel, { color: colors.primaryForeground }]}>PERKIRAAN KEUNTUNGAN BERSIH</Text>
          <Text style={[styles.profitValue, { color: colors.primaryForeground }]}>{formatRupiah(netProfit)}</Text>
        </View>
        <Text style={[styles.profitNote, { color: colors.primaryForeground }]}>{netProfit >= 0 ? 'setelah biaya tercatat' : 'biaya melebihi pendapatan'}</Text>
      </View>

      <ProgramSectionTitle eyebrow="01 · NILAI PENJUALAN" title="Perbarui perkiraan pendapatan" />
      <ProgramCard muted>
        <Text style={[styles.helper, { color: colors.mutedForeground }]}>Nilai awal dihitung dari lot pada Pengajuan Penjualan. Sesuaikan jika ada perubahan harga atau jumlah yang akan terjual.</Text>
        <View style={styles.revenueInputRow}>
          <Text style={[styles.currencyPrefix, { color: colors.primary }]}>Rp</Text>
          <TextInput
            testID="farm-cost-revenue"
            accessibilityLabel="Perkiraan pendapatan penjualan"
            value={String(Math.round(revenue))}
            onChangeText={(value) => setRevenue(numberValue(value) || 0)}
            onEndEditing={() => void saveRevenue()}
            keyboardType="number-pad"
            style={[styles.revenueInput, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
          />
        </View>
      </ProgramCard>

      <ProgramSectionTitle eyebrow="02 · BIAYA BARU" title="Tambah pengeluaran" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Pos biaya</Text>
        <View style={styles.categoryWrap}>
          {categories.map((item) => <FilterChip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} testID={`farm-cost-category-${item.toLowerCase().replace(' ', '-')}`} />)}
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Keterangan</Text>
        <TextInput
          testID="farm-cost-description"
          accessibilityLabel="Keterangan biaya kebun"
          value={description}
          onChangeText={setDescription}
          placeholder="Contoh: Pupuk organik untuk blok utara"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
        />
        <Text style={[styles.label, { color: colors.foreground }]}>Nominal (Rp)</Text>
        <TextInput
          testID="farm-cost-amount"
          accessibilityLabel="Nominal biaya kebun"
          value={amount}
          onChangeText={setAmount}
          placeholder="Contoh: 750000"
          placeholderTextColor={colors.mutedForeground}
          keyboardType="number-pad"
          style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
        />
      </ProgramCard>
      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('tersimpan') || feedback.includes('diperbarui') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <Pressable
        testID="farm-cost-save"
        accessibilityRole="button"
        accessibilityLabel="Simpan biaya kebun"
        onPress={() => void addCost()}
        style={({ pressed }) => [styles.saveButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
      >
        <BrandIcon name="check" size={18} color={colors.primaryForeground} />
        <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>Simpan biaya kebun</Text>
      </Pressable>

      <ProgramSectionTitle eyebrow={`${costs.length} CATATAN TERSIMPAN`} title="Rincian biaya" />
      <View style={styles.costList}>
        {costs.map((item) => (
          <ProgramCard key={item.id}>
            <View style={styles.costTop}>
              <View style={[styles.costIcon, { backgroundColor: colors.secondary }]}>
                <BrandIcon name={item.category === 'Tenaga kerja' ? 'users' : item.category === 'Transportasi' ? 'map' : item.category === 'Pengeringan' ? 'calendar' : item.category === 'Kemasan' ? 'package' : 'trending-up'} size={17} color={colors.primary} />
              </View>
              <View style={styles.costCopy}>
                <Text style={[styles.costCategory, { color: colors.primary }]}>{item.category}</Text>
                <Text style={[styles.costDescription, { color: colors.foreground }]}>{item.description}</Text>
                <Text style={[styles.costDate, { color: colors.mutedForeground }]}>{item.date}</Text>
              </View>
              <Text style={[styles.costAmount, { color: colors.foreground }]}>{formatRupiah(item.amount)}</Text>
            </View>
          </ProgramCard>
        ))}
      </View>
      <View style={[styles.noteCard, { backgroundColor: colors.secondary }]}>
        <BrandIcon name="info" size={17} color={colors.primary} />
        <Text style={[styles.noteText, { color: colors.secondaryForeground }]}>Keuntungan bersih adalah perkiraan dari pendapatan lot dikurangi biaya yang sudah dicatat. Tambahkan biaya lain agar hasilnya semakin mendekati kondisi kebun.</Text>
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
  profitCard: { minHeight: 91, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  profitIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.16)' },
  profitCopy: { flex: 1, gap: 4 },
  profitLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.05 },
  profitValue: { fontFamily: 'Manrope_700Bold', fontSize: 20 },
  profitNote: { alignSelf: 'flex-end', fontFamily: 'Manrope_400Regular', fontSize: 9, maxWidth: 76, lineHeight: 13, textAlign: 'right' },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  revenueInputRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 3 },
  currencyPrefix: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  revenueInput: { flex: 1, minHeight: 44, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, fontFamily: 'Manrope_700Bold', fontSize: 14 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 11, marginBottom: 6 },
  categoryWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 5 },
  input: { minHeight: 46, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, fontFamily: 'Manrope_400Regular', fontSize: 12, marginBottom: 12 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  saveButton: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  saveButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  costList: { gap: 10 },
  costTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  costIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  costCopy: { flex: 1, gap: 2 },
  costCategory: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1 },
  costDescription: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 16 },
  costDate: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  costAmount: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  noteCard: { borderRadius: 17, padding: 13, flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});