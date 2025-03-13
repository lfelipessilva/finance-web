import { api } from "@/api/axios";
import { queryOptions } from "@tanstack/react-query";
import { DefaultGetRequest } from "./type";
import { Expense } from "@/entity/expense";
import { PaginationState } from "@tanstack/react-table";

export const getExpensesQueryKey = "expenses";

export const expenseOptions = (pagination?: PaginationState) => {
  const params = {
    page_size: pagination?.pageSize ?? "50",
    page: pagination?.pageIndex ? pagination.pageIndex + 1 : "1",
  };

  return queryOptions({
    queryKey: [getExpensesQueryKey, params.page, params.page_size],
    queryFn: async () => {
      const response = await api.get<DefaultGetRequest<Expense>>("/expenses", {
        params,
      });

      return response.data;
    },
    retry: 2,
  });
};
