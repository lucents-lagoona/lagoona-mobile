import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { ArrowUpIcon } from "phosphor-react-native";

interface FloatingScrollTopProps {
  onPress: () => void;
  show: boolean;
}

export function FloatingScrollTop({ onPress, show }: FloatingScrollTopProps) {
  if (!show) return null;

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      className="absolute bottom-6 right-6 z-50"
    >
      <TouchableOpacity
        onPress={onPress}
        className="bg-primary-gold-500 shadow-primary-gold-900/20 h-12 w-12 items-center justify-center rounded-full shadow-lg"
      >
        <ArrowUpIcon color="white" size={24} weight="bold" />
      </TouchableOpacity>
    </Animated.View>
  );
}
