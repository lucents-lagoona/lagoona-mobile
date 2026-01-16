import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";

import type { Suggestion } from "@/hooks/use-suggestions";
import { Text } from "@/components/ui/text";
import bg from "../../../assets/chat/bg/residential.png";
import { AppLogo } from "../app-logo";
import { SuggestionList } from "./suggestion-list";

interface ChatGreetingProps {
  suggestions: Suggestion[];
  handleSuggestedQuestion: (question: string) => void;
}

export function ChatGreeting({
  suggestions,
  handleSuggestedQuestion,
}: ChatGreetingProps) {
  return (
    <View className="w-full flex-1 items-center justify-start pb-10 pt-24">
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={bg}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />
        <View className="bg-primary-gold-50/90 absolute inset-0" />
      </View>
      <View className="w-full items-center px-4">
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="mb-6"
        >
          <AppLogo size="md" />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="mb-8 w-full items-center"
        >
          <Text
            style={{
              fontFamily: "PlayfairDisplay_600SemiBold",
              lineHeight: 42,
            }}
            className="text-primary-green-800 mb-2 max-w-[90%] text-center text-4xl"
          >
            Quý khách cần thông tin gì về Lagoona? {"\n"} Em sẵn sàng hỗ trợ
          </Text>
        </Animated.View>

        <View className="min-h-[200px] w-full">
          <SuggestionList
            suggestions={suggestions}
            onPress={handleSuggestedQuestion}
            delay={300}
          />
        </View>
      </View>
    </View>
  );
}
