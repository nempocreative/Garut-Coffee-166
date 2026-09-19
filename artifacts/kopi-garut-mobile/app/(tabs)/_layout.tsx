import React from 'react';
import { Platform, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { BlurView } from 'expo-blur';
import { Tabs, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThreeDNavIcon, ThreeDNavIconName } from '@/components/BrandIcon';

type CenterTabButtonProps = {
  testID?: string;
  accessibilityState?: React.ComponentProps<typeof Pressable>['accessibilityState'];
  onLongPress?: React.ComponentProps<typeof Pressable>['onLongPress'];
};

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';
  const isIOS = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';
  const bottomInset = isWeb ? 34 : insets.bottom;
  const router = useRouter();

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

  const centerTabButton = (props: CenterTabButtonProps) => (
    <Pressable
      testID={props.testID}
      accessibilityRole="button"
      accessibilityLabel="Buka jejak QR Kopi Garut"
      accessibilityState={props.accessibilityState}
      onPress={() => router.push('/traceability')}
      onLongPress={props.onLongPress}
      style={styles.centerTabButton}
    >
      <LinearGradient
        colors={[colors.accent, colors.primary]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={[styles.centerTabCircle, { borderColor: colors.card, shadowColor: colors.foreground }]}
      >
        <View style={[styles.centerTabHighlight, { backgroundColor: colors.primaryForeground }]} />
        <ThreeDNavIcon
          name="scan"
          size={32}
          mainColor={colors.card}
          lightColor={colors.primaryForeground}
          shadowColor={colors.foreground}
          accentColor={colors.accent}
        />
      </LinearGradient>
      <Text style={[styles.centerTabLabel, { color: colors.primary }]}>Jejak</Text>
    </Pressable>
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
           height: 90 + bottomInset,
           paddingTop: 10,
           paddingBottom: bottomInset + 4,
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
        name="favorites"
        options={{
          title: 'Jejak',
          tabBarLabel: 'Jejak',
          tabBarButton: centerTabButton,
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
  centerTabButton: {
    flex: 1,
    minWidth: 58,
    height: 78,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -25,
    zIndex: 4,
  },
  centerTabCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
  },
  centerTabHighlight: {
    position: 'absolute',
    width: 18,
    height: 7,
    borderRadius: 5,
    top: 9,
    left: 14,
    opacity: 0.28,
    transform: [{ rotate: '-24deg' }],
  },
  centerTabLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },
});
