import React, { useEffect, useRef } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "@/components/ui/text";
import { getIcon } from "@/lib/utils";
import HARMONY_VILLA from "../../../assets/home/zones/harmony.jpg";
import LEGACY_VILLA from "../../../assets/home/zones/legacy.jpg";
import ROYALTY_VILLA from "../../../assets/home/zones/royalty.jpg";
import { SectionHeader } from "./section-header";

const zonesData = [
  {
    label: "Legacy",
    color: "gold" as const,
    description: {
      pre: "Lấy cảm hứng từ ",
      highlight: "Chuyện của Di sản Truyền đời",
      post: ", đây là nơi các gia đình đa thế hệ cùng sum vầy.",
    },
    image: LEGACY_VILLA,
    titleComponent: (
      <Text className="text-center font-serif text-3xl text-white">
        Lagoona{" "}
        <Text className="text-primary-gold-400 italic">Residential</Text>
        {"\n"}
        Resort
      </Text>
    ),
    suggestions: [
      { text: "Di sản truyền đời là gì?", icon: "Scroll" },
      { text: "Tầm quan trọng của cộng đồng đa thế hệ?", icon: "UsersThree" },
      {
        text: "Kiến trúc của phân khu Legacy có gì đặc biệt?",
        icon: "Buildings",
      },
      {
        text: "Làm thế nào để gắn kết các thế hệ trong gia đình?",
        icon: "UsersThree",
      },
      {
        text: "Lagoona Residential có những tiện ích nào cho gia đình?",
        icon: "Buildings",
      },
    ],
  },
  {
    label: "Harmony",
    color: "green" as const,
    description: {
      pre: "Nơi ",
      highlight: "thiên nhiên làm chủ nhà",
      post: ", được thiết kế bởi rừng xanh và dòng nước mát lành.",
    },
    image: HARMONY_VILLA,
    titleComponent: (
      <Text className="text-center font-serif text-3xl text-white">
        Lagoona <Text className="text-primary-green-400 italic">Nature</Text>
        {"\n"}
        Resort
      </Text>
    ),
    suggestions: [
      { text: "Triết lý 'thiên nhiên làm chủ nhà' nghĩa là gì?", icon: "Leaf" },
      {
        text: "Lagoona Nature Resort có hoạt động gì nổi bật?",
        icon: "PathIcon",
      },
      {
        text: "Vật liệu xây dựng ở đây có thân thiện môi trường không?",
        icon: "Recycle",
      },
      {
        text: "Tôi có thể tham gia vào các hoạt động bảo tồn thiên nhiên không?",
        icon: "Leaf",
      },
      {
        text: "Trải nghiệm sống chan hòa với thiên nhiên mang lại lợi ích gì?",
        icon: "PathIcon",
      },
    ],
  },
  {
    label: "Royalty",
    color: "red" as const,
    description: {
      pre: "Mang ",
      highlight: "tinh thần hoàng gia Việt",
      post: " vào lối sống hiện đại, dành cho sự tinh tế và xa hoa.",
    },
    image: ROYALTY_VILLA,
    titleComponent: (
      <Text className="text-center font-serif text-3xl text-white">
        Lagoona <Text className="text-primary-red-400 italic">Royale</Text>
        {"\n"}
        Resort & Spa
      </Text>
    ),
    suggestions: [
      {
        text: "Tinh thần hoàng gia Việt được thể hiện như thế nào?",
        icon: "Crown",
      },
      { text: "Trải nghiệm tại spa có gì độc đáo?", icon: "Sparkle" },
      {
        text: "Những dịch vụ xa hoa nhất tại Lagoona Royale là gì?",
        icon: "Diamond",
      },
      {
        text: "Phong cách kiến trúc hoàng gia được tái hiện ra sao?",
        icon: "Crown",
      },
      {
        text: "Có những đặc quyền nào dành riêng cho khách hàng VIP?",
        icon: "Diamond",
      },
    ],
  },
];

