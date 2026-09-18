import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle } from '@/components/ProgramUI';
import { reportFilterOptions, ReportFilterKey, reports } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

const filterKeys = Object.keys(reportFilterOptions) as ReportFilterKey[];

function matchesFilter(report: (typeof reports)[number], key: ReportFilterKey, value: string) {
  if (value.startsWith('Semua')) return true;
  if (key === 'Kecamatan') return report.location === value;
  if (key === 'Kelompok tani') return report.group === value;
  if (key === 'Komoditas') return report.commodity === value;
  if (key === 'Produksi') return report.production === value;
  if (key === 'Penjualan') return report.sales === value;
  return report.program === value;
}

export default function ReportsScreen() {
  const colors = useColors();
  const [activeKey, setActiveKey] = useState<ReportFilterKey>('Kecamatan');
  const [selected, setSelected] = useState<Record<ReportFilterKey, string>>(() => Object.fromEntries(filterKeys.map((key) => [key, reportFilterOptions[key][0]])) as Record<ReportFilterKey, string>);
  const activeValue = selected[activeKey];
  const filteredReports = useMemo(() => reports.filter((report) => filterKeys.every((key) => matchesFilter(report, key, selected[key]))), [selected]);

  return (
    <Screen>
      <Header back title="Laporan digital" subtitle="PROGRAM · DATA" />
      <ProgramIntro eyebrow="DATA YANG BISA DIBACA" title="Lihat gerak kopi Garut." description="Pilih dimensi laporan, lalu sempitkan sampai menemukan cerita yang ingin ditindaklanjuti." />
      <ProgramSectionTitle eyebrow="FILTER LAPORAN" title="Pilih dimensi" action="Reset" onAction={() => setSelected(Object.fromEntries(filterKeys.map((key) => [key, reportFilterOptions[key][0]])) as Record<ReportFilterKey, string>)} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {filterKeys.map((key) => <FilterChip key={key} label={key} selected={activeKey === key} onPress={() => setActiveKey(key)} testID={`report-filter-${key}`} />)}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.values}>
        {reportFilterOptions[activeKey].map((value) => <FilterChip key={value} label={value} selected={activeValue === value} onPress={() => setSelected((current) => ({ ...current, [activeKey]: value }))} />)}
      </ScrollView>
      <View style={[styles.activeFilter, { backgroundColor: colors.secondary }]}><BrandIcon name="sliders" size={15} color={colors.primary} /><Text style={[styles.activeText, { color: colors.foreground }]}>{activeKey}: {activeValue}</Text></View>
      <ProgramSectionTitle eyebrow={`${filteredReports.length} RINGKASAN`} title="Laporan terbaru" />
      {filteredReports.length > 0 ? <View style={styles.reportList}>{filteredReports.map((report) => <ProgramCard key={report.id}><View style={styles.reportTop}><View style={styles.reportIcon}><BrandIcon name={report.sales === 'Ada permintaan baru' ? 'trending-up' : 'bar-chart-2'} size={18} color={colors.primary} /></View><View style={styles.reportCopy}><Text style={[styles.reportTitle, { color: colors.foreground }]}>{report.title}</Text><Text style={[styles.reportMeta, { color: colors.mutedForeground }]}>{report.location} · {report.group}</Text></View><Text style={[styles.reportValue, { color: colors.primary }]}>{report.value}</Text></View><Text style={[styles.reportNote, { color: colors.mutedForeground }]}>{report.note}</Text></ProgramCard>)}</View> : <View style={[styles.empty, { borderColor: colors.border }]}><BrandIcon name="bar-chart-2" size={22} color={colors.primary} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada ringkasan</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Coba longgarkan satu filter untuk melihat data lain.</Text></View>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { gap: 8, paddingRight: 12 },
  values: { gap: 8, paddingRight: 12, paddingBottom: 1 },
  activeFilter: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  activeText: { fontFamily: 'Manrope_600SemiBold', fontSize: 11 },
  reportList: { gap: 10 },
  reportTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reportIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' },
  reportCopy: { flex: 1, gap: 3 },
  reportTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  reportMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  reportValue: { fontFamily: 'Manrope_700Bold', fontSize: 14 },
  reportNote: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  empty: { borderWidth: 1, borderStyle: 'dashed', borderRadius: 20, minHeight: 150, alignItems: 'center', justifyContent: 'center', padding: 20, gap: 8 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 11, textAlign: 'center' },
});