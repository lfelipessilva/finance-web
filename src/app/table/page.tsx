import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { expenseOptions } from "@/queries/expenses";
import { DataTable } from "./data-table";
import { ImportDialog } from "./import-dialog";
import { Floating } from "./floating";

export default function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(expenseOptions());

  return (
    <main className="w-10/12 max-w-[1440px] m-auto my-8">
      <h1 className="text-[32px] font-semibold">Finance</h1>
      <ImportDialog />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTable />
        <Floating />
      </HydrationBoundary>
    </main>
  );
}
