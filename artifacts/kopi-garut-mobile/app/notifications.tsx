import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Screen } from '@/components/AppUI';
import { FilterChip, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { farmerNotifications, notifications } from '@/data/program';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';
import { EXTENSION_NOTIFICATIONS_STORAGE_KEY, ExtensionNotification, NOTIFICATION_READ_STORAGE_KEY } from '@/data/extension-support';

type NotificationViewItem = {
  id: string;
  title: string;
  detail: string;
  type: string;
  time: string;
  icon: BrandIconName;
  route?: string;
  action?: string;
  priority: 'urgent' | 'normal' | 'positive';
};

export default function NotificationsScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session } = useAuth();
  const isFarmer = session?.id === 'petani';
  const isExtension = session?.id === 'penyuluh';
  const [readIds, setReadIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [directionalNotifications, setDirectionalNotifications] = useState<ExtensionNotification[]>([]);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(EXTENSION_NOTIFICATIONS_STORAGE_KEY),
      AsyncStorage.getItem(`${NOTIFICATION_READ_STORAGE_KEY}:${session?.id ?? 'guest'}`),
    ]).then(([storedNotifications, storedReadIds]) => {
      if (storedNotifications) {
        try {
          const parsed = JSON.parse(storedNotifications) as ExtensionNotification[];
          setDirectionalNotifications(Array.isArray(parsed) ? parsed : []);
        } catch {
          setDirectionalNotifications([]);
        }
      }
      if (storedReadIds) {
        try {
          const parsed = JSON.parse(storedReadIds) as string[];
          setReadIds(Array.isArray(parsed) ? parsed : []);
        } catch {
          setReadIds([]);
        }
      }
    }).catch(() => {
      setDirectionalNotifications([]);
      setReadIds([]);
    });
  }, [session?.id]);

  const staticNotifications = useMemo<NotificationViewItem[]>(() => {
    if (isFarmer) {
      return farmerNotifications.map((item) => ({
        id: item.id,
        title: item.title,
        detail: item.detail,
        type: item.type,
        time: item.time,
        icon: item.icon,
        route: item.route,
        action: item.action,
        priority: item.priority,
      }));
    }
    return notifications.map((item) => ({
      id: item.id,
      title: item.title,
      detail: item.detail,
      type: item.type,
      time: item.time,
      icon: item.icon,
      priority: 'normal' as const,
    }));
  }, [isFarmer]);

  const sourceNotifications = useMemo<NotificationViewItem[]>(
    () => [
      ...directionalNotifications
        .filter((item) => item.audience === (isFarmer ? 'petani' : isExtension ? 'penyuluh' : 'pengguna'))
        .map((item) => ({
          id: item.id,
          title: item.title,
          detail: item.detail,
          type: item.type,
          time: item.time,
          icon: item.icon,
          route: item.route,
          action: item.action,
          priority: item.priority,
        })),
      ...staticNotifications,
    ],
    [directionalNotifications, isExtension, isFarmer, staticNotifications],
  );

  const unreadCount = sourceNotifications.filter((item) => !readIds.includes(item.id)).length;
  const filters = isFarmer
    ? ['Semua', 'Panen', 'Data panen', 'Pelatihan', 'Harga', 'Verifikasi lot', 'Arahan penyuluh', 'Tindak lanjut']
    : isExtension
      ? ['Semua', 'Laporan masalah', 'Tindak lanjut']
      : ['Semua'];
  const sortedNotifications = useMemo(
    () => activeFilter === 'Semua' ? sourceNotifications : sourceNotifications.filter((item) => item.type === activeFilter),
    [activeFilter, sourceNotifications],
  );

  const markAsRead = (id: string) => {
    setReadIds((current) => {
      const next = current.includes(id) ? current : [...current, id];
      void AsyncStorage.setItem(`${NOTIFICATION_READ_STORAGE_KEY}:${session?.id ?? 'guest'}`, JSON.stringify(next));
      return next;
    });
  };

  return (
    <Screen>
      <Header back title={isFarmer ? 'Pengingat petani' : isExtension ? 'Tugas penyuluh' : 'Notifikasi program'} subtitle={isFarmer ? 'PETANI · AGENDA' : isExtension ? 'PENYULUH · INBOX' : 'PROGRAM · PEMBARUAN'} />
      <ProgramIntro
        eyebrow={isFarmer ? 'JANGAN LEWATKAN' : isExtension ? 'INBOX PENDAMPINGAN' : 'TETAP TERHUBUNG'}
        title={isFarmer ? 'Kebun tetap siap.' : isExtension ? 'Laporan masuk, tindakan menyusul.' : 'Yang perlu kamu tahu.'}
        description={isFarmer ? 'Pengingat panen, data, pelatihan, harga, verifikasi lot, dan arahan penyuluh tersusun dalam satu tempat.' : isExtension ? 'Laporan baru dari petani masuk di sini. Setelah memberi arahan, petani akan menerima pembaruan di notifikasinya.' : 'Pengingat penting untuk menjaga ritme pelatihan, permintaan pembeli, dan musim kebun tetap terbaca.'}
      />
      <View style={[styles.summary, { backgroundColor: colors.foreground }]}>
        <View style={styles.summaryIcon}><BrandIcon name="bell" size={20} color={colors.accent} /></View>
        <View style={styles.summaryCopy}>
          <Text style={[styles.summaryKicker, { color: colors.accent }]}>{isFarmer ? 'AGENDA KEBUN' : isExtension ? 'RUANG TUGAS' : 'PEMBARUAN TERKINI'}</Text>
          <Text style={[styles.summaryTitle, { color: colors.card }]}>{unreadCount} notifikasi belum dibaca</Text>
        </View>
        <Pressable testID="mark-notifications-read" accessibilityRole="button" accessibilityLabel="Tandai semua notifikasi sudah dibaca" onPress={() => setReadIds(sourceNotifications.map((item) => item.id))} style={({ pressed }) => [styles.readButton, { backgroundColor: colors.primary, opacity: pressed ? 0.76 : 1 }]}>
          <BrandIcon name="check" size={15} color={colors.primaryForeground} />
        </Pressable>
      </View>
      {(isFarmer || isExtension) && (
        <View style={styles.filterWrap}>
          {filters.map((filter) => <FilterChip key={filter} label={filter} selected={activeFilter === filter} onPress={() => setActiveFilter(filter)} testID={`notifications-filter-${filter.toLowerCase().replaceAll(' ', '-')}`} />)}
        </View>
      )}
       <ProgramSectionTitle eyebrow={isFarmer ? 'AGENDA TERBARU' : isExtension ? 'LAPORAN TERBARU' : 'MASUK TERBARU'} title={isFarmer ? 'Untuk kebunmu' : isExtension ? 'Untuk ditindaklanjuti' : 'Untuk kelompokmu'} />
      <View style={styles.list}>
        {sortedNotifications.map((item) => {
          const isRead = readIds.includes(item.id);
           const priorityColor = item.priority === 'urgent' ? colors.accent : item.priority === 'positive' ? colors.primary : colors.mutedForeground;
          return <View key={item.id} style={[styles.notification, { backgroundColor: colors.card, borderColor: isRead ? colors.border : colors.primary }]}>
             <Pressable testID={`notification-${item.id}`} accessibilityRole="button" accessibilityLabel={`Buka notifikasi ${item.title}`} onPress={() => { markAsRead(item.id); if (item.route) router.push(item.route as never); }} style={({ pressed }) => [styles.notificationMain, { opacity: pressed ? 0.78 : 1 }]}>
              <View style={[styles.notificationIcon, { backgroundColor: isRead ? colors.muted : colors.secondary }]}><BrandIcon name={item.icon} size={18} color={isRead ? colors.mutedForeground : colors.primary} /></View>
              <View style={styles.notificationCopy}>
                <View style={styles.notificationTop}><Text style={[styles.notificationType, { color: priorityColor }]}>{item.type}</Text><Text style={[styles.notificationTime, { color: colors.mutedForeground }]}>{item.time}</Text></View>
                <Text style={[styles.notificationTitle, { color: colors.foreground }]}>{item.title}</Text>
                <Text style={[styles.notificationDetail, { color: colors.mutedForeground }]}>{item.detail}</Text>
                {!isRead && <StatusPill label="Belum dibaca" />}
              </View>
            </Pressable>
             {item.action && item.route && <Pressable testID={`notification-action-${item.id}`} accessibilityRole="button" accessibilityLabel={item.action} onPress={() => { markAsRead(item.id); router.push(item.route as never); }} style={({ pressed }) => [styles.actionButton, { borderTopColor: colors.border, opacity: pressed ? 0.68 : 1 }]}>
               <Text style={[styles.actionText, { color: colors.primary }]}>{item.action}</Text>
              <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
            </Pressable>}
          </View>;
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { minHeight: 92, borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 11 },
  summaryIcon: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  summaryCopy: { flex: 1, gap: 5 },
  summaryKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  summaryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 23 },
  readButton: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  filterWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  list: { gap: 10 },
  notification: { borderWidth: 1, borderRadius: 19, overflow: 'hidden' },
  notificationMain: { padding: 13, flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  notificationIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  notificationCopy: { flex: 1, gap: 4 },
  notificationTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  notificationType: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.05, textTransform: 'uppercase' },
  notificationTime: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  notificationTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18 },
  notificationDetail: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  actionButton: { minHeight: 40, borderTopWidth: 1, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actionText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
});