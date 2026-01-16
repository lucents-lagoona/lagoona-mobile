import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";

export const SafeAreaView = cssInterop(RNSafeAreaView, {
  className: "style",
});
