import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { Text } from "@/components/ui/text";
import BEACH from "../../../assets/home/map/beach.jpg";
import FOREST from "../../../assets/home/map/forest.jpg";
import MAP_IMAGE from "../../../assets/home/map/lagoona-map.jpg";
import ZONE_A from "../../../assets/home/map/zone-a.jpg";
import ZONE_B from "../../../assets/home/map/zone-b.jpg";
import ZONE_C from "../../../assets/home/map/zone-c.jpg";
import { SectionHeader } from "./section-header";

const mapData = [
  {
    id: "legacy",
    position: { top: "27%", left: "22%" },
    title: "Lagoona Residential Resort",
    description:
      "Đây là câu chuyện về việc trân trọng và gìn giữ những giá trị văn hóa, gia đình và cộng đồng qua nhiều thế hệ. Nó là nền tảng cho một di sản bền vững cho tương lai.",
    image: ZONE_A,
  },
  {
    id: "harmony",
    position: { top: "45%", left: "43%" },
    title: "Lagoona Nature Resort",
    description:
      "Triết lý này đặt thiên nhiên vào vị trí trung tâm, nơi con người sống hòa hợp và nương tựa vào tự nhiên. Mọi kiến trúc và trải nghiệm đều được truyền cảm hứng từ hệ sinh thái nguyên bản.",
    image: ZONE_B,
  },
  {
    id: "royalty",
    position: { top: "58%", left: "65%" },
    title: "Lagoona Royale Resort & Spa",
    description:
      "Là sự kết hợp tinh hoa giữa nét vương giả, quyền quý của lịch sử Việt Nam và phong cách sống sang trọng, hiện đại. Trải nghiệm này mang đến sự xa hoa và tinh tế bậc nhất.",
    image: ZONE_C,
  },
  {
    id: "mangrove",
    position: { top: "23%", left: "70%" },
    title: "Rừng Đước Di Sản",
    description:
      "Rừng Đước Di Sản là lá phổi xanh của khu vực, một khu bảo tồn thiên nhiên rộng lớn với hệ sinh thái ngập mặn nguyên sinh độc đáo, là nhà của nhiều loài động thực vật quý hiếm.",
    image: FOREST,
  },
  {
    id: "beach",
    position: { top: "52%", left: "80%" },
    title: "Công Viên & Bãi Tắm Bình Châu",
    description:
      "Đây là điểm đến lý tưởng cho các hoạt động ngoài trời và thư giãn bên bờ biển. Với không gian công viên rộng lớn và bãi tắm cát trắng, nơi đây mang đến không gian yên bình cho gia đình và bạn bè.",
    image: BEACH,
  },
];

export function HomeMap() {
  const [selectedPoint, setSelectedPoint] = useState<
    (typeof mapData)[0] | null
  >(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const handlePresentModalPress = useCallback((point: (typeof mapData)[0]) => {
    setSelectedPoint(point);
    bottomSheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <View className="py-6">
      <SectionHeader
        title="Bản Đồ Tổng Thể"
        label="Vị Trí Đắc Địa"
        description="Chạm vào các điểm để khám phá tiện ích"
        className="mb-6"
      />

      <View className="relative mx-4 h-[300px] overflow-hidden rounded-2xl border border-white/40 bg-white/50 shadow-sm">
        <Image
          source={MAP_IMAGE}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        {/* Map Points Overlay */}
        {mapData.map((point) => (
          <Pressable
            key={point.id}
            className="border-primary-gold-500 absolute z-10 -ml-4 -mt-4 h-8 w-8 animate-pulse items-center justify-center rounded-full border-2 bg-white/90 shadow-lg"
            style={{ top: point.position.top, left: point.position.left }}
            onPress={() => handlePresentModalPress(point)}
          >
            <View className="bg-primary-gold-600 h-2 w-2 rounded-full" />
          </Pressable>
        ))}
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#fff" }}
      >
        <BottomSheetView className="flex-1 p-6">
          {selectedPoint && (
            <>
              <View className="mb-4 flex-row items-start justify-between">
                <Text className="text-primary-green-900 flex-1 pr-4 font-serif text-xl font-bold">
                  {selectedPoint.title}
                </Text>
              </View>

              <Image
                source={selectedPoint.image}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                  marginBottom: 16,
                }}
                contentFit="cover"
              />
              <Text className="text-base leading-7 text-gray-600">
                {selectedPoint.description}
              </Text>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
