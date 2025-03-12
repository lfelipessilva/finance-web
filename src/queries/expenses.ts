import { queryOptions } from "@tanstack/react-query";

export const expenseOptions = queryOptions({
  queryKey: ["expenses"],
  queryFn: async () => {
    const response = await fetch(`${process.env.API_ROUTE}/expenses`);

    return response.json();
  },
});
