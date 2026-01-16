import React from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowRightIcon } from "phosphor-react-native";

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
    <View
      className={`w-full flex-row flex-wrap justify-center gap-3 ${className}`}
    >
      {suggestions.map((item, index) => {
        const IconComponent = getIcon(item.icon);

        return (
          <Animated.View
            key={`${item.id}-${index}`}
            entering={FadeInDown.delay(delay + index * 100).springify()}
            className="w-[48%]"
          >
            <View className="border-primary-gold-200 w-full overflow-hidden rounded-2xl border bg-white">
              <Pressable
                onPress={() => onPress(item.text)}
                className="h-36 justify-between p-5"
              >
                <View className="flex-row items-start justify-between">
                  <IconComponent size={22} weight="duotone" color="#3b5a40" />
                  <ArrowRightIcon size={22} weight="bold" color="#3b5a40" />
                </View>

                <View className="mt-1">
                  <Text
                    className="text-primary-green-700 text-base font-medium leading-6"
                    numberOfLines={3}
                  >
                    {item.display_text ?? item.text}
                  </Text>
                </View>
              </Pressable>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
}
