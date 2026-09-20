import React from 'react';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Header, Screen } from '@/components/AppUI';
import { findCoffee, formatPrice, orderStatusLabels } from '@/data/coffees';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function OrdersScreen() {
  const colors = useColors();
  const router = useRouter();
  const { orders } = useStore();

  return (
    <Screen>
      <Header title="Pesanan" subtitle="RIWAYAT BELANJA" />
      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.intro}
      >
        <View style={styles.introCopy}>
          <Text style={[styles.introKicker, { color: colors.accent }]}>RIWAYAT BELANJA</Text>
          <Text style={[styles.introTitle, { color: colors.card }]}>
            {orders.length > 0 ? 'Kopi yang pernah kamu pilih.' : 'Mulai ritual kopimu.'}
          </Text>
          <Text style={[styles.introText, { color: colors.background }]}>
            {orders.length > 0
              ? 'Semua perjalanan pesananmu tersimpan di sini.'
              : 'Pesanan pertamamu akan menjadi awal perjalanan rasa.'}
          </Text>
        </View>
        <View style={[styles.introIcon, { backgroundColor: colors.card }]}>
          <BrandIcon name="package" size={27} color={colors.primary} />
          <Text style={[styles.introCount, { color: colors.primary }]}>
            {orders.length.toString().padStart(2, '0')}
          </Text>
        </View>
      </LinearGradient>

      {orders.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="coffee" size={24} color={colors.primary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada pesanan</Text>
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
            Jelajahi kopi Garut dan temukan cangkir yang ingin kamu bawa pulang.
          </Text>
          <Pressable
            testID="orders-browse-coffee"
            onPress={() => router.push('/catalog')}
            style={({ pressed }) => [
              styles.browseButton,
              { backgroundColor: colors.primary, opacity: pressed ? 0.76 : 1 },
            ]}
          >
            <Text style={[styles.browseButtonText, { color: colors.primaryForeground }]}>
              Jelajahi kopi
            </Text>
            <BrandIcon name="arrow-up-right" size={15} color={colors.primaryForeground} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.list}>
          {orders.map((order, index) => {
            const firstCoffee = findCoffee(order.items[0]?.coffeeId);
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            const itemNames = order.items
              .map((item) => findCoffee(item.coffeeId)?.name)
              .filter(Boolean)
              .join(' · ');
            const statusIndex = statusSteps.indexOf(order.status);
            const statusDescription = statusDescriptions[order.status];

            return (
              <Animated.View
                entering={FadeInDown.delay(index * 70).duration(420)}
                key={order.id}
                style={[
                  styles.orderCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.orderTop}>
                  <View style={styles.orderMeta}>
                    <View style={styles.orderLabelRow}>
                      <View style={[styles.orderLabelDot, { backgroundColor: colors.accent }]} />
                      <Text style={[styles.orderLabel, { color: colors.primary }]}>PESANAN TERBARU</Text>
                    </View>
                    <Text style={[styles.orderId, { color: colors.foreground }]}>#{order.id.slice(-6)}</Text>
                  </View>
                  <View style={[styles.status, { backgroundColor: colors.secondary }]}>
                    <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
                    <Text style={[styles.statusText, { color: colors.primary }]}>
                      {orderStatusLabels[order.status]}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.orderDate, { color: colors.mutedForeground }]}>
                  {new Date(order.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>

                <View style={[styles.statusSummary, { backgroundColor: colors.secondary }]}>
                  <View style={[styles.statusSummaryIcon, { backgroundColor: colors.card }]}>
                    <BrandIcon
                      name={order.status === 'Delivered' ? 'check' : order.status === 'Preparing' ? 'coffee' : 'package'}
                      size={17}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.statusSummaryCopy}>
                    <Text style={[styles.statusSummaryTitle, { color: colors.foreground }]}>
                      {statusDescription}
                    </Text>
                    <Text style={[styles.statusSummaryMeta, { color: colors.mutedForeground }]}>
                      {order.status === 'Delivered' ? 'Terima kasih sudah memilih kopi Garut.' : 'Kami akan memberi kabar di setiap tahap.'}
                    </Text>
                  </View>
                </View>

                <View style={styles.progress}>
                  {statusSteps.map((step, stepIndex) => (
                    <React.Fragment key={step}>
                      <View style={styles.progressStep}>
                        <View
                          style={[
                            styles.progressDot,
                            {
                              backgroundColor: stepIndex <= statusIndex ? colors.primary : colors.border,
                            },
                          ]}
                        >
                          {stepIndex <= statusIndex && (
                            <BrandIcon name="check" size={10} color={colors.primaryForeground} />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.progressLabel,
                            { color: stepIndex <= statusIndex ? colors.foreground : colors.mutedForeground },
                          ]}
                        >
                          {orderStatusLabels[step]}
                        </Text>
                      </View>
                      {stepIndex < statusSteps.length - 1 && (
                        <View
                          style={[
                            styles.progressLine,
                            { backgroundColor: stepIndex < statusIndex ? colors.primary : colors.border },
                          ]}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </View>

                <View style={[styles.orderDivider, { backgroundColor: colors.border }]} />

                <View style={styles.productRow}>
                  {firstCoffee && (
                    <Image source={firstCoffee.image} contentFit="cover" style={styles.productImage} />
                  )}
                  <View style={styles.productCopy}>
                    <Text numberOfLines={2} style={[styles.productName, { color: colors.foreground }]}>
                      {itemNames}
                    </Text>
                    <Text style={[styles.itemCount, { color: colors.mutedForeground }]}>
                      {itemCount} {itemCount === 1 ? 'item' : 'item'} · Total pesanan
                    </Text>
                  </View>
                  <View style={styles.totalCopy}>
                    <Text style={[styles.totalLabel, { color: colors.mutedForeground }]}>TOTAL</Text>
                    <Text style={[styles.total, { color: colors.primary }]}>{formatPrice(order.total)}</Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    testID={`order-view-${order.id}`}
                    onPress={() => firstCoffee && router.push(`/product/${firstCoffee.id}`)}
                    style={({ pressed }) => [
                      styles.detailButton,
                      { backgroundColor: colors.secondary, opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <Text style={[styles.detailText, { color: colors.foreground }]}>Lihat kopi</Text>
                    <Feather name="arrow-up-right" size={14} color={colors.foreground} />
                  </Pressable>
                  <Pressable
                    testID={`order-reorder-${order.id}`}
                    onPress={() => router.push('/catalog')}
                    style={({ pressed }) => [
                      styles.reorderButton,
                      { backgroundColor: colors.primary, opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <Feather name="repeat" size={15} color={colors.primaryForeground} />
                    <Text style={[styles.reorderText, { color: colors.primaryForeground }]}>Belanja lagi</Text>
                  </Pressable>
                </View>
              </Animated.View>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { borderRadius: 22, padding: 18, minHeight: 148, flexDirection: 'row', justifyContent: 'space-between', gap: 15, overflow: 'hidden' },
  introCopy: { flex: 1, justifyContent: 'space-between', gap: 8 },
  introKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  introTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 28, fontWeight: '700', letterSpacing: -0.45 },
  introText: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, opacity: 0.82 },
  introIcon: { width: 65, height: 76, borderRadius: 19, alignItems: 'center', justifyContent: 'center', gap: 5, transform: [{ rotate: '4deg' }] },
  introCount: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800', letterSpacing: 0.7 },
  list: { gap: 12 },
  orderCard: { borderRadius: 20, borderWidth: 1, padding: 14, gap: 12 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  orderMeta: { flex: 1, gap: 4 },
  orderLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  orderLabelDot: { width: 5, height: 5, borderRadius: 3 },
  orderLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  orderId: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '700', letterSpacing: -0.25 },
  orderDate: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  status: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  statusSummary: { borderRadius: 15, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 9 },
  statusSummaryIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statusSummaryCopy: { flex: 1, gap: 3 },
  statusSummaryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17, fontWeight: '700' },
  statusSummaryMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  progress: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 2, marginTop: 1 },
  progressStep: { alignItems: 'center', gap: 5, width: 61 },
  progressDot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  progressLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, textAlign: 'center' },
  progressLine: { flex: 1, height: 2, marginTop: 9 },
  orderDivider: { height: 1 },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  productImage: { width: 64, height: 64, borderRadius: 16 },
  productCopy: { flex: 1, gap: 5 },
  productName: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18, fontWeight: '700' },
  itemCount: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  totalCopy: { alignItems: 'flex-end', gap: 3 },
  totalLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.8 },
  total: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 8 },
  detailButton: { flex: 0.8, height: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  detailText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  reorderButton: { flex: 1.2, height: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  reorderText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  empty: { borderWidth: 1, borderRadius: 22, padding: 22, alignItems: 'center', gap: 10 },
  emptyIcon: { width: 58, height: 58, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 20, fontWeight: '700', letterSpacing: -0.2 },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20, textAlign: 'center', maxWidth: 280 },
  browseButton: { height: 42, borderRadius: 13, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 5 },
  browseButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
});

const statusSteps = ['Placed', 'Preparing', 'Delivered'] as const;
const statusDescriptions: Record<(typeof statusSteps)[number], string> = {
  Placed: 'Pesanan diterima dan menunggu diproses.',
  Preparing: 'Kopi sedang disiapkan dengan teliti.',
  Delivered: 'Pesanan sudah sampai di rumahmu.',
};