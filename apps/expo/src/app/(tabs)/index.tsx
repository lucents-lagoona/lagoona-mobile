import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useRef, useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FloatingScrollTop } from "@/components/home/floating-scroll-top";
import { HomeGallery } from "@/components/home/gallery";
import { HomeHeader } from "@/components/home/home-header";
import { HomeOverview } from "@/components/home/overview";
import { HomeZones } from "@/components/home/zones";
import PATTERN from "../../../assets/pattern-01.png";

const Home = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 200);
  };

  return (
    <View className="flex-1">
      <ImageBackground source={PATTERN} className="flex-1" resizeMode="repeat">
        {/* Overlay to wash out the pattern for readability */}
        <View className="bg-primary-green-50/80 absolute inset-0" />

        <SafeAreaView className="flex-1" edges={["top"]}>
          <ScrollView
            ref={scrollRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* <HomeHero />

          <View className="space-y-12 pb-10 pt-6">
            <HomeOriginStory />
            <HomeMap />
            <HomeZones />
            <HomeWriteStory />
          </View> */}
            <HomeHeader />
            <HomeOverview />
            <HomeZones />

            <HomeGallery />
          </ScrollView>

          <FloatingScrollTop
            onPress={() => scrollRef.current?.scrollTo({ y: 0 })}
            show={showScrollTop}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Home;
