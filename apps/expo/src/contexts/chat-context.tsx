import type { ReactNode } from "react";
import React, { createContext, useCallback, useContext, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

interface ChatContextType {
  sendQuestionToChat: (question: string) => void;
  isNavigating: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const sendQuestionToChat = useCallback(async (question: string) => {
    try {
      setIsNavigating(true);

      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Navigate to AI tab and pass the question as a parameter
      router.push({
        pathname: "/(tabs)/ai",
        params: { question },
      });

      // Reset loading state after navigation
      setTimeout(() => setIsNavigating(false), 500);
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Error", "Failed to navigate to chat. Please try again.");
      setIsNavigating(false);
    }
  }, []);

  const value = {
    sendQuestionToChat,
    isNavigating,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
