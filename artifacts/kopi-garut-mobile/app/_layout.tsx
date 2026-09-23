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
      {Platform.OS !== 'web' && <BottomMenu />}
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
    flex: 1,
    height: '100vh' as any,
    minHeight: '100vh' as any,
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

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');
    const bodyStyle = body.style as CSSStyleDeclaration & { webkitOverflowScrolling?: string };
    const previous = {
      htmlHeight: html.style.height,
      htmlMinHeight: html.style.minHeight,
      htmlOverflowY: html.style.overflowY,
      bodyHeight: body.style.height,
      bodyMinHeight: body.style.minHeight,
      bodyOverflowX: body.style.overflowX,
      bodyOverflowY: body.style.overflowY,
      bodyWebkitOverflowScrolling: bodyStyle.webkitOverflowScrolling,
      rootHeight: root?.style.height ?? '',
      rootMinHeight: root?.style.minHeight ?? '',
    };

    html.style.height = 'auto';
    html.style.minHeight = '100%';
    html.style.overflowY = 'auto';
    body.style.height = 'auto';
    body.style.minHeight = '100dvh';
    body.style.overflowX = 'clip';
    body.style.overflowY = 'auto';
    bodyStyle.webkitOverflowScrolling = 'touch';
    if (root) {
      root.style.height = '100dvh';
      root.style.minHeight = '100dvh';
    }

    return () => {
      html.style.height = previous.htmlHeight;
      html.style.minHeight = previous.htmlMinHeight;
      html.style.overflowY = previous.htmlOverflowY;
      body.style.height = previous.bodyHeight;
      body.style.minHeight = previous.bodyMinHeight;
      body.style.overflowX = previous.bodyOverflowX;
      body.style.overflowY = previous.bodyOverflowY;
      bodyStyle.webkitOverflowScrolling = previous.bodyWebkitOverflowScrolling ?? '';
      if (root) {
        root.style.height = previous.rootHeight;
        root.style.minHeight = previous.rootMinHeight;
      }
    };
  }, []);

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
