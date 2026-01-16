import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { ChatGreeting } from "@/components/chat/chat-greeting";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessage } from "@/components/chat/chat-message";
import { DisclaimerDialog } from "@/components/chat/disclaimer-dialog";
import { SuggestionList } from "@/components/chat/suggestion-list";
import { ThinkingMessage } from "@/components/chat/thinking-message";
import { Text } from "@/components/ui/text";
import { useChatManager } from "@/hooks/use-chat-manager";
import { useConversation } from "@/hooks/use-conversation";
import { useDisclaimer } from "@/hooks/use-disclaimer";
import { useSuggestions } from "@/hooks/use-suggestions";

export default function ChatScreen() {
  const { question } = useLocalSearchParams<{ question?: string }>();
  const scrollViewRef = React.useRef<ScrollView>(null);
  const isUserScrolling = React.useRef(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [_, setScrollViewHeight] = React.useState(0);
  const [isDisclaimerReady, setIsDisclaimerReady] = React.useState(false);

  const { conversationId, refreshConversation } = useConversation();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { showDisclaimer, handleDisclaimerClose, isDisclaimerConfirmed } =
    useDisclaimer(conversationId, { enabled: isDisclaimerReady });

  const {
    suggestions,
    followUpSuggestions,
    refetchFollowUpSuggestions,
    refetchSuggestions,
  } = useSuggestions();

  // Delay showing disclaimer to allow animations to finish
  useEffect(() => {
    if (suggestions.length > 0) {
      const timer = setTimeout(() => {
        setIsDisclaimerReady(true);
      }, 800); // Wait for entrance animations (approx 4 items * 100ms + 300ms base + buffer)
      return () => clearTimeout(timer);
    }
    setIsDisclaimerReady(false);
  }, [suggestions]);

  const {
    messages,
    input,
    setInput,
    setIsThinking,
    handleFormSubmit,
    handleSuggestedQuestion,
    isLoading,
    setMessages,
  } = useChatManager(conversationId, () => {
    void refetchFollowUpSuggestions();
  });

  // Handle incoming question from event
  useEffect(() => {
    if (question?.trim()) {
      void handleSuggestedQuestion(question);
      setIsThinking(true);
    }
  }, [question, handleSuggestedQuestion, setIsThinking]);

  // Smart Auto-scroll
  useEffect(() => {
    if (!isUserScrolling.current && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isLoading, contentHeight]);

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setIsDisclaimerReady(false); // Reset ready state
    refreshConversation();
    void refetchSuggestions();
    void refetchFollowUpSuggestions();
  };

  const showFollowUpSuggestions =
    !isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role === "assistant" &&
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    followUpSuggestions?.length > 0;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const canInteract = isDisclaimerConfirmed && !isLoading;

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView
        className="flex-1"
        edges={["left", "right", "top", "bottom"]}
      >
        {/* Chat Header */}
        <ChatHeader
          showBackButton
          onBack={() => router.back()}
          onReset={messages.length > 0 ? handleReset : undefined}
        />

        {/* Messages Container */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => (isUserScrolling.current = true)}
          onScrollEndDrag={() => (isUserScrolling.current = false)}
          onMomentumScrollEnd={() => (isUserScrolling.current = false)}
          onContentSizeChange={(_, height) => setContentHeight(height)}
          onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
        >
          {messages.length === 0 ? (
            <ChatGreeting
              suggestions={suggestions}
              handleSuggestedQuestion={
                canInteract ? handleSuggestedQuestion : () => null
              }
            />
          ) : (
            <View className="flex-1 px-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                />
              ))}
              {isLoading && <ThinkingMessage />}
            </View>
          )}
        </ScrollView>

        {/* Pinned Follow-up Suggestions */}
        {showFollowUpSuggestions && (
          <View className="px-4 pb-2">
            <Text className="my-2 px-1 text-sm font-medium text-gray-500">
              Suggested for you
            </Text>
            <SuggestionList
              suggestions={followUpSuggestions}
              onPress={canInteract ? handleSuggestedQuestion : () => null}
              delay={0}
            />
          </View>
        )}

        {/* Chat Input */}
        <ChatInput
          value={input}
          onChangeText={setInput}
          onSubmit={handleFormSubmit}
          disabled={!canInteract}
          placeholder="Quý khách cần được hỗ trợ điều gì?"
        />

        {/* Disclaimer Dialog */}
        {conversationId && (
          <DisclaimerDialog
            isOpen={showDisclaimer}
            onClose={handleDisclaimerClose}
            conversationId={conversationId}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