const colorClasses = {
  gold: {
    text: "text-primary-gold-600",
    border: "border-primary-gold-200",
    pillBg: "bg-primary-gold-50",
    pillText: "text-primary-gold-700",
    buttonBorder: "border-primary-gold-200",
    buttonBg: "bg-primary-gold-50/50",
    iconColor: "#b79958",
  },
  green: {
    text: "text-primary-green-600",
    border: "border-primary-green-200",
    pillBg: "bg-primary-green-50",
    pillText: "text-primary-green-700",
    buttonBorder: "border-primary-green-200",
    buttonBg: "bg-primary-green-50/50",
    iconColor: "#5c8b63",
  },
  red: {
    text: "text-primary-red-600",
    border: "border-primary-red-200",
    pillBg: "bg-primary-red-50",
    pillText: "text-primary-red-700",
    buttonBorder: "border-primary-red-200",
    buttonBg: "bg-primary-red-50/50",
    iconColor: "#ef4444",
  },
};

function ZoneCard({ zone }: { zone: (typeof zonesData)[0] }) {
  const scrollRef = useRef<ScrollView>(null);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const colors = colorClasses[zone.color] || colorClasses.gold;

  useEffect(() => {
    // Auto-scroll effect : Slowly scroll to the right to hint content
    // Simulating a "marquee" feel by scrolling slowly then resetting or bouncing
    let intervalId: NodeJS.Timeout;

    const startScrolling = () => {
      let currentX = 0;
      const step = 0.5; // slow speed

      intervalId = setInterval(() => {
        if (scrollRef.current) {
          currentX += step;
          // Just a smooth drift
          scrollRef.current.scrollTo({ x: currentX, animated: false });

          // Reset for loop effect if needed, but linear infinite is hard without width.
          // Let's just drift for a while then stop to not be annoying.
          if (currentX > 300) {
            clearInterval(intervalId);
          }
        }
      }, 50);
    };

    // Delay start
    const timeoutId = setTimeout(startScrolling, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View className="mx-4 mb-8 overflow-hidden rounded-2xl bg-white/95 shadow-sm">
      {/* Image Section - Reduced Height */}
      <View className="relative h-52 w-full">
        <Image
          source={zone.image}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        {/* Dark overlay for text contrast on image */}
        <View className="absolute inset-0 bg-black/20" />

        <View className="absolute left-4 top-4">
          <View
            className={`rounded-full border px-3 py-1 backdrop-blur-md ${colors.border} ${colors.pillBg}`}
          >
            <Text
              className={`text-xs font-bold uppercase tracking-wider ${colors.pillText}`}
            >
              {zone.label}
            </Text>
          </View>
        </View>

        {/* Title now overlaying the image for cleaner look and space saving */}
        <View className="absolute bottom-4 left-0 right-0 px-4">
          {zone.titleComponent}
        </View>
      </View>

      {/* Content Section - Compact */}
      <View className="p-5">
        <Text className="mb-5 text-center text-sm leading-6 text-gray-600">
          {zone.description.pre}
          <Text className={`font-bold ${colors.text}`}>
            {zone.description.highlight}
          </Text>
          {zone.description.post}
        </Text>

        {/* Suggestions List with Blur Edges */}
        <View className="relative">
          <Text className="mb-2 ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Khám phá thêm
          </Text>

          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5" // Bleed
            contentContainerStyle={{ paddingRight: 40 }}
          >
            {zone.suggestions.map((suggestion, idx) => {
              const IconComponent = getIcon(suggestion.icon);
              return (
                <TouchableOpacity
                  key={idx}
                  className={`mr-2 flex-row items-center rounded-lg border px-3 py-2 active:bg-gray-50 ${colors.buttonBorder} ${colors.buttonBg}`}
                  onPress={() => null}
                >
                  <IconComponent
                    size={14}
                    color={colors.iconColor}
                    weight="duotone"
                  />
                  <Text className="ml-2 text-xs font-medium text-gray-700">
                    {suggestion.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Gradient Blurs */}
          <LinearGradient
            colors={["rgba(255,255,255,0.9)", "transparent"]}
            className="absolute bottom-0 left-0 top-6 z-10 w-8"
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            pointerEvents="none"
          />
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.9)"]}
            className="absolute bottom-0 right-0 top-6 z-10 w-12"
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            pointerEvents="none"
          />
        </View>
      </View>
    </View>
  );
}

export function HomeZones() {
  return (
    <View>
      <SectionHeader
        title="Các Phân Khu"
        label="Khám Phá"
        description="Trải nghiệm độc bản tại Lagoona Bình Châu"
        className="mb-4"
      />
      {zonesData.map((zone, index) => (
        <ZoneCard key={index} zone={zone} />
      ))}
    </View>
  );
}
