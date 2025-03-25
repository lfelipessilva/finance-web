import { clsx, type ClassValue } from "clsx";
import { endOfMonth, startOfMonth } from "date-fns";
import { format } from "path";
import { twMerge } from "tailwind-merge";
import { DATE_FORMAT } from "./contants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function paramsToObject(searchParams: URLSearchParams) {
  const obj: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }
  return obj;
}

export const getStartAndEndOfMonth = (month: number) => {
  const year = new Date().getFullYear();

  return {
    timestamp_start: format(startOfMonth(new Date(year, month)), DATE_FORMAT),
    timestamp_end: format(endOfMonth(new Date(year, month)), DATE_FORMAT),
  };
};
