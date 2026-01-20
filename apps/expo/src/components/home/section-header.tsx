import { Text, View } from "react-native";

import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  label,
  description,
  className,
  cta,
}: {
  title: string;
  label?: string;
  description?: string;
  className?: string;
  cta?: React.ReactNode;
}) {
  return (
    <View className={cn("mb-6 px-4", className)}>
      {label && (
        <Text className="text-primary-gold-600 text-center font-serif text-xl font-semibold italic">
          {label}
        </Text>
      )}
      <Text className="text-primary-green-900 text-center font-serif text-2xl font-bold">
        {title}
      </Text>
      {description && (
        <Text className="text-primary-green-700 mt-2 text-center">
          {description}
        </Text>
      )}
      {cta && cta}
    </View>
  );
}
