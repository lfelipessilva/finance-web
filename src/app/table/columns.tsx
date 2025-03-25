"use client";

import { Expense } from "@/entity/expense";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { UpdateDrawer } from "./update-drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TagPopover } from "@/components/tag-popover";
import { CategoryBadge } from "@/components/ui/category-badge";

let lastSelectedId = "";

export const columns = ({ sum }: { sum: number }): ColumnDef<Expense>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row, table }) => {
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onClick={(e) => handleShiftSelection(e, row, table)}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
          </div>
        );
      },
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
            <ArrowUp
              color={column.getIsSorted() === "asc" ? "black" : "gray"}
            />
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

        return <CategoryBadge category={row.original.category} />;
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
            <ArrowUp
              color={column.getIsSorted() === "asc" ? "black" : "gray"}
            />
          </div>
        </Button>
      ),
      cell: ({ row }) =>
        (row.original.value / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      footer: () =>
        (sum / 100).toLocaleString("pt-BR", {
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
};

const handleShiftSelection = (
  event: React.MouseEvent,
  targetRow: Row<Expense>,
  table: Table<Expense>
) => {
  if (!event.shiftKey || !lastSelectedId) {
    lastSelectedId = targetRow.id;
    return;
  }

  const { rows, rowsById } = table.getRowModel();
  const previousSelectedState =
    rowsById[lastSelectedId]?.getIsSelected() ?? false;

  const selectionRange = getRowRange(rows, targetRow.id, lastSelectedId);
  selectionRange.forEach((row) => row.toggleSelected(previousSelectedState));

  lastSelectedId = targetRow.id;
};

function getRowRange<T>(rows: Array<Row<T>>, idA: string, idB: string) {
  const startIndex = rows.findIndex((row) => row.id === idA || row.id === idB);

  if (startIndex === -1) return [];

  const endMatch = rows
    .slice(startIndex + 1)
    .find((row) => row.id === idA || row.id === idB);

  const endIndex = endMatch
    ? rows.indexOf(endMatch, startIndex + 1)
    : rows.length - 1;

  return rows.slice(startIndex, endIndex + 1);
}
