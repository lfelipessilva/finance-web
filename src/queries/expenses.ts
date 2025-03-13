import { api } from "@/api/axios";
import { queryOptions } from "@tanstack/react-query";

export const getExpensesQueryKey = "expenses";

export const expenseOptions = queryOptions({
  queryKey: [getExpensesQueryKey],
  queryFn: async () => {
    const response = await api.get("/expenses");
    console.log(response);
    return response.data;
  },
  retry: 2,
});
