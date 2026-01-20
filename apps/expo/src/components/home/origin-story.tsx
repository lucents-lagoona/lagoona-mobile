import React from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { SectionHeader } from "./section-header";

export function HomeOriginStory() {
  return (
    <View className="py-6">
      <SectionHeader
        title="Câu Chuyện Khởi Nguồn"
        label="Di Sản"
        className="mb-6"
      />

      <View className="mx-4 rounded-2xl border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-md">
        <Text className="text-primary-green-800 text-center text-lg leading-7">
          Thuở hồng hoang, một vị vua đã tìm thấy sự sống nơi vùng đất nguyên sơ
          qua mạch nước ngọt lành. Đó là lời tiên tri về một vận mệnh đủ đầy. Từ
          ý chí của ngài, một hải cảng sầm uất dần thành hình, thổi hồn vào miền
          duyên hải.
          {"\n\n"}
          Nhiều thế kỷ sau, thiên nhiên lại ban tặng một ân huệ khác là dòng
          khoáng nóng chữa lành. Mảnh đất này được định sẵn để trở thành nơi
          giao hoà của thịnh vượng và an yên.
          {"\n\n"}
          Từ sự giao thoa của lịch sử và đất trời, Lagoona ra đời, một trái tim
          trong lòng trái tim, nơi khởi đầu hành trình trở về.
        </Text>
      </View>
    </View>
  );
}
