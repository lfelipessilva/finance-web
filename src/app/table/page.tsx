import React, { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { expenseOptions } from "@/queries/expenses";
import { DataTable } from "./data-table";
import { ImportDialog } from "./import-dialog";
import { Floating } from "./floating";
import { tagOptions } from "@/queries/tags";
import { categoryOptions } from "@/queries/categories";
import { TableSkeleton } from "./table-skeleton";

export default function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(expenseOptions());
  void queryClient.prefetchQuery(tagOptions());
  void queryClient.prefetchQuery(categoryOptions());

  return (
    <main className="w-10/12 max-w-[1440px] m-auto my-8">
      <h1 className="text-[32px] font-semibold">Finance</h1>
      <ImportDialog />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<TableSkeleton rows={50} columns={8} />}>
          <DataTable />
        </Suspense>
        <Floating />
      </HydrationBoundary>
    </main>
  );
}
