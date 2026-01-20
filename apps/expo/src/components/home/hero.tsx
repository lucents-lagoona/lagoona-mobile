import React from "react";
import { ImageBackground, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import BG_IMAGE from "../../../assets/home/hero/hero-bg.jpg";

export function HomeHero() {
  return (
    <ImageBackground
      source={BG_IMAGE}
      className="h-[600px] w-full justify-center"
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        className="absolute inset-0"
      />
      <View className="items-center px-4">
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="mb-8"
        >
          <AppLogo size="xl" />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="items-center"
        >
          <Text className="text-shadow-md text-center font-serif text-3xl text-white shadow-black/50">
            Ngôi Nhà Nghỉ Dưỡng
          </Text>
          <Text className="text-shadow-md mt-2 text-center font-serif text-3xl font-bold text-white shadow-black/50">
            Di Sản Truyền Đời
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(500).springify()}
          className="mt-10"
        >
          <Button className="border-primary-gold-400 bg-primary-gold-500/80 rounded-none border px-8 py-3 backdrop-blur-md">
            <Text className="font-medium text-white">Tìm hiểu ngay</Text>
          </Button>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}
