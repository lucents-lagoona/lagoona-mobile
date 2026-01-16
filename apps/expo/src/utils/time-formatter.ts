import { format, isValid, parseISO } from "date-fns"; // Import from date-fns

export const formatDate = (dateInput?: string | Date): string => {
  if (!dateInput) return "TBD";
  try {
    let date: Date;
    if (typeof dateInput === "string") {
      date = parseISO(dateInput);
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      // Should not happen with TypeScript, but as a safeguard
      return String(dateInput);
    }

    if (!isValid(date)) {
      // console.warn(`Invalid date input for formatDate: ${dateInput}`); // Optional: log warning
      return typeof dateInput === "string" ? dateInput : String(dateInput); // Fallback
    }
    return format(date, "MMMM d, yyyy");
  } catch {
    // console.error(`Error formatting date '${String(dateInput)}':`, _error); // Optional: log error
    return typeof dateInput === "string" ? dateInput : String(dateInput); // Fallback
  }
};

export const formatTime = (dateInput?: string | Date): string => {
  if (!dateInput) return "TBD";
  try {
    let date: Date;
    if (typeof dateInput === "string") {
      date = parseISO(dateInput);
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      // Should not happen with TypeScript, but as a safeguard
      return String(dateInput);
    }

    if (!isValid(date)) {
      // console.warn(`Invalid date input for formatTime: ${dateInput}`);
      return typeof dateInput === "string" ? dateInput : String(dateInput);
    }
    return format(date, "h:mm aa");
  } catch {
    // console.error(`Error formatting time '${String(dateInput)}':`, _error);
    return typeof dateInput === "string" ? dateInput : String(dateInput);
  }
};

export const formatDuration = (timeInput?: string | Date): string => {
  if (!timeInput) return "TBD";

  let hours: number;
  let minutes: number;

  if (timeInput instanceof Date) {
    if (!isValid(timeInput)) {
      // console.warn(`Invalid Date object for formatDuration: ${timeInput}`);
      return "Invalid Date";
    }
    hours = timeInput.getHours();
    minutes = timeInput.getMinutes();
  } else if (typeof timeInput === "string") {
    if (timeInput.trim() === "") return "TBD";
    const parts = timeInput.split(":");
    if (parts.length !== 2) {
      // console.warn(`Invalid duration string format for formatDuration: ${timeInput}`);
      return "Invalid format";
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    hours = parseInt(parts[0]!, 10);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    minutes = parseInt(parts[1]!, 10);

    if (isNaN(hours) || isNaN(minutes)) {
      // console.warn(`Invalid time values in string for formatDuration: ${timeInput}`);
      return "Invalid time values";
    }
  } else {
    // Should not happen with TypeScript, but as a safeguard
    return "Invalid input type";
  }

  if (hours === 0 && minutes === 0) return "No setup time"; // Or 'TBD' or '0 minutes'

  let durationString = "";
  if (hours > 0) {
    durationString += `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (minutes > 0) {
    if (durationString.length > 0) {
      durationString += " ";
    }
    durationString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return durationString.length > 0 ? durationString : "TBD";
};

export const fDateTime = (dateTimeInput?: string | Date): string => {
  if (!dateTimeInput) return "TBD";
  try {
    let date: Date;
    if (typeof dateTimeInput === "string") {
      date = parseISO(dateTimeInput);
    } else if (dateTimeInput instanceof Date) {
      date = dateTimeInput;
    } else {
      // Should not happen with TypeScript, but as a safeguard
      return String(dateTimeInput);
    }

    if (!isValid(date)) {
      // console.warn(`Invalid date input for formatCombinedDateTime: ${dateTimeInput}`); // Optional: log warning
      return typeof dateTimeInput === "string"
        ? dateTimeInput
        : String(dateTimeInput); // Fallback
    }
    return format(date, "MMMM d, yyyy, h:mm aa");
  } catch {
    // console.error(`Error formatting date '${String(dateTimeInput)}':`, _error); // Optional: log error
    return typeof dateTimeInput === "string"
      ? dateTimeInput
      : String(dateTimeInput); // Fallback
  }
};
