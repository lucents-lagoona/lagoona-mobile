import type { TextInputProps } from "react-native";
import * as React from "react";
import { TextInput, View } from "react-native";

import { cn } from "@/lib/utils";
import { Text } from "./text";

const Input = React.forwardRef<
  TextInput,
  TextInputProps & { error?: string; ref?: React.Ref<TextInput> }
>(({ className, placeholderClassName, error, ...props }, ref) => {
  return (
    <View className="w-full">
      <TextInput
        ref={ref}
        className={cn(
          "web:flex native:h-12 web:w-full web:py-2 native:text-lg native:leading-[1.25] web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 h-10 rounded-lg border border-input bg-background px-3 text-base text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground lg:text-sm",
          props.editable === false && "web:cursor-not-allowed opacity-50",
          error && "border-red-500",
          className
        )}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        {...props}
      />
      {error ? <Text className="mt-1 text-sm text-red-500">{error}</Text> : null}
    </View>
  );
});
Input.displayName = "Input";

export { Input };
