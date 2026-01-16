"use client";

import * as React from "react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import type { IEvent } from "@/calendar/interfaces";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerFilterProps {
  column: Column<IEvent, unknown>; // Pass the column to set filter value
  title?: string; // Optional title for the button
}

export function DatePickerFilter({
  column,
  title = "Pick a date",
}: DatePickerFilterProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    const currentValue = column.getFilterValue();
    if (typeof currentValue === "string") {
      const parsed = parseISO(currentValue);
      if (isValid(parsed)) {
        return parsed;
      }
    }
    return undefined;
  });
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  React.useEffect(() => {
    // When the internal date state changes, update the column filter
    // Store as ISO string or undefined if no date is selected
    column.setFilterValue(date ? date.toISOString() : undefined);
  }, [date, column]);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal", // Changed w-[240px] to w-full
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" /> {/* Added margin */}
          {date ? format(date, "PPP") : <span>{title}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            setPopoverOpen(false); // Close popover on date select
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
