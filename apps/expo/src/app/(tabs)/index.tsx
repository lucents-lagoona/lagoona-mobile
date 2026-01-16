import React from "react";
import { View } from "react-native";

import { AppLogo } from "@/components/app-logo";

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <AppLogo size="xl" />
    </View>
  );
};

export default Home;
