import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SparkleIcon } from "phosphor-react-native";

import { Text } from "@/components/ui/text";

export const ThinkingMessage: React.FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="mb-12 w-full">
      <View className="mb-3 flex-row items-center gap-2 opacity-70">
        <SparkleIcon size={16} weight="fill" color="#a08047" />
        <Text className="text-primary-gold-600 text-xs font-bold uppercase tracking-widest">
          Thinking{dots}
        </Text>
      </View>
    </View>
  );
};
