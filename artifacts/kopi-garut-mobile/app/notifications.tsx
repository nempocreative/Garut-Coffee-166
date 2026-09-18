import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { notifications } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

export default function NotificationsScreen() {
  const colors = useColors();
  const [readIds, setReadIds] = useState<string[]>([]);
  const unreadCount = notifications.length - readIds.length;
  const sortedNotifications = useMemo(() => notifications, []);
  return (
    <Screen>
      <Header back title="Notifikasi program" subtitle="PROGRAM · PEMBARUAN" />
      <ProgramIntro eyebrow="TETAP TERHUBUNG" title="Yang perlu kamu tahu." description="Pengingat penting untuk menjaga ritme pelatihan, permintaan pembeli, dan musim kebun tetap terbaca." />
      <View style={[styles.summary, { backgroundColor: colors.foreground }]}><View style={styles.summaryCopy}><Text style={[styles.summaryKicker, { color: colors.accent }]}>PEMBARUAN TERKINI</Text><Text style={[styles.summaryTitle, { color: colors.card }]}>{unreadCount} notifikasi belum dibaca</Text></View><Pressable testID="mark-notifications-read" accessibilityRole="button" accessibilityLabel="Tandai semua notifikasi sudah dibaca" onPress={() => setReadIds(notifications.map((item) => item.id))} style={({ pressed }) => [styles.readButton, { backgroundColor: colors.primary, opacity: pressed ? 0.76 : 1 }]}><BrandIcon name="check" size={15} color={colors.primaryForeground} /></Pressable></View>
      <ProgramSectionTitle eyebrow="MASUK TERBARU" title="Untuk kelompokmu" />
      <View style={styles.list}>
        {sortedNotifications.map((item) => {
          const isRead = readIds.includes(item.id);
          return <Pressable key={item.id} testID={`notification-${item.id}`} accessibilityRole="button" accessibilityLabel={`Buka notifikasi ${item.title}`} onPress={() => setReadIds((current) => current.includes(item.id) ? current : [...current, item.id])} style={({ pressed }) => [styles.notification, { backgroundColor: colors.card, borderColor: isRead ? colors.border : colors.primary, opacity: pressed ? 0.78 : 1 }]}><View style={[styles.notificationIcon, { backgroundColor: isRead ? colors.muted : colors.secondary }]}><BrandIcon name={item.icon} size={18} color={isRead ? colors.mutedForeground : colors.primary} /></View><View style={styles.notificationCopy}><View style={styles.notificationTop}><Text style={[styles.notificationType, { color: colors.primary }]}>{item.type}</Text><Text style={[styles.notificationTime, { color: colors.mutedForeground }]}>{item.time}</Text></View><Text style={[styles.notificationTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.notificationDetail, { color: colors.mutedForeground }]}>{item.detail}</Text>{!isRead && <StatusPill label="Belum dibaca" />}</View></Pressable>;
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { minHeight: 92, borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryCopy: { flex: 1, gap: 5 },
  summaryKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  summaryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 23 },
  readButton: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  list: { gap: 10 },
  notification: { borderWidth: 1, borderRadius: 19, padding: 13, flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  notificationIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  notificationCopy: { flex: 1, gap: 4 },
  notificationTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  notificationType: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.05, textTransform: 'uppercase' },
  notificationTime: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  notificationTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18 },
  notificationDetail: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});