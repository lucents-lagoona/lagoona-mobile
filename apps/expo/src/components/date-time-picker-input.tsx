import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { cn } from "@/lib/utils";

interface DateTimePickerInputProps {
  value?: Date;
  onChange?: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  disabledReason?: string;
}

const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
  value,
  onChange,
  mode = "date",
  label,
  placeholder,
  className,
  disabled = false,
  minimumDate,
  maximumDate,
  disabledReason,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const insets = useSafeAreaInsets();

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      onChange?.(selectedDate);
    }
  };

  const formattedValue = () => {
    if (!value) return placeholder;
    switch (mode) {
      case "date":
        return format(value, "MMM dd, yyyy");
      case "time":
        return format(value, "hh:mm a");
      case "datetime":
        return format(value, "MMM dd, yyyy hh:mm a");
      default:
        return value.toDateString();
    }
  };

  const openPicker = () => {
    if (disabled) return;
    setShowPicker(true);
    if (Platform.OS === "ios") {
      StatusBar.setHidden(true, "fade");
    }
  };

  const closePicker = () => {
    setShowPicker(false);
    if (Platform.OS === "ios") {
      StatusBar.setHidden(false, "slide");
    }
  };

  return (
    <View className={cn("w-full", className)}>
      {label && (
        <Text
          className={cn(
            "mb-2 text-base font-medium",
            disabled ? "text-gray-400" : "text-gray-700",
          )}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={openPicker}
        disabled={disabled}
        className={cn(
          "flex-row items-center justify-between rounded-lg border px-4 py-3",
          disabled ? "border-gray-200 bg-gray-100" : "border-gray-300 bg-white",
        )}
        style={{ opacity: disabled ? 0.6 : 1 }}
      >
        <Text
          className={cn(
            "flex-1 text-base",
            disabled
              ? "text-gray-400"
              : !value
                ? "text-gray-400"
                : "text-gray-900",
          )}
        >
          {formattedValue() ?? placeholder ?? `Select ${mode}`}
        </Text>
        {disabled && (
          <View className="ml-2">
            <Text className="text-xs text-gray-400">🔒</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Disabled state helper text */}
      {disabled && (
        <Text className="mt-1 text-xs text-gray-400">
          {disabledReason ??
            (mode === "time"
              ? "Time selection disabled for past events"
              : "Selection disabled")}
        </Text>
      )}

      {/* Validation info for time constraints */}
      {!disabled && minimumDate && mode === "time" && (
        <Text className="mt-1 text-xs text-gray-500">
          Minimum time: {format(minimumDate, "h:mm a")}
        </Text>
      )}

      {!disabled && maximumDate && mode === "time" && (
        <Text className="mt-1 text-xs text-gray-500">
          Maximum time: {format(maximumDate, "h:mm a")}
        </Text>
      )}

      {/* Modal for picker */}
      <Modal
        isVisible={showPicker}
        onBackdropPress={closePicker}
        onBackButtonPress={closePicker}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          className="overflow-hidden rounded-t-xl bg-white"
          style={{ paddingBottom: insets.bottom }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
            <TouchableOpacity onPress={closePicker}>
              <Text className="text-base text-blue-500">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-800">
              Select {mode}
            </Text>
            <TouchableOpacity onPress={closePicker}>
              <Text className="text-base font-semibold text-blue-500">
                Done
              </Text>
            </TouchableOpacity>
          </View>

          {/* Time constraints info */}
          {(minimumDate ?? maximumDate) && mode === "time" && (
            <View className="bg-blue-50 px-4 py-2">
              {minimumDate && (
                <Text className="text-sm text-blue-700">
                  Minimum time: {format(minimumDate, "h:mm a")}
                </Text>
              )}
              {maximumDate && (
                <Text className="text-sm text-blue-700">
                  Maximum time: {format(maximumDate, "h:mm a")}
                </Text>
              )}
            </View>
          )}

          {/* DateTimePicker */}
          <View className="flex w-full items-center">
            <DateTimePicker
              value={value ?? new Date()}
              mode={mode}
              display={Platform.OS === "ios" ? "spinner" : "spinner"}
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              textColor={Platform.OS === "ios" ? undefined : "#000"}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateTimePickerInput;
