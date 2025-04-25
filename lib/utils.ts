import { EsimData } from "@/types/esim";
import esimDataRaw from "@/data/esimData.json";
export const esimData: EsimData = esimDataRaw as EsimData;

export const parseDataValueUnit = (
  dataStr: string | undefined,
): { value: number; unit: string } => {
  if (!dataStr) return { value: 0, unit: "N/A" };
  const value = parseFloat(dataStr);
  let unit = "GB";
  if (dataStr.toLowerCase().includes("gb")) unit = "GB";
  else if (dataStr.toLowerCase().includes("mb")) unit = "MB";
  return { value: isNaN(value) ? 0 : value, unit };
};

export const parseDataToMB = (dataStr: string | undefined): number => {
  if (!dataStr) return 0;
  const { value, unit } = parseDataValueUnit(dataStr);
  if (unit === "GB") return value * 1024;
  if (unit === "MB") return value;
  return 0;
};

export const formatDate = (
  dateString: string | undefined,
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!dateString) return "N/A";
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string provided to formatDate");
    }
    return date.toLocaleDateString("en-US", options || defaultOptions);
  } catch (e) {
    console.error("Date formatting error:", e);
    return "Invalid Date";
  }
};

export const formatSessionTimestamp = (
  dateString: string | undefined,
): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string provided to formatSessionTimestamp");
    }
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    console.error("Timestamp formatting error:", e);
    return "Invalid Date/Time";
  }
};

export const isValidBookingId = (id: string | null | undefined): boolean => {
  return typeof id === "string" && id === esimData.bookingId;
};
