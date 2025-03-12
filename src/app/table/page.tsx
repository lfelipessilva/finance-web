import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { expenseOptions } from "@/queries/expenses";
import { DataTable } from "./data-table";

export default function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(expenseOptions);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTable />
      </HydrationBoundary>
    </main>
  );
}
