import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

export function ProgramIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const colors = useColors();
  return (
    <View style={styles.intro}>
      <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text>
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text>
    </View>
  );
}

export function ProgramSectionTitle({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionCopy}>
        {eyebrow && <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text>}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      </View>
      {action && onAction && <Pressable accessibilityRole="button" onPress={onAction}><Text style={[styles.action, { color: colors.primary }]}>{action}</Text></Pressable>}
    </View>
  );
}

export function ProgramTile({ icon, title, description, onPress, testID }: { icon: BrandIconName; title: string; description: string; onPress: () => void; testID?: string }) {
  const colors = useColors();
  return (
    <Pressable testID={testID} accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={({ pressed }) => [styles.tile, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
      <View style={[styles.tileIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={icon} size={19} color={colors.primary} /></View>
      <View style={styles.tileCopy}><Text style={[styles.tileTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.tileDescription, { color: colors.mutedForeground }]}>{description}</Text></View>
      <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
    </Pressable>
  );
}

export function StatusPill({ label, positive = true }: { label: string; positive?: boolean }) {
  const colors = useColors();
  return <View style={[styles.pill, { backgroundColor: positive ? colors.secondary : colors.muted }]}><View style={[styles.pillDot, { backgroundColor: positive ? colors.primary : colors.accent }]} /><Text style={[styles.pillText, { color: positive ? colors.primary : colors.mutedForeground }]}>{label}</Text></View>;
}

export function MetricCard({ icon, value, label, detail }: { icon: BrandIconName; value: string; label: string; detail?: string }) {
  const colors = useColors();
  return <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.metricIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={icon} size={17} color={colors.primary} /></View><Text style={[styles.metricValue, { color: colors.foreground }]}>{value}</Text><Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>{label}</Text>{detail && <Text style={[styles.metricDetail, { color: colors.primary }]}>{detail}</Text>}</View>;
}

export function InfoRow({ icon, label, value, detail, last = false }: { icon: BrandIconName; label: string; value: string; detail?: string; last?: boolean }) {
  const colors = useColors();
  return <View style={[styles.infoRow, !last && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}><View style={[styles.infoIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={icon} size={16} color={colors.primary} /></View><View style={styles.infoCopy}><Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>{label}</Text><Text style={[styles.infoValue, { color: colors.foreground }]}>{value}</Text>{detail && <Text style={[styles.infoDetail, { color: colors.mutedForeground }]}>{detail}</Text>}</View></View>;
}

export function FilterChip({ label, selected, onPress, testID }: { label: string; selected?: boolean; onPress: () => void; testID?: string }) {
  const colors = useColors();
  return <Pressable testID={testID} accessibilityRole="button" accessibilityLabel={`Pilih ${label}`} onPress={onPress} style={({ pressed }) => [styles.filterChip, { backgroundColor: selected ? colors.primary : colors.card, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.75 : 1 }]}><Text style={[styles.filterText, { color: selected ? colors.primaryForeground : colors.foreground }]}>{label}</Text></Pressable>;
}

export function ProgramCard({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  const colors = useColors();
  return <View style={[styles.programCard, { backgroundColor: muted ? colors.secondary : colors.card, borderColor: colors.border }]}>{children}</View>;
}

const styles = StyleSheet.create({
  intro: { gap: 7 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.45, textTransform: 'uppercase' },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 28, lineHeight: 33, letterSpacing: -0.8 },
  description: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20, maxWidth: 340 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 },
  sectionCopy: { flex: 1, gap: 3 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 25, letterSpacing: -0.35 },
  action: { fontFamily: 'Manrope_700Bold', fontSize: 11, paddingBottom: 2 },
  tile: { minHeight: 78, borderWidth: 1, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  tileIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  tileCopy: { flex: 1, gap: 3 },
  tileTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  tileDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15 },
  pill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 6 },
  pillDot: { width: 6, height: 6, borderRadius: 3 },
  pillText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  metricCard: { width: '48.5%', borderWidth: 1, borderRadius: 17, padding: 13, gap: 4 },
  metricIcon: { width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  metricValue: { fontFamily: 'Manrope_700Bold', fontSize: 20, fontWeight: '800' },
  metricLabel: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15 },
  metricDetail: { fontFamily: 'Manrope_700Bold', fontSize: 9, marginTop: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 12 },
  infoIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  infoCopy: { flex: 1, gap: 2 },
  infoLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  infoValue: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18 },
  infoDetail: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  filterChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 9 },
  filterText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  programCard: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 10 },
});