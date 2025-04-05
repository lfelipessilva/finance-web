import { api } from "@/api/axios";
import { queryOptions } from "@tanstack/react-query";
import { DefaultPaginatedGetRequest } from "./type";
import {
  Expense,
  ExpenseGroupByCategory,
  ExpenseGroupByDate,
} from "@/entity/expense";
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

export const getExpensesByCategoryQueryKey = "expenses-by-category";

export const expenseByCategoryOptions = (filters?: ExpenseFilterState) => {
  const params = {
    timestamp_start: filters?.timestamp_start ?? undefined,
    timestamp_end: filters?.timestamp_end ?? undefined,
    name: filters?.name ?? undefined,
    category: filters?.category ?? undefined,
  };

  return queryOptions({
    queryKey: [getExpensesQueryKey, params],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: ExpenseGroupByCategory[] }>(
          "/expenses/category",
          {
            params,
          }
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return {
          data: [],
        };
      }
    },
    retry: 2,
  });
};

export const getExpensesByDayQueryKey = "expenses-by-day";

export const expenseByDayOptions = (filters?: ExpenseFilterState) => {
  const params = {
    timestamp_start: filters?.timestamp_start ?? undefined,
    timestamp_end: filters?.timestamp_end ?? undefined,
    name: filters?.name ?? undefined,
    category: filters?.category ?? undefined,
  };

  return queryOptions({
    queryKey: [getExpensesByDayQueryKey, params],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: ExpenseGroupByDate[] }>(
          "/expenses/day",
          {
            params,
          }
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return {
          data: [],
        };
      }
    },
    retry: 2,
  });
};

export const getExpensesByMonthQueryKey = "expenses-by-month";

export const expenseByMonthOptions = (filters?: ExpenseFilterState) => {
  const params = {
    timestamp_start: filters?.timestamp_start ?? undefined,
    timestamp_end: filters?.timestamp_end ?? undefined,
    name: filters?.name ?? undefined,
    category: filters?.category ?? undefined,
  };

  return queryOptions({
    queryKey: [getExpensesByMonthQueryKey, params],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: ExpenseGroupByDate[] }>(
          "/expenses/month",
          {
            params,
          }
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return {
          data: [],
        };
      }
    },
    retry: 2,
  });
};

export const getExpensesByYearQueryKey = "expenses-by-year";

export const expenseByYearOptions = (filters?: ExpenseFilterState) => {
  const params = {
    timestamp_start: filters?.timestamp_start ?? undefined,
    timestamp_end: filters?.timestamp_end ?? undefined,
    name: filters?.name ?? undefined,
    category: filters?.category ?? undefined,
  };

  return queryOptions({
    queryKey: [getExpensesByYearQueryKey, params],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: ExpenseGroupByDate[] }>(
          "/expenses/year",
          {
            params,
          }
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return {
          data: [],
        };
      }
    },
    retry: 2,
  });
};
