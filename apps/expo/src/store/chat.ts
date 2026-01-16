import { Alert } from "react-native";
import { router } from "expo-router";
import { create } from "zustand";

interface ChatState {
  isNavigating: boolean;

  // Actions
  sendQuestionToChat: (question: string) => Promise<void>;
  setNavigating: (navigating: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isNavigating: false,

  sendQuestionToChat: async (question: string) => {
    try {
      set({ isNavigating: true });

      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Navigate to AI tab and pass the question as a parameter
      router.push({
        pathname: "/(tabs)/ai",
        params: { question },
      });

      // Reset loading state after navigation
      setTimeout(() => set({ isNavigating: false }), 500);
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Error", "Failed to navigate to chat. Please try again.");
      set({ isNavigating: false });
    }
  },

  setNavigating: (isNavigating) => set({ isNavigating }),
}));
