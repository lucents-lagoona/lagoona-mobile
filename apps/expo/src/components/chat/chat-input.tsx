import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { PaperPlaneRightIcon } from "phosphor-react-native";

import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSubmit,
  disabled = false,
  placeholder = "Quý khách cần được hỗ trợ điều gì?",
}) => {
  const inputRef = React.useRef<TextInput>(null);
  const canSend = value.trim().length > 0 && !disabled;

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const handleSend = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSubmit();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View className="px-4 pb-2 pt-2">
        <View className="flex-row items-center gap-3">
          {/* Input Container */}
          <Pressable onPress={handleContainerPress} className="flex-1">
            <View className="border-primary-gold-200 flex-row items-center overflow-hidden rounded-full border">
              {/* Text Input Container */}
              <TextInput
                ref={inputRef}
                multiline
                numberOfLines={2}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                maxLength={1000}
                className="flex-1 px-4 py-3 text-base"
                style={{
                  fontSize: 16,
                  lineHeight: 20,
                  maxHeight: 100,
                  minHeight: 40,
                }}
              />
            </View>
          </Pressable>

          <View>
            {/* Send Button */}
            <Pressable
              onPress={handleSend}
              disabled={!canSend}
              className={cn(
                "h-14 w-14 items-center justify-center overflow-hidden rounded-full",
                canSend ? "" : "opacity-50",
              )}
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
              })}
            >
              <PaperPlaneRightIcon size={32} color="#a08047" />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
