import * as React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Toaster } from "sonner-native";

import { AppLogo } from "@/components/app-logo";
import { PortalHost } from "@/components/primitives/portal";

import "@/global.css";
import "@/polyfills";

import { useFonts } from "expo-font";
import {
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";

import { TRPCProvider } from "@/utils/api";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Inner component that has access to stores
function AppContent() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  const isAppReady = fontsLoaded || fontError;

  React.useEffect(() => {
    if (isAppReady) {
      // Hide the splash screen after everything is loaded
      void SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <AppLogo size="xl" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="bg-background" style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modal)"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
      <Toaster />
      <PortalHost />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <TRPCProvider>
      <AppContent />
    </TRPCProvider>
  );
}
