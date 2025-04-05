import { ExpenseGroupByDate } from "@/entity/expense";
import _ from "lodash";

export function expenseByDayToRecharts(data: ExpenseGroupByDate[]): {
  result: Result[];
  categories: Category[];
} {
  const categories = _.uniqBy(data, "category_name").map(
    (entry): Category => ({
      name: entry.category_name,
      color: entry.category_color,
    })
  );

  const groupedByDate = _.groupBy(data, "timestamp");

  const result = _.map(groupedByDate, (day, timestamp) => {
    const info: Result = { timestamp };

    const categoriesInTheDay = _.keyBy(day, "category_name");

    categories.forEach(({ name }) => {
      if (categoriesInTheDay[name]) {
        info[name] = categoriesInTheDay[name].total_value;
      }
    });

    return info;
  });

  return { result, categories };
}

interface Result {
  timestamp: string;
  [category: string]: number | string;
}

interface Category {
  name: string;
  color: string;
}
