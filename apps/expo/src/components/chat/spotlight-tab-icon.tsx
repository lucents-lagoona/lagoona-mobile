import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SparkleIcon } from "phosphor-react-native";

interface SpotlightTabIconProps {
  focused: boolean;
}

export const SpotlightTabIcon: React.FC<SpotlightTabIconProps> = ({
  focused,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    if (focused) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1500 }),
          withTiming(1, { duration: 1500 }),
        ),
        -1,
        true,
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.1, { duration: 1500 }),
          withTiming(0.3, { duration: 1500 }),
        ),
        -1,
        true,
      );
    } else {
      scale.value = withTiming(1);
      opacity.value = withTiming(0);
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View
      className="absolute -top-4 h-16 w-16 items-center justify-center rounded-full shadow-lg"
      style={{
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      {focused && (
        <Animated.View
          className="absolute inset-0 rounded-full"
          style={[animatedStyle]}
        />
      )}
      <SparkleIcon size={28} weight="fill" />
    </View>
  );
};
