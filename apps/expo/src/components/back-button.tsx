import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";

export const BackButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="h-10 w-10 items-center justify-center"
    >
      <ArrowLeftIcon weight="bold" size={20} color="#374151" />
    </TouchableOpacity>
  );
};
