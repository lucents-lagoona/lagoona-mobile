import type { NumericFormatProps } from "react-number-format";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NumericFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
  showActionButtons?: boolean;
  className?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      stepper,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 2,
      suffix,
      prefix,
      value: controlledValue,
      showActionButtons = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<number | undefined>(
      controlledValue ?? defaultValue,
    );

    const handleIncrement = useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? (stepper ?? 1)
          : Math.min(prev + (stepper ?? 1), max),
      );
    }, [stepper, max]);

    const handleDecrement = useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? -(stepper ?? 1)
          : Math.max(prev - (stepper ?? 1), min),
      );
    }, [stepper, min]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const inputRef = ref as React.RefObject<HTMLInputElement>;
        if (document.activeElement === inputRef?.current) {
          if (e.key === "ArrowUp") {
            handleIncrement();
          } else if (e.key === "ArrowDown") {
            handleDecrement();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, ref]);

    useEffect(() => {
      if (controlledValue !== undefined) {
        const valueToUse = Number(controlledValue);
        // Handle NaN case
        if (isNaN(valueToUse)) {
          setValue(undefined);
        } else {
          setValue(valueToUse);
        }
      }
    }, [controlledValue]);

    const handleChange = (values: {
      value: string;
      floatValue: number | undefined;
    }) => {
      // Always maintain as number or undefined
      let newValue = values.floatValue ?? undefined;

      // If we need fixed decimal places, ensure they're preserved
      if (fixedDecimalScale && newValue !== undefined) {
        // Format the number with fixed decimal places as a string (e.g., "12.50")
        const formattedValueString = newValue.toFixed(decimalScale);
        // Then parse it back to a number - this is important to maintain the type as number
        newValue = Number(formattedValueString);
      }

      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        const inputRef = ref as React.RefObject<HTMLInputElement>;
        if (value < min) {
          setValue(min);
          if (inputRef?.current) {
            inputRef.current.value = String(min);
          }
        } else if (value > max) {
          setValue(max);
          if (inputRef?.current) {
            inputRef.current.value = String(max);
          }
        }
      }
    };

    return (
      <div className="flex items-center">
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className={cn(
            "relative [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            showActionButtons && "rounded-r-none",
            className,
          )}
          getInputRef={ref}
          {...props}
        />

        {showActionButtons && (
          <div className="flex flex-col">
            <Button
              aria-label="Increase value"
              type="button"
              className="h-4.5 rounded-l-none rounded-br-none border-b-[0.5px] border-l-0 border-input px-2 focus-visible:relative"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                handleIncrement();
              }}
              disabled={value === max || props.disabled}
            >
              <ChevronUp size={15} />
            </Button>
            <Button
              aria-label="Decrease value"
              type="button"
              className="h-4.5 rounded-l-none rounded-tr-none border-l-0 border-t-[0.5px] border-input px-2 focus-visible:relative"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                handleDecrement();
              }}
              disabled={value === min || props.disabled}
            >
              <ChevronDown size={15} />
            </Button>
          </div>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
