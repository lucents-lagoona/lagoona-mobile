import React from "react";
import { ImageBackground, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import HERO_BG from "../../../assets/chat/bg/residential.png";
import { Button } from "../ui/button";

export function HomeOverview() {
  const router = useRouter();

  return (
    <View className="px-4 py-4">
      <View className="overflow-hidden rounded-2xl border border-white/20 shadow-lg">
        <ImageBackground
          source={HERO_BG}
          className="h-[220px] justify-between p-6"
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
            className="absolute inset-0"
          />

          <View>
            <Text
              className="mb-2 font-serif text-2xl font-bold text-white shadow-sm"
              style={{
                textShadowColor: "rgba(0,0,0,0.8)",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
              }}
            >
              Chào mừng đến với{"\n"}Lagoona Bình Châu
            </Text>
            <Text
              className="pr-10 text-sm font-medium leading-5 text-white/95 shadow-sm"
              style={{
                textShadowColor: "rgba(0,0,0,0.8)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 3,
              }}
            >
              Một kiệt tác nghỉ dưỡng giữa thiên nhiên nguyên bản. Khám phá sự
              giao hòa giữa biển, rừng và tiện ích đẳng cấp.
            </Text>
          </View>

          <Button
            className="mt-4 flex-row items-center justify-center rounded-xl px-6 py-3 shadow-sm backdrop-blur-md"
            onPress={() => router.push("/(tabs)/ai")}
          >
            <Text className="ml-2 text-base font-bold text-white">
              Trò chuyện với Lagoona AI
            </Text>
          </Button>
        </ImageBackground>
      </View>
    </View>
  );
}
