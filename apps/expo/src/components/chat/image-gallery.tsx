import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";

import type { GalleryImage } from "./types";
import { ImageViewerModal } from "./image-viewer";

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!images || images.length === 0) return null;

  const handleImagePress = (index: number) => {
    setSelectedIndex(index);
    setViewerVisible(true);
  };

  const renderSingleImage = () => (
    <Pressable
      onPress={() => handleImagePress(0)}
      className="overflow-hidden rounded-xl"
    >
      <Image
        source={{ uri: images[0]?.url }}
        style={{ aspectRatio: 4 / 3, width: "100%" }}
        contentFit="cover"
        transition={200}
      />
    </Pressable>
  );

  const renderGrid = () => {
    const displayImages = images.slice(0, 4);
    const remainingCount = images.length - 4;

    return (
      <View className="flex-row flex-wrap gap-2">
        {displayImages.map((img, index) => {
          const isLast = index === 3;
          const showOverlay = isLast && remainingCount > 0;

          return (
            <Pressable
              key={index}
              onPress={() => handleImagePress(index)}
              className="relative w-[48%] overflow-hidden rounded-lg"
              style={{ aspectRatio: 4 / 3 }}
            >
              <Image
                source={{ uri: img.url }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                transition={200}
              />
              {showOverlay && (
                <View className="absolute inset-0 items-center justify-center bg-black/50">
                  <Text className="text-lg font-bold text-white">
                    +{remainingCount + 1}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <View className="mt-3 w-full">
      {images.length === 1 ? renderSingleImage() : renderGrid()}

      <ImageViewerModal
        images={images}
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        initialIndex={selectedIndex}
      />
    </View>
  );
}
