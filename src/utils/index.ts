import { EStatusStudent } from "@/types";

export const toTitleCase = (str: string) => {
  // Replace underscores with spaces and convert to lowercase
  const normalized = str.replace(/_/g, " ").toLowerCase();

  // Split the string into words
  const words = normalized.split(/\s+/);

  // Capitalize the first letter of each word
  const titleCased = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCased;
};

export const translateColorChips = (status: string) => {
  switch (status) {
    case "active":
    case EStatusStudent.ACTIVE:
      return "success";
    case EStatusStudent.INACTIVE:
    case "inactive":
      return "error";
    default:
      return "default";
  }
};

export const currencyFormat = (input: string | number) => {
  let value = input;
  if (typeof value === "number") {
    value = value.toString();
  }
  if (value === "0") {
    return "0";
  } else {
    return value
      .replace(/^0+/, "")
      .replace(/(?!,)\D/g, "")
      .replace(/(?<=,\d\d).*/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/\./g, ".");
  }
};
