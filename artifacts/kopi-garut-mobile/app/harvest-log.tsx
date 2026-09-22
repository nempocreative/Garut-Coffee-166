import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon } from '@/components/BrandIcon';
import { ProgramCard, ProgramIntro, ProgramSectionTitle } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORAGE_KEY = '@kopi-garut/harvest-logs';
const coffeeTypes = ['Arabika', 'Robusta'] as const;
const processes = ['Natural', 'Washed', 'Honey'] as const;
type CoffeeType = (typeof coffeeTypes)[number];
type HarvestProcess = (typeof processes)[number];

type HarvestLog = {
  id: string;
  date: string;
  quantity: string;
  block: string;
  coffeeType: CoffeeType;
  process: HarvestProcess;
  cost: string;
};

function today() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function numberValue(value: string) {
  return Number.parseFloat(value.replace(',', '.').replace(/[^\d.-]/g, ''));
}

function formatRupiah(value: number) {
  return `Rp ${Math.round(value).toLocaleString('id-ID')}`;
}

export default function HarvestLogScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 0 : insets.top;
  const [date, setDate] = useState(today());
  const [quantity, setQuantity] = useState('');
  const [block, setBlock] = useState('');
  const [coffeeType, setCoffeeType] = useState<CoffeeType>('Arabika');
  const [process, setProcess] = useState<HarvestProcess>('Natural');
  const [cost, setCost] = useState('');
  const [logs, setLogs] = useState<HarvestLog[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        setLogs(JSON.parse(value) as HarvestLog[]);
      } catch {
        setFeedback('Catatan panen belum dapat dibaca.');
      }
    }).catch(() => setFeedback('Catatan panen belum dapat dimuat.'));
  }, []);

  const summary = useMemo(() => logs.reduce((result, item) => ({
    quantity: result.quantity + (numberValue(item.quantity) || 0),
    cost: result.cost + (numberValue(item.cost) || 0),
  }), { quantity: 0, cost: 0 }), [logs]);

  const saveLog = async () => {
    const quantityValue = numberValue(quantity);
    const costValue = numberValue(cost);
    if (!date.trim() || !block.trim() || !Number.isFinite(quantityValue) || quantityValue <= 0 || !Number.isFinite(costValue) || costValue < 0) {
      setFeedback('Lengkapi tanggal, blok kebun, jumlah hasil, dan biaya produksi.');
      return;
    }
    const next: HarvestLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: date.trim(),
      quantity: String(quantityValue),
      block: block.trim(),
      coffeeType,
      process,
      cost: String(costValue),
    };
    const updated = [next, ...logs];
    setLogs(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setDate(today());
      setQuantity('');
      setBlock('');
      setCost('');
      setFeedback('Catatan panen tersimpan di handphone.');
    } catch {
      setFeedback('Catatan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Catatan panen" subtitle="PETANI · KEBUN" />
      <ProgramIntro
        eyebrow="BUKU KEBUN DIGITAL"
        title="Satu catatan untuk setiap panen."
        description="Simpan hasil panen, asal blok, proses, dan biaya produksi supaya nilai setiap lot lebih mudah dihitung."
      />

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.foreground }]}>
          <BrandIcon name="package" size={18} color={colors.accent} />
          <Text style={[styles.summaryValue, { color: colors.primaryForeground }]}>{summary.quantity.toLocaleString('id-ID', { maximumFractionDigits: 1 })} kg</Text>
          <Text style={[styles.summaryLabel, { color: colors.primaryForeground }]}>total hasil tercatat</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="trending-up" size={18} color={colors.primary} />
          <Text style={[styles.summaryValue, { color: colors.foreground }]}>{formatRupiah(summary.cost)}</Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>total biaya produksi</Text>
        </View>
      </View>

      <ProgramSectionTitle eyebrow="01 · PANEN BARU" title="Lengkapi catatan" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Tanggal panen</Text>
        <TextInput testID="harvest-date" accessibilityLabel="Tanggal panen" value={date} onChangeText={setDate} placeholder="Contoh: 21 September 2026" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Jumlah hasil (kg)</Text>
            <TextInput testID="harvest-quantity" accessibilityLabel="Jumlah hasil panen dalam kilogram" value={quantity} onChangeText={setQuantity} placeholder="Contoh: 120" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Biaya produksi (Rp)</Text>
            <TextInput testID="harvest-cost" accessibilityLabel="Biaya produksi dalam rupiah" value={cost} onChangeText={setCost} placeholder="Contoh: 2500000" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Blok kebun</Text>
        <TextInput testID="harvest-block" accessibilityLabel="Blok kebun" value={block} onChangeText={setBlock} placeholder="Contoh: Blok Utara · 1.650 mdpl" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
      </ProgramCard>

      <ProgramSectionTitle eyebrow="02 · IDENTITAS KOPI" title="Jenis dan proses" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Jenis kopi</Text>
        <View style={styles.optionRow}>
          {coffeeTypes.map((item) => {
            const selected = coffeeType === item;
            return <Pressable key={item} testID={`harvest-type-${item.toLowerCase()}`} accessibilityRole="button" accessibilityLabel={`Pilih jenis kopi ${item}`} accessibilityState={{ selected }} onPress={() => setCoffeeType(item)} style={({ pressed }) => [styles.option, { backgroundColor: selected ? colors.primary : colors.background, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}><Text style={[styles.optionText, { color: selected ? colors.primaryForeground : colors.foreground }]}>{item}</Text></Pressable>;
          })}
        </View>
        <Text style={[styles.label, { color: colors.foreground, marginTop: 5 }]}>Proses pascapanen</Text>
        <View style={styles.optionRow}>
          {processes.map((item) => {
            const selected = process === item;
            return <Pressable key={item} testID={`harvest-process-${item.toLowerCase()}`} accessibilityRole="button" accessibilityLabel={`Pilih proses ${item}`} accessibilityState={{ selected }} onPress={() => setProcess(item)} style={({ pressed }) => [styles.option, { backgroundColor: selected ? colors.primary : colors.background, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}><Text style={[styles.optionText, { color: selected ? colors.primaryForeground : colors.foreground }]}>{item}</Text></Pressable>;
          })}
        </View>
      </ProgramCard>

      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('tersimpan') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <Pressable testID="harvest-save" accessibilityRole="button" accessibilityLabel="Simpan catatan panen" onPress={() => void saveLog()} style={({ pressed }) => [styles.saveButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
        <BrandIcon name="check" size={18} color={colors.primaryForeground} />
        <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>Simpan catatan panen</Text>
      </Pressable>

      <ProgramSectionTitle eyebrow={`${logs.length} CATATAN TERSIMPAN`} title="Riwayat panen" />
      {logs.length === 0 ? (
        <ProgramCard muted><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada catatan panen</Text><Text style={[styles.helper, { color: colors.mutedForeground }]}>Catatan yang disimpan akan membantu melihat hasil dan biaya dari musim ke musim.</Text></ProgramCard>
      ) : logs.slice(0, 8).map((item) => {
        const quantityValue = numberValue(item.quantity);
        const costValue = numberValue(item.cost);
        return <ProgramCard key={item.id}><View style={styles.historyTop}><View style={styles.historyCopy}><Text style={[styles.historyTitle, { color: colors.foreground }]}>{item.coffeeType} · {item.block}</Text><Text style={[styles.historyDetail, { color: colors.mutedForeground }]}>{item.date} · {item.process} · {quantityValue.toLocaleString('id-ID')} kg</Text></View><Text style={[styles.historyCost, { color: colors.primary }]}>{formatRupiah(costValue)}</Text></View><Text style={[styles.helper, { color: colors.mutedForeground }]}>Biaya per kg: {formatRupiah(quantityValue ? costValue / quantityValue : 0)}</Text></ProgramCard>;
      })}
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 17, gap: 12 },
  summaryRow: { flexDirection: 'row', gap: 10 },
  summaryCard: { flex: 1, minHeight: 112, borderRadius: 18, padding: 14, gap: 7 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 17 },
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
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  historyTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  historyCopy: { flex: 1, gap: 4 },
  historyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18 },
  historyDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  historyCost: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
});