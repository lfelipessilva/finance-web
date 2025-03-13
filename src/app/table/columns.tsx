"use client";

import { Expense } from "@/entity/expense";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { UpdateDrawer } from "./update-drawer";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
      />
    ),
  },
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
    header: "Data",
    cell: ({ row }) => format(row.original.timestamp, "dd/MM/yyyy"),
  },
  {
    header: "Ações",
    cell: ({ row }) => <UpdateDrawer initialValues={row.original} />,
  },
];
