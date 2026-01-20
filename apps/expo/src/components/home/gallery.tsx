import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { ImageViewerModal } from "@/components/image-viewer";
import IMG_01 from "../../../assets/home/gallery/01.jpg";
import IMG_02 from "../../../assets/home/gallery/02.jpg";
import IMG_03 from "../../../assets/home/gallery/03.jpg";
import IMG_04 from "../../../assets/home/gallery/04.jpg";
import IMG_05 from "../../../assets/home/gallery/05.jpg";
import { SectionHeader } from "./section-header";

const images = [IMG_02, IMG_03, IMG_04, IMG_05, IMG_01];

export function HomeGallery() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const viewerImages = images.map((img) => ({ source: img }));

  return (
    <View className="py-6">
      <SectionHeader
        title="Bộ Sưu Tập Cảm Hứng"
        label="Tuyệt Tác Thiên Nhiên"
        description="Chiêm ngưỡng vẻ đẹp bất tận của Lagoona Bình Châu"
        className="mb-6"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
      >
        {images.map((img, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => openGallery(index)}
            className="mr-5 h-60 w-80 overflow-hidden rounded-2xl border border-white/40 bg-gray-100 shadow-lg"
          >
            <Image
              source={img}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ImageViewerModal
        images={viewerImages}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialIndex={currentIndex}
      />
    </View>
  );
}
