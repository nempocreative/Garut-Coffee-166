import React from 'react';
import { Platform } from 'react-native';
import { Slot, Tabs } from 'expo-router';

export default function TabLayout() {
  if (Platform.OS === 'web') {
    return <Slot />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Beranda' }}
      />
      <Tabs.Screen
        name="catalog"
        options={{ title: 'Produk' }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: 'Pilihan tersimpan' }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: 'Pesanan' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Akun' }}
      />
    </Tabs>
  );
}
