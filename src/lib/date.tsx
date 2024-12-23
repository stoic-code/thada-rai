import { toast } from "sonner";
import NepaliDate from "nepali-datetime";

export const dateFormatter = (date: string) => {
  const validDate = new Date(date);

  // Extract year, month, and day components
  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(validDate.getDate()).padStart(2, "0");

  // Concatenate components to form the desired format
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const dateFormatterWithTime = (date: string) => {
  const validDate = new Date(date);

  // Extract year, month, day, hour, minute, and second components
  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(validDate.getDate()).padStart(2, "0");
  const hour = String(validDate.getHours()).padStart(2, "0");
  const minute = String(validDate.getMinutes()).padStart(2, "0");

  // Concatenate components to form the desired format
  const formattedDate = `${year}-${month}-${day} (${hour}:${minute})`;
  return formattedDate;
};

export const nepaliDateFormatter = (date: string): string => {
  // Function to convert Western Arabic numerals to Nepali numerals
  const convertToNepaliNumerals = (number: number): string => {
    const nepaliNumeralsMap = [
      "०",
      "१",
      "२",
      "३",
      "४",
      "५",
      "६",
      "७",
      "८",
      "९",
    ];
    return String(number).replace(
      /\d/g,
      (digit) => nepaliNumeralsMap[parseInt(digit)],
    );
  };

  const validDate = new Date(date);

  // Extract year, month, and day components
  const year = convertToNepaliNumerals(validDate.getFullYear());
  let month = convertToNepaliNumerals(validDate.getMonth() + 1); // Months are zero-indexed
  let day = convertToNepaliNumerals(validDate.getDate());

  // Add leading zeros if necessary
  if (month.length === 1) {
    month = "०" + month;
  }
  if (day.length === 1) {
    day = "०" + day;
  }

  // Concatenate components to form the desired format
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export function engNumToNepNum(input: string): string {
  const nepaliDigits: string[] = [
    "०",
    "१",
    "२",
    "३",
    "४",
    "५",
    "६",
    "७",
    "८",
    "९",
  ];
  return input.replace(/\d/g, (digit) => nepaliDigits[parseInt(digit, 10)]);
}

export function bsToAd(date: string) {
  try {
    const engBirthDate = new NepaliDate(date).getDateObject();
    const birthDate = engBirthDate.toISOString().split("T")[0];
    return birthDate;
  } catch (err: any) {
    toast.error(err.message);
  }
}
