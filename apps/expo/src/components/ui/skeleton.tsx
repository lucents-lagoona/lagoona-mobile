import type { ViewProps } from "react-native";
import { View } from "react-native";

export const Skeleton = ({
  className,
  ...props
}: ViewProps & { className?: string }) => (
  <View className={`rounded bg-gray-200 ${className}`} {...props} />
);
