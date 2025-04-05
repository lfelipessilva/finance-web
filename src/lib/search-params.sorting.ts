import { ColumnSort, SortDirection } from "@tanstack/react-table";
import { createParser, parseAsArrayOf, useQueryState } from "nuqs";

// Each sort is represented as `columnId:direction`,
// for example: `?orderBy=email:desc,status:asc`
const sortParser = createParser<ColumnSort>({
  parse: (query) => {
    const [id, direction] = query.split(":");
    return {
      id,
      desc: direction === "desc",
    };
  },
  serialize: (value) =>
    `${value.id}:${
      value.desc ? "desc" : "asc"
    }` as `${string}:${SortDirection}`,
  eq: (a, b) => JSON.stringify(a) === JSON.stringify(b),
});

const parseAsSortingState = parseAsArrayOf(sortParser).withDefault([]);

export function useSortingSearchParams(key = "orderBy") {
  return useQueryState(key, parseAsSortingState);
}
