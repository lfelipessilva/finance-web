"use client";

import { Expense } from "@/entity/expense";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { UpdateDrawer } from "./update-drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { TagPopover } from "@/components/tag-popover";
import IconRenderer from "@/components/ui/icon";

export const columns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
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
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <p>{row.original.name}</p>
        <TagPopover currentTags={row.original.tags} id={row.original.id} />
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      if (!row.original.category.name) return null;

      return (
        <div className="flex gap-2">
          <IconRenderer
            iconName={row.original.category.icon}
            background={row.original.category.color}
          />
          {row.original.category.name}
        </div>
      );
    },
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
