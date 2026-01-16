import { Tabs } from "expo-router";
import { SparkleIcon } from "phosphor-react-native";

import { APP_ROUTES } from "@/constants/app.const";
import { HomeIcon } from "@/lib/icons/home-icon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#f8f6ee" },
        tabBarActiveTintColor: "#a08047",
      }}
    >
      <Tabs.Screen
        name={APP_ROUTES.index.value}
        options={{
          title: APP_ROUTES.index.title,
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              color={color}
              weight={focused ? "fill" : "regular"}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={APP_ROUTES.ai.value}
        options={{
          title: "Lagoona AI",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <SparkleIcon
              color={color}
              weight={focused ? "fill" : "regular"}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
