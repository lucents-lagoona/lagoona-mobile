import React from "react";
import { Redirect } from "expo-router";

export default function RootIndex() {
  // const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
  //   null,
  // );

  // useEffect(() => {
  //   void checkOnboardingStatus();
  // }, []);

  // const checkOnboardingStatus = async () => {
  //   try {
  //     const value = await getItem(ASYNC_STORAGE_KEYS.ONBOARDING);
  //     setHasSeenOnboarding(value === "true");
  //   } catch (error) {
  //     console.error("Error checking onboarding status:", error);
  //     setHasSeenOnboarding(false);
  //   }
  // };

  // // Show loading state while checking
  // if (hasSeenOnboarding === null) {
  //   return <View className="flex-1 bg-background" />;
  // }

  // // Redirect based on onboarding status
  // if (hasSeenOnboarding) {
  //   return <Redirect href="/(tabs)" />;
  // } else {
  //   return <Redirect href="/(onboarding)" />;
  // }
  return <Redirect href="/(tabs)" />;
}
