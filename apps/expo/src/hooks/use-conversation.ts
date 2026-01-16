import { useCallback, useEffect, useState } from "react";

import { api } from "@/utils/api";

export function useConversation() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const createConversationMutation = api.conversation.create.useMutation();

  useEffect(() => {
    if (conversationId || createConversationMutation.isPending) {
      return;
    }

    const initializeConversation = async () => {
      try {
        const newConversation = await createConversationMutation.mutateAsync();
        const newConvId = newConversation.id;
        setConversationId(newConvId);
      } catch (error) {
        console.error("Failed to initialize conversation:", error);
      }
    };

    void initializeConversation();
  }, [conversationId, createConversationMutation]);

  const refreshConversation = useCallback(() => {
    setConversationId(null);
  }, []);

  return {
    conversationId,
    refreshConversation,
    isInitializing: createConversationMutation.isPending,
  };
}
