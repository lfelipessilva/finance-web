"use client";

import React, { Suspense, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ExpenseFilterState, expenseOptions } from "@/queries/expenses";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { columns } from "./columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTableState } from "../state/table-state";
import { Filter } from "./filter";
import { cn, paramsToObject } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function DataTable() {
  const searchParams = useSearchParams();
  const filters = paramsToObject(searchParams);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "timestamp", desc: true },
  ]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const { rowSelection, setRowSelection } = useTableState((state) => state);

  const { data: expenses } = useSuspenseQuery(
    expenseOptions(pagination, sorting, filters as ExpenseFilterState)
  );

  const table = useReactTable({
    data: expenses.data,
    columns: columns({ sum: expenses.sum }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    manualPagination: true,
    enableSorting: true,
    manualSorting: true,
    getRowId: (row) => String(row.id),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: expenses.summary.total,
    state: {
      rowSelection,
      pagination,
      sorting,
    },
  });

  return (
    <div className="flex flex-col gap-4 py-4">
      <Suspense>
        <Filter />
      </Suspense>
      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">
          {Object.keys(rowSelection).length} de {expenses.summary.total}{" "}
          registros selecionados
        </p>
        <div className="flex gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  className={cn(
                    !table.getCanPreviousPage() &&
                      "cursor-auto pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                  {table.getState().pagination.pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  className={cn(
                    !table.getCanNextPage() && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Número por página</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
