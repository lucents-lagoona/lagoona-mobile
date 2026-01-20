import React from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import type { Suggestion } from "@/hooks/use-suggestions";
import { Text } from "@/components/ui/text";
import { getIcon } from "@/lib/utils";

interface SuggestionListProps {
  suggestions?: Suggestion[];
  onPress: (text: string) => void;
  className?: string;
  delay?: number;
}

export function SuggestionList({
  suggestions,
  onPress,
  className,
  delay = 300,
}: SuggestionListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!suggestions || suggestions?.length === 0) return null;

  return (
    <View className={`w-full flex-col gap-2 ${className}`}>
      {suggestions.map((item, index) => {
        const IconComponent = getIcon(item.icon);

        return (
          <Animated.View
            key={`${item.id}-${index}`}
            entering={FadeInDown.delay(delay + index * 100).springify()}
          >
            <Pressable
              onPress={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onPress(item.text);
              }}
              className="border-primary-gold-200 w-full flex-row justify-between gap-2 overflow-hidden truncate rounded-full border bg-white p-3"
            >
              <View>
                <IconComponent size={22} weight="duotone" color="#3b5a40" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-primary-green-700 text-base font-medium leading-6"
                  numberOfLines={1}
                >
                  {item.display_text ?? item.text}
                </Text>
              </View>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}
