import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { setBaseUrl } from '@workspace/api-client-react';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StoreProvider } from '@/context/StoreContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { canAccessRoute } from '@/data/auth';
import { AppLoading } from '@/components/AppLoading';
import { BottomMenu } from '@/components/BottomMenu';
import { FloatingCoffeeGameButton } from '@/components/FloatingCoffeeGameButton';
import { FloatingSupportButton } from '@/components/FloatingSupportButton';
import { CoffeeGameProvider } from '@/context/CoffeeGameContext';
import { ScrollVisibilityProvider } from '@/context/ScrollVisibilityContext';
import { useColors } from '@/hooks/useColors';

// Expo Go runs on the phone, outside Replit's local proxy. Give generated API
// requests the public development host instead of leaving them as relative URLs.
if (process.env.EXPO_PUBLIC_DOMAIN) {
  setBaseUrl(`https://${process.env.EXPO_PUBLIC_DOMAIN}`);
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready } = useAuth();
  const colors = useColors();

  useEffect(() => {
    if (!ready || pathname === '/login') return;
    if (!canAccessRoute(pathname, session?.id)) {
      router.replace('/login');
    }
  }, [pathname, ready, router, session?.id]);

  return (
    <View style={[styles.viewport, Platform.OS === 'web' && styles.webViewport, { backgroundColor: colors.background }]}>
      <Stack screenOptions={{ headerShown: false, headerBackTitle: 'Kembali' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <BottomMenu />
      <FloatingCoffeeGameButton />
      <FloatingSupportButton />
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  webViewport: {
    maxWidth: '100%',
    alignSelf: 'stretch',
    overflow: 'visible',
  },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  const [loadingFinished, setLoadingFinished] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void SplashScreen.hideAsync();
      setLoadingFinished(true);
    }, 1500);

    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
      setLoadingFinished(true);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [fontsLoaded, fontError]);

  if (!loadingFinished) return <AppLoading />;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <CoffeeGameProvider>
              <AuthProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <KeyboardProvider>
                    <ScrollVisibilityProvider>
                      <RootLayoutNav />
                    </ScrollVisibilityProvider>
                  </KeyboardProvider>
                </GestureHandlerRootView>
              </AuthProvider>
            </CoffeeGameProvider>
          </StoreProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
