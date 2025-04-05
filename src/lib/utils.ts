import { clsx, type ClassValue } from "clsx";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import { DATE_FORMAT } from "./contants";
import { ExpenseGroupByDate } from "@/entity/expense";

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

export const getStartAndEndOfMonth = (month?: number) => {
  if (!month)
    return {
      timestamp_start: null,
      timestamp_end: null,
    };
  const year = new Date().getFullYear();

  return {
    timestamp_start: format(startOfMonth(new Date(year, month)), DATE_FORMAT),
    timestamp_end: format(endOfMonth(new Date(year, month)), DATE_FORMAT),
  };
};
