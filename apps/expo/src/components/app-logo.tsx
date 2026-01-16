import { View } from "react-native";
import { Image } from "expo-image";

import logo from "../../assets/icon.png";

export const AppLogo = ({
  size = "lg",
}: {
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  const sizeMap = {
    sm: 60,
    md: 120,
    lg: 180,
    xl: 240,
  };

  return (
    <View className="items-center justify-center">
      <Image
        source={logo}
        contentFit="contain"
        style={{ width: sizeMap[size], height: sizeMap[size] }}
      />
    </View>
  );
};
