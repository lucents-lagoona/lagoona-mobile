import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRightIcon } from "phosphor-react-native";

import { Text } from "@/components/ui/text";
import HARMONY_VILLA from "../../../assets/home/zones/harmony.jpg";
import LEGACY_VILLA from "../../../assets/home/zones/legacy.jpg";
import ROYALTY_VILLA from "../../../assets/home/zones/royalty.jpg";
import { SectionHeader } from "./section-header";

// Placeholder images since specific render assets might not be available
// I will reuse zone images or others found in assets to make it work visually for now
// In a real scenario, we'd copy the specific render images.
// I'll try to use existing ones to avoid broken images.
const residences = [
  {
    zone: "Legacy",
    name: "Shop Villa",
    description: "Kết hợp giữa không gian sống và mặt bằng kinh doanh.",
    image: LEGACY_VILLA,
  },
  {
    zone: "Harmony",
    name: "Biệt thự mặt hồ",
    description: "Sở hữu tầm nhìn hồ trực diện, kết nối qua hệ thống kênh.",
    image: HARMONY_VILLA,
  },
  {
    zone: "Royalty",
    name: "Dinh thự biển",
    description: "Sở hữu bãi tắm riêng, mang đến sự biệt lập.",
    image: ROYALTY_VILLA,
  },
];

export function HomeWriteStory() {
  return (
    <View className="py-6">
      <View className="relative z-10 w-full">
        <SectionHeader
          className="mb-10 text-center"
          title="Kiến Tạo Di Sản"
          label="Cơ Hội"
          description="Viết Tiếp Câu Chuyện Của Bạn"
          cta={
            <View className="mt-4 flex-row justify-center">
              <TouchableOpacity className="border-primary-green-600 flex-row items-center rounded-lg border bg-white/50 px-6 py-2 backdrop-blur-sm">
                <Text className="text-primary-green-900 mr-2 font-medium">
                  Khám Phá Cơ Hội
                </Text>
                <ArrowRightIcon size={16} color="#166534" />
              </TouchableOpacity>
            </View>
          }
        />

        {/* Horizontal Scroll for Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        >
          {residences.map((item, index) => (
            <View
              key={index}
              className="relative mr-6 h-[360px] w-[280px] overflow-hidden rounded-xl border border-white/40 bg-white shadow-lg"
            >
              <Image
                source={item.image}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                className="absolute inset-0"
              />

              <View className="absolute bottom-0 left-0 right-0 p-4">
                <View className="border-primary-gold-200/50 mb-2 self-start border bg-black/30 px-2 py-1 backdrop-blur-sm">
                  <Text className="text-primary-gold-100 text-[10px] uppercase tracking-widest">
                    {item.zone}
                  </Text>
                </View>
                <Text className="font-serif text-lg font-semibold text-white">
                  {item.name}
                </Text>
                <Text className="mt-1 text-xs leading-5 text-white/90">
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
