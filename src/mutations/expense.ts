import { api } from "@/api/axios";
import { UpdateExpense } from "@/app/table/update-drawer";
import { Expense } from "@/entity/expense";
import { useMutation } from "@tanstack/react-query";

export const useUpdateExpenseMutation = () =>
  useMutation({
    mutationFn: async ({
      expense,
      id,
    }: {
      expense: UpdateExpense;
      id: number;
    }) => {
      const response = await api({
        method: "put",
        url: `/expenses/${id}`,
        data: expense,
      });

      return response;
    },
  });

export const useBatchCreateExpenses = () =>
  useMutation({
    mutationFn: async ({ expenses }: { expenses: Omit<Expense, "id">[] }) => {
      const response = await api({
        method: "post",
        url: `/expenses/batch`,
        data: expenses,
      });

      return response;
    },
  });
