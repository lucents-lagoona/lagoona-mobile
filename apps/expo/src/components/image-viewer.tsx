import type { ImageSourcePropType } from "react-native";
import React from "react";
import { Modal, SafeAreaView, TouchableOpacity, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { XIcon } from "phosphor-react-native";

export interface GalleryImage {
  url: string;
  description: string;
}

export interface ViewerImage {
  url?: string;
  source?: ImageSourcePropType;
}

interface ImageViewerProps {
  images: (GalleryImage | ViewerImage)[];
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
  const imageUrls = images.map((img) => {
    if ("source" in img && img.source) {
      return {
        url: "",
        props: {
          source: img.source,
        },
      };
    }
    return {
      url: (img as GalleryImage).url || "",
      props: {},
    };
  });

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
        renderIndicator={() => <View />}
      />
    </Modal>
  );
}
