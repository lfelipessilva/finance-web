"use client";

import { Expense } from "@/entity/expense";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { UpdateDrawer } from "./update-drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

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
    enableSorting: true,
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting()} variant={"ghost"}>
        Valor
        <div className="flex gap-0">
          <ArrowDown
            color={column.getIsSorted() === "desc" ? "black" : "gray"}
          />
          <ArrowUp color={column.getIsSorted() === "asc" ? "black" : "gray"} />
        </div>
      </Button>
    ),
    cell: ({ row }) =>
      (row.original.value / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    accessorKey: "timestamp",
    enableSorting: true,
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting()} variant={"ghost"}>
        Data
        <div className="flex gap-0">
          <ArrowDown
            color={column.getIsSorted() === "desc" ? "black" : "gray"}
          />
          <ArrowUp color={column.getIsSorted() === "asc" ? "black" : "gray"} />
        </div>
      </Button>
    ),
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
