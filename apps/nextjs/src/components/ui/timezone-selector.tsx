"use client";

import { useState } from "react";
import { Check, Globe, MapPin } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getTimezoneOffset, getUserTimezone } from "@/lib/timezone";
import { cn } from "@/lib/utils";

interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
  states?: string[];
}

const TIMEZONE_OPTIONS: TimezoneOption[] = [
  {
    value: "America/New_York",
    label: "Eastern Time (ET)",
    offset: "",
    states: [
      "NY",
      "FL",
      "GA",
      "NC",
      "SC",
      "VA",
      "DC",
      "MD",
      "PA",
      "NJ",
      "CT",
      "MA",
      "VT",
      "NH",
      "ME",
      "RI",
      "OH",
      "MI",
      "KY",
      "TN",
      "WV",
    ],
  },
  {
    value: "America/Chicago",
    label: "Central Time (CT)",
    offset: "",
    states: [
      "TX",
      "IL",
      "WI",
      "MN",
      "IA",
      "MO",
      "AR",
      "LA",
      "MS",
      "AL",
      "OK",
      "KS",
      "NE",
      "SD",
      "ND",
    ],
  },
  {
    value: "America/Denver",
    label: "Mountain Time (MT)",
    offset: "",
    states: ["CO", "WY", "MT", "UT", "NM"],
  },
  {
    value: "America/Phoenix",
    label: "Mountain Standard Time (MST)",
    offset: "",
    states: ["AZ"],
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time (PT)",
    offset: "",
    states: ["CA", "WA", "OR", "NV"],
  },
  {
    value: "America/Anchorage",
    label: "Alaska Time (AKT)",
    offset: "",
    states: ["AK"],
  },
  {
    value: "Pacific/Honolulu",
    label: "Hawaii Time (HT)",
    offset: "",
    states: ["HI"],
  },
];

interface TimezoneSelectorProps {
  value?: string;
  onValueChange: (timezone: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showAutoDetect?: boolean;
  showOffset?: boolean;
}

export function TimezoneSelector({
  value,
  onValueChange,
  placeholder = "Select timezone...",
  disabled = false,
  className,
  showAutoDetect = true,
  showOffset = true,
}: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false);

  // Calculate offsets for each timezone
  const optionsWithOffsets = TIMEZONE_OPTIONS.map((option) => ({
    ...option,
    offset: showOffset ? getTimezoneOffset(option.value) : "",
  }));

  const selectedOption = optionsWithOffsets.find(
    (option) => option.value === value,
  );

  const handleAutoDetect = () => {
    const detected = getUserTimezone();
    // Find the closest match from our predefined options
    const match =
      optionsWithOffsets.find((option) => option.value === detected) ||
      optionsWithOffsets[0]; // Default to Eastern Time
    onValueChange(match.value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-beige-600" />
            {selectedOption ? (
              <div className="flex items-center gap-2">
                <span>{selectedOption.label}</span>
                {showOffset && selectedOption.offset && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedOption.offset}
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search timezones..." />
          <CommandEmpty>No timezone found.</CommandEmpty>

          {showAutoDetect && (
            <CommandGroup>
              <CommandItem
                onSelect={handleAutoDetect}
                className="cursor-pointer"
              >
                <MapPin className="mr-2 size-4" />
                <div className="flex-1">
                  <div className="font-medium">Auto-detect</div>
                  <div className="text-sm text-muted-foreground">
                    Use browser&apos;s timezone
                  </div>
                </div>
              </CommandItem>
            </CommandGroup>
          )}

          <CommandGroup>
            {optionsWithOffsets.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0",
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{option.label}</span>
                    {showOffset && option.offset && (
                      <Badge variant="outline" className="text-xs">
                        {option.offset}
                      </Badge>
                    )}
                  </div>
                  {option.states && option.states.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {option.states.slice(0, 8).join(", ")}
                      {option.states.length > 8 &&
                        ` +${option.states.length - 8} more`}
                    </div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
