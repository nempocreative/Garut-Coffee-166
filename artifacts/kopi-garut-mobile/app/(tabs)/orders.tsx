import React from 'react';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState, Header, Screen } from '@/components/AppUI';
import { findCoffee, formatPrice, orderStatusLabels } from '@/data/coffees';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';

export default function OrdersScreen() {
  const colors = useColors();
  const router = useRouter();
  const { orders } = useStore();

  return (
    <Screen>
      <Header title="Pesanan" subtitle="RIWAYAT BELANJA" />
      {orders.length === 0 ? (
        <EmptyState
          icon="package"
          title="Belum ada pesanan"
          text="Pesanan yang kamu buat akan tampil di sini, lengkap dengan status pengirimannya."
          action="Jelajahi kopi"
          onAction={() => router.push('/catalog')}
        />
      ) : (
        <View style={styles.list}>
          {orders.map((order) => {
            const firstCoffee = findCoffee(order.items[0]?.coffeeId);
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            const itemNames = order.items
              .map((item) => findCoffee(item.coffeeId)?.name)
              .filter(Boolean)
              .join(' · ');

            return (
              <View
                key={order.id}
                style={[
                  styles.orderCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.orderTop}>
                  <View style={styles.orderMeta}>
                    <Text style={[styles.orderId, { color: colors.foreground }]}>
                      Pesanan #{order.id.slice(-6)}
                    </Text>
                    <Text style={[styles.orderDate, { color: colors.mutedForeground }]}>
                      {new Date(order.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={[styles.status, { backgroundColor: colors.secondary }]}>
                    <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
                    <Text style={[styles.statusText, { color: colors.primary }]}>
                      {orderStatusLabels[order.status]}
                    </Text>
                  </View>
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
                      {itemCount} item
                    </Text>
                  </View>
                  <Text style={[styles.total, { color: colors.primary }]}>
                    {formatPrice(order.total)}
                  </Text>
                </View>

                <Pressable
                  onPress={() => router.push('/catalog')}
                  style={({ pressed }) => [
                    styles.reorderButton,
                    { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Feather name="repeat" size={15} color={colors.primary} />
                  <Text style={[styles.reorderText, { color: colors.foreground }]}>
                    Belanja lagi
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
  orderCard: { borderRadius: 20, borderWidth: 1, padding: 14, gap: 13 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  orderMeta: { flex: 1, gap: 4 },
  orderId: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  orderDate: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  status: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  orderDivider: { height: 1 },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  productImage: { width: 56, height: 56, borderRadius: 14 },
  productCopy: { flex: 1, gap: 5 },
  productName: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18, fontWeight: '700' },
  itemCount: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  total: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  reorderButton: { height: 38, borderRadius: 12, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  reorderText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
});