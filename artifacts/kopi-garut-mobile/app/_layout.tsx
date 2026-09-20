import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
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

  useEffect(() => {
    if (!ready || pathname === '/login') return;
    if (!canAccessRoute(pathname, session?.id)) {
      router.replace('/login');
    }
  }, [pathname, ready, router, session?.id]);

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, headerBackTitle: 'Kembali' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <BottomMenu />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  const [loadingFinished, setLoadingFinished] = React.useState(false);

  useEffect(() => {
    if (!fontsLoaded && !fontError) return;
    void SplashScreen.hideAsync();
    const timeout = setTimeout(() => setLoadingFinished(true), 900);
    return () => clearTimeout(timeout);
  }, [fontsLoaded, fontError]);

  if ((!fontsLoaded && !fontError) || !loadingFinished) return <AppLoading />;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <AuthProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <KeyboardProvider>
                  <RootLayoutNav />
                </KeyboardProvider>
              </GestureHandlerRootView>
            </AuthProvider>
          </StoreProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
