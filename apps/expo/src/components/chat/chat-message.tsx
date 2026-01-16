import type { UIMessage } from "ai";
import React, { useMemo } from "react";
import { View } from "react-native";

import type { GalleryImage } from "@/components/chat/types";
import { ImageGallery } from "@/components/chat/image-gallery";
import { MarkdownRenderer } from "@/components/chat/markdown-renderer";
import { Text } from "@/components/ui/text";

interface ChatMessageProps {
  message: UIMessage;
  isLast?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isLast,
}) => {
  const isUser = message.role === "user";

  const images = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (isUser || !message.parts) return [];

    const extractedImages: GalleryImage[] = [];

    message.parts.forEach((part) => {
      if (
        part.type === "tool-invocation" &&
        part.toolInvocation.toolName === "imageSearchTool" &&
        "result" in part.toolInvocation
      ) {
        try {
          const result: unknown = part.toolInvocation.result;
          // Result can be stringified JSON or object
          let parsedResult: unknown = result;

          if (typeof result === "string") {
            try {
              parsedResult = JSON.parse(result);
            } catch {
              // result is just a string, ignore
              return;
            }
          }

          const toolResultImages = Array.isArray(parsedResult)
            ? parsedResult
            : parsedResult &&
                typeof parsedResult === "object" &&
                "images" in parsedResult
              ? (parsedResult as { images: unknown }).images
              : [];

          if (Array.isArray(toolResultImages)) {
            toolResultImages.forEach((img: unknown) => {
              if (
                img &&
                typeof img === "object" &&
                "url" in img &&
                typeof img.url === "string"
              ) {
                extractedImages.push({
                  url: img.url,
                  description:
                    "description" in img && typeof img.description === "string"
                      ? img.description
                      : "",
                });
              }
            });
          }
        } catch (e) {
          console.error("Error parsing image tool result:", e);
        }
      }
    });

    return extractedImages;
  }, [message.parts, isUser]);

  const renderMessageContent = () => {
    if (message.parts.length > 0) {
      return message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return (
              <MarkdownRenderer
                key={`${message.id}-${i}`}
                content={part.text}
              />
            );
        }
      });
    }
    return null;
  };

  if (isUser) {
    return (
      <View className="mb-6 mt-6 w-full flex-row justify-end">
        <View className="rounded-b-2xl rounded-tl-2xl border border-[#D9D4CA] bg-[#F1E5C7] px-3 py-2">
          {message.parts.map((part, i) => {
            if (part.type === "text") {
              return (
                <Text
                  key={`${message.id}-${i}`}
                  className="text-lg leading-tight"
                >
                  {part.text}
                </Text>
              );
            }
            return null;
          })}
        </View>
      </View>
    );
  }

  return (
    <View className={`w-full ${isLast ? "mb-8" : ""}`}>
      <View className="min-h-[50px] rounded-b-2xl rounded-tr-2xl border border-[#D9D4CA] bg-white px-3 pb-3">
        {renderMessageContent()}
        {images.length > 0 && <ImageGallery images={images} />}
      </View>
    </View>
  );
};
