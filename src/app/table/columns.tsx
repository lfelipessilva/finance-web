"use client";

import { Expense } from "@/entity/expense";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { UpdateDrawer } from "./update-drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <Badge style={{ backgroundColor: row.original.category.color }}>
        {row.original.category.name}
      </Badge>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.tags.map((tag) => (
          <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
            {tag.name}
          </Badge>
        ))}
      </div>
    ),
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
    accessorKey: "card",
    header: "Cartão",
  },
  {
    accessorKey: "bank",
    header: "Banco",
  },
  {
    header: "Ações",
    cell: ({ row }) => <UpdateDrawer initialValues={row.original} />,
  },
];
