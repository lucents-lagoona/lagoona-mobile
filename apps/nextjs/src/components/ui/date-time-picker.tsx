"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value: string | undefined;
  onChange?: (value: string | undefined) => void;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  placeholder?: string | null;
  showTime?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  className,
  disabled,
  readOnly,
  id,
  placeholder,
  showTime = true,
}: DateTimePickerProps) {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }

    const currentTime = value ? parseISO(value) : new Date();
    date.setHours(currentTime.getHours());
    date.setMinutes(currentTime.getMinutes());
    onChange?.(date.toISOString());
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    if (!value) return;

    const currentDate = parseISO(value);
    const [hours, minutes] = newTime.split(":").map(Number);

    if (hours === undefined || minutes === undefined) return;

    currentDate.setHours(hours, minutes);
    onChange?.(currentDate.toISOString());
  };

  return (
    <Popover>
      <PopoverTrigger
        asChild
        onClickCapture={(e) => {
          if (readOnly) {
            e.stopPropagation();
          }
        }}
      >
        <Button
          id={id}
          disabled={disabled}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            disabled || !value ? "text-muted-foreground" : "",
            className,
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? (
            format(parseISO(value), showTime ? "PPPp" : "PPP")
          ) : (
            <span>{placeholder ?? "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? parseISO(value) : undefined}
          onSelect={handleDateSelect}
          initialFocus
        />
        {showTime && (
          <div className="border-t p-2">
            <Input
              type="time"
              value={value ? format(parseISO(value), "HH:mm") : ""}
              onChange={handleTimeChange}
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
