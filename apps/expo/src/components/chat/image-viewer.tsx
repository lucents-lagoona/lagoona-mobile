import React from "react";
import { Modal, SafeAreaView, TouchableOpacity, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { XIcon } from "phosphor-react-native";

import type { GalleryImage } from "./types";

interface ImageViewerProps {
  images: GalleryImage[];
  visible: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ImageViewerModal({
  images,
  visible,
  onClose,
  initialIndex = 0,
}: ImageViewerProps) {
  const imageUrls = images.map((img) => ({
    url: img.url,
    props: {
      // Any specific props for the image component if needed
    },
    // react-native-image-zoom-viewer uses 'url'
    // It also supports 'props' to pass to the Image component
  }));

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <ImageViewer
        imageUrls={imageUrls}
        index={initialIndex}
        onCancel={onClose}
        enableSwipeDown={true}
        onSwipeDown={onClose}
        renderHeader={() => (
          <SafeAreaView className="absolute right-4 top-4 z-50">
            <TouchableOpacity
              onPress={onClose}
              className="rounded-full bg-black/50 p-2"
            >
              <XIcon color="white" size={24} />
            </TouchableOpacity>
          </SafeAreaView>
        )}
        renderIndicator={() => (
          <View className="absolute top-12 z-40 w-full items-center">
            <View className="rounded-full bg-black/50 px-3 py-1">
              <View>
                <View>
                  {/* Using Text from react-native directly to avoid styling issues in Modal */}
                  <View>{/* Just use simple text */}</View>
                </View>
              </View>
            </View>
          </View>
        )}
        // Use simple header instead of custom indicator for now to avoid complexity
      />
      {/* Close button overlay */}
      <SafeAreaView className="absolute right-4 top-10 z-50">
        <TouchableOpacity
          onPress={onClose}
          className="rounded-full bg-black/50 p-2"
        >
          <XIcon color="white" size={24} />
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}
