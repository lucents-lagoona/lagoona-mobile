import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

import { Text } from "@/components/ui/text";
import ICON from "../../../assets/icon.png";

export function HomeHeader() {
  return (
    <View className="flex-row items-center justify-between px-6 pb-6 pt-2">
      <View className="flex-row items-center">
        <View className="bg-primary-gold-50 border-primary-gold-100 h-16 w-16 overflow-hidden rounded-full border shadow-sm">
          <Image source={ICON} style={{ width: "100%", height: "100%" }} />
        </View>
        <View className="ml-3">
          <Text className="text-primary-gold-600 text-sm font-medium uppercase tracking-wider">
            Xin chào
          </Text>
          <Text className="text-primary-green-900 font-serif text-xl font-bold">
            Quý Khách
          </Text>
        </View>
      </View>
    </View>
  );
}
