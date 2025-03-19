import { api } from "@/api/axios";
import { queryOptions } from "@tanstack/react-query";
import { DefaultGetRequest } from "./type";
import { Expense } from "@/entity/expense";
import { PaginationState, SortingState } from "@tanstack/react-table";

export const getExpensesQueryKey = "expenses";

export const expenseOptions = (
  pagination?: PaginationState,
  sorting?: SortingState
) => {
  const params = {
    page_size: pagination?.pageSize ?? "50",
    page: pagination?.pageIndex ? pagination.pageIndex + 1 : "1",
    order_by: sorting ? sorting[0]?.id : undefined,
    order_direction: sorting ? (sorting[0]?.desc ? "desc" : "asc") : undefined,
  };

  return queryOptions({
    queryKey: [getExpensesQueryKey, params],
    queryFn: async () => {
      try {
        const response = await api.get<DefaultGetRequest<Expense>>(
          "/expenses",
          {
            params,
          }
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return {
          data: [],
          summary: {
            page: 1,
            page_size: 50,
            total: 0,
          },
        };
      }
    },
    retry: 2,
  });
};
