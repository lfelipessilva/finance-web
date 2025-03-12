"use client";

import { Expense } from "@/entity/expense";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Omit<Expense, "id">>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) =>
      (row.original.value / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    accessorKey: "timestamp",
    header: "Horário",
    cell: ({ row }) => format(row.original.timestamp, "dd/MM/yyyy HH:ss"),
  },
];
