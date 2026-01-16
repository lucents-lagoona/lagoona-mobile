"use client";

import * as React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

// OTP Context
interface OTPSlot {
  char: string;
  hasFakeCaret: boolean;
  isActive: boolean;
}

interface OTPContextType {
  slots: OTPSlot[];
  activeSlot: number;
}

const OTPInputContext = React.createContext<OTPContextType>({
  slots: [],
  activeSlot: -1,
});

// Hook to manage OTP state
const useOTP = (maxLength: number) => {
  const [value, setValue] = React.useState("");
  const [activeSlot, setActiveSlot] = React.useState(0);

  const slots = React.useMemo(() => {
    const chars = value.split("");
    return Array.from({ length: maxLength }, (_, index) => ({
      char: chars[index] ?? "",
      hasFakeCaret: index === activeSlot && index === chars.length,
      isActive: index === activeSlot,
    }));
  }, [value, activeSlot, maxLength]);

  const handleChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, "").slice(0, maxLength);
    setValue(cleanText);
    setActiveSlot(Math.min(cleanText.length, maxLength - 1));
  };

  return {
    value,
    setValue,
    activeSlot,
    setActiveSlot,
    slots,
    handleChange,
  };
};

// Components
interface InputOTPProps {
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function InputOTP({
  maxLength,
  value: controlledValue,
  onChange,
  onComplete,
  disabled = false,
  className,
  children,
}: InputOTPProps) {
  const { value, handleChange, slots, activeSlot } = useOTP(maxLength);
  const inputRef = React.useRef<TextInput>(null);

  // Handle controlled vs uncontrolled
  const currentValue = controlledValue ?? value;

  const handleTextChange = React.useCallback(
    (text: string) => {
      const cleanText = text.replace(/[^0-9]/g, "").slice(0, maxLength);

      if (controlledValue !== undefined) {
        onChange?.(cleanText);
      } else {
        handleChange(cleanText);
      }

      if (cleanText.length === maxLength) {
        onComplete?.(cleanText);
      }
    },
    [controlledValue, onChange, onComplete, maxLength, handleChange],
  );

  const contextValue = React.useMemo(
    () => ({
      slots:
        controlledValue !== undefined
          ? Array.from({ length: maxLength }, (_, index) => ({
              char: controlledValue[index] ?? "",
              hasFakeCaret: index === currentValue.length && index < maxLength,
              isActive: index === currentValue.length,
            }))
          : slots,
      activeSlot:
        controlledValue !== undefined ? currentValue.length : activeSlot,
    }),
    [controlledValue, maxLength, currentValue, slots, activeSlot],
  );

  const handleContainerPress = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  return (
    <OTPInputContext.Provider value={contextValue}>
      <View
        className={cn(
          "mx-auto flex flex-row items-center gap-2",
          disabled && "opacity-50",
          className,
        )}
      >
        <TextInput
          ref={inputRef}
          className="absolute h-0 w-0 opacity-0"
          value={currentValue}
          onChangeText={handleTextChange}
          keyboardType="numeric"
          maxLength={maxLength}
          editable={!disabled}
          autoComplete="sms-otp"
          textContentType="oneTimeCode"
        />
        <Pressable
          onPress={handleContainerPress}
          className="flex flex-row items-center gap-2"
        >
          {children}
        </Pressable>
      </View>
    </OTPInputContext.Provider>
  );
}

interface InputOTPGroupProps {
  className?: string;
  children: React.ReactNode;
}

function InputOTPGroup({ className, children }: InputOTPGroupProps) {
  return (
    <View className={cn("flex flex-row items-center gap-2", className)}>
      {children}
    </View>
  );
}

interface InputOTPSlotProps {
  index: number;
  className?: string;
}

function InputOTPSlot({ index, className }: InputOTPSlotProps) {
  const { slots } = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = slots[index] ?? {};

  return (
    <View
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-background",
        isActive && "border-2 border-primary",
        className,
      )}
    >
      <Text className="text-sm font-medium text-foreground">{char}</Text>
      {hasFakeCaret && (
        <View className="absolute inset-0 flex items-center justify-center">
          <View className="h-4 w-px bg-foreground" />
        </View>
      )}
    </View>
  );
}

interface InputOTPSeparatorProps {
  className?: string;
}

function InputOTPSeparator({ className }: InputOTPSeparatorProps) {
  return (
    <View className={cn("flex items-center justify-center", className)}>
      <View className="h-px w-3 bg-border" />
    </View>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
