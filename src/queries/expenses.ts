import { api } from "@/api/axios";
import { queryOptions } from "@tanstack/react-query";
import { DefaultPaginatedGetRequest } from "./type";
import { Expense } from "@/entity/expense";
import { PaginationState, SortingState } from "@tanstack/react-table";

export interface ExpenseFilterState {
  timestamp_start?: string;
  timestamp_end?: string;
  name?: string;
  category?: string;
}

export const getExpensesQueryKey = "expenses";

export const expenseOptions = (
  pagination?: PaginationState,
  sorting?: SortingState,
  filters?: ExpenseFilterState
) => {
  const params = {
    page_size: pagination?.pageSize ?? "50",
    page: pagination?.pageIndex ? pagination.pageIndex + 1 : "1",
    order_by: sorting ? sorting[0]?.id : "timestamp",
    order_direction: sorting ? (sorting[0]?.desc ? "desc" : "asc") : "desc",
    timestamp_start: filters?.timestamp_start ?? undefined,
    timestamp_end: filters?.timestamp_end ?? undefined,
    name: filters?.name ?? undefined,
    category: filters?.category ?? undefined,
  };

  return queryOptions({
    queryKey: [getExpensesQueryKey, params],
    queryFn: async () => {
      try {
        const response = await api.get<
          DefaultPaginatedGetRequest<Expense> & { sum: number }
        >("/expenses", {
          params,
        });

        return response.data;
      } catch (error) {
        console.error(error);
        return {
          data: [],
          sum: 0,
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
