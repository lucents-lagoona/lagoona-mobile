import { useCallback, useState } from "react";
import { fetch as expoFetch } from "expo/fetch";
import { useChat } from "@ai-sdk/react";

import { getBaseUrl } from "@/utils/base-url";

export function useChatManager(
  conversationId: string | null,
  onFinish?: () => void,
) {
  const [isThinking, setIsThinking] = useState(false);

  const {
    messages,
    input,
    setInput,
    handleSubmit,
    setMessages,
    append,
    status,
    stop,
    addToolResult,
    error,
  } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: getBaseUrl() + "/api/chat",
    maxSteps: 25,
    body: {
      conversationId,
    },
    onFinish,
    onError: (err) => {
      console.error("ERROR: ", err);
    },
  });

  const handleSuggestedQuestion = useCallback(
    (q: string) => {
      void append({ role: "user", content: q });
      setIsThinking(true);
    },
    [append],
  );

  const handleRefresh = useCallback(() => {
    setMessages([]);
    void stop();
  }, [setMessages, stop]);

  return {
    messages,
    input,
    setInput,
    setIsThinking,
    handleFormSubmit: handleSubmit,
    handleSuggestedQuestion,
    handleRefresh,
    addToolResult,
    isLoading: isThinking && (status === "submitted" || status === "streaming"),
    error,
    setMessages,
  };
}
