import React from "react";
import { Pressable, View } from "react-native";
import { ArrowLeftIcon, PlusIcon } from "phosphor-react-native";

import { Text } from "@/components/ui/text";

interface ChatHeaderProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onReset?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  onBack,
  onReset,
}) => {
  const displayTitle = title ?? "Lagoona AI";

  return (
    <View className="relative overflow-hidden px-4 py-4">
      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-1 flex-row items-center gap-4">
          {/* Back Button */}
          <Pressable onPress={onBack}>
            <View className="bg-primary-gold-50 rounded-full p-2.5">
              <ArrowLeftIcon size={18} weight="bold" color="#a08047" />
            </View>
          </Pressable>

          <View className="flex-1">
            <Text
              style={{
                fontFamily: "PlayfairDisplay_700Bold",
              }}
              className="text-primary-gold-900 text-2xl"
              numberOfLines={1}
            >
              {displayTitle}
            </Text>
          </View>
        </View>

        {/* Reset Button */}
        <Pressable
          onPress={onReset}
          disabled={!onReset}
          style={({ pressed }) => ({
            opacity: !onReset ? 0.3 : pressed ? 0.7 : 1,
          })}
        >
          <View className="bg-primary-gold-50 rounded-full p-2.5">
            <PlusIcon size={18} weight="bold" color="#a08047" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};
