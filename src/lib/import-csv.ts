import { parse, format } from "date-fns";
import { Expense } from "@/entity/expense";
import { DATE_FORMAT } from "./contants";

const POSSIBLE_COLUMN_NAMES = {
  timestamp: ["data", "date"],
  name: ["lançamento", "title", "descrição"],
  value: ["valor", "amount", "value"],
} as const;

export const convertBrazilianDate = (dateString: string): string => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  return format(parsedDate, DATE_FORMAT);
};

export const mapCSVHeaders = (headers: string[]): Record<string, number> => {
  const result: Record<string, number> = {};

  headers.forEach((header, index) => {
    Object.entries(POSSIBLE_COLUMN_NAMES).forEach(([key, columnNames]) => {
      if (columnNames.some((col) => col === header.toLowerCase().trim())) {
        result[key] = index;
      }
    });
  });

  return result;
};

export const defineIsBrazilianDate = (
  rows: string[][],
  columnIndex: number
): boolean => {
  return rows.some((row) => {
    const date = row[columnIndex];
    try {
      const parsedDate = parse(date, "dd/MM/yyyy", new Date());
      return !isNaN(parsedDate.getTime());
    } catch {
      return false;
    }
  });
};

export const parseTransactionRow = (
  row: string[],
  headerOrder: Record<string, number>,
  isBrazilianDate: boolean
): Omit<Expense, "id"> => {
  const expense: Partial<Expense> = {};

  Object.entries(headerOrder).forEach(([header, index]) => {
    switch (header) {
      case "name":
        expense.name = row[index];
        break;
      case "timestamp":
        expense.timestamp = isBrazilianDate
          ? convertBrazilianDate(row[index])
          : format(new Date(row[index]), DATE_FORMAT);
        break;
      case "value":
        expense.value = Number(row[index].replace(/\D/g, ""));
        break;
      default:
        break;
    }
  });

  return expense as Omit<Expense, "id">;
};

export const processCSVData = (results: string[][]): Omit<Expense, "id">[] => {
  const [headerRow, ...dataRows] = results;
  const headerOrder = mapCSVHeaders(headerRow);
  const isBrazilianDate = defineIsBrazilianDate(
    dataRows,
    headerOrder["timestamp"]
  );

  return dataRows.map((row) =>
    parseTransactionRow(row, headerOrder, isBrazilianDate)
  );
};
