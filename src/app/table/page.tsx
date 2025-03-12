import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { expenseOptions } from "@/queries/expenses";
import { DataTable } from "./data-table";
import { ImportDialog } from "./import-dialog";

export default function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(expenseOptions);

  return (
    <main className="w-10/12 max-w-[1440px] m-auto h-dvh py-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ImportDialog />
        <DataTable />
      </HydrationBoundary>
    </main>
  );
}
