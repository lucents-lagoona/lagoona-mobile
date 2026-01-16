export const getFullName = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  if (firstName) {
    return firstName.trim();
  }
  if (lastName) {
    return lastName.trim();
  }
  return "";
};

export const getInitials = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  const first = firstName?.[0] ?? "U";
  const last = lastName?.[0] ?? "A";

  return `${first}${last}`.toUpperCase();
};

export const getEmail = (
  emailAddresses?: { emailAddress: string }[],
): string => {
  if (emailAddresses?.length) {
    return emailAddresses[0]?.emailAddress ?? "";
  }
  return "";
};
