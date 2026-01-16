/**
 * Format a value as currency
 * @param value - The number or string to format
 * @param currency - The currency code (defaults to USD)
 * @param defaultValue - Default value if conversion fails (defaults to 0)
 * @returns Formatted currency string
 */
export const fCurrency = (
  value: number | string | null | undefined,
  currency = "USD",
  defaultValue = 0,
) => {
  // Convert string to number if needed
  let numValue: number;

  if (typeof value === "string") {
    numValue = parseFloat(value);
  } else if (typeof value === "number") {
    numValue = value;
  } else {
    numValue = defaultValue;
  }

  // Handle invalid values
  if (isNaN(numValue)) {
    numValue = defaultValue;
  }

  try {
    // Create currency formatter based on the provided currency code
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numValue);
  } catch {
    // Fallback to basic formatting if currency code is invalid
    return `$${numValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

/**
 * Format a value as a number with specified precision.
 * @param value - The number or string to format.
 * @param precision - The number of decimal places (defaults to 0).
 * @param defaultValue - Default value if conversion fails (defaults to 0).
 * @returns Formatted number string.
 */
export const fNumber = (
  value: number | string | null | undefined,
  precision = 0,
  defaultValue = 0,
) => {
  let numValue: number;

  if (typeof value === "string") {
    numValue = parseFloat(value);
  } else if (typeof value === "number") {
    numValue = value;
  } else {
    numValue = defaultValue;
  }

  if (isNaN(numValue)) {
    numValue = defaultValue;
  }

  return numValue.toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
};
