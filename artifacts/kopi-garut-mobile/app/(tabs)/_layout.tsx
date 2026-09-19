import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThreeDNavIcon, ThreeDNavIconName } from '@/components/BrandIcon';

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';
  const isIOS = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';
  const bottomInset = isWeb ? 34 : insets.bottom;

  const tabIcon = (icon: ThreeDNavIconName, focused: boolean) => (
    <View
      style={[
        styles.tabIcon,
        focused && { backgroundColor: colors.secondary },
      ]}
    >
      <ThreeDNavIcon
        name={icon}
        size={focused ? 31 : 29}
        mainColor={focused ? colors.primary : colors.mutedForeground}
        lightColor={focused ? colors.accent : colors.secondary}
        shadowColor={focused ? colors.foreground : colors.border}
        accentColor={focused ? colors.primaryForeground : colors.card}
      />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isIOS ? 'transparent' : colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          height: 76 + bottomInset,
          paddingTop: 8,
          paddingBottom: bottomInset + 6,
          paddingHorizontal: 8,
          shadowColor: colors.foreground,
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: isDark ? 0.22 : 0.08,
          shadowRadius: 18,
        },
        tabBarItemStyle: { borderRadius: 18 },
        tabBarLabelStyle: {
          fontFamily: 'Manrope_700Bold',
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={92}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: colors.card,
                  borderTopColor: colors.border,
                  borderTopWidth: 1,
                },
              ]}
            />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
           title: 'Beranda',
          tabBarIcon: ({ focused }) => tabIcon('home', focused),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Jelajah',
          tabBarIcon: ({ focused }) => tabIcon('grid', focused),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pesanan',
          tabBarIcon: ({ focused }) => tabIcon('package', focused),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Akun',
          tabBarIcon: ({ focused }) => tabIcon('user', focused),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return <ClassicTabLayout />;
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 44,
    height: 38,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
