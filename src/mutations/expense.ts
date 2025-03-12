import { api } from "@/api/axios";
import { UpdateExpense } from "@/app/table/update-drawer";
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
