import { View } from "react-native";
import { SparkleIcon } from "phosphor-react-native";

import { Text } from "@/components/ui/text";

export const AppHeader = () => {
  return (
    <View
      className="flex-row items-center justify-center gap-3"
      style={{
        height: 40,
      }}
    >
      <View className="h-[40px] w-[40px] items-center justify-center rounded-full">
        <SparkleIcon size={24} weight="fill" />
      </View>
      <Text
        style={{
          fontFamily: "PlayfairDisplay_700Bold",
        }}
        className="text-2xl"
      >
        Lagoona
      </Text>
    </View>
  );
};
