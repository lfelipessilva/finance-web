import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { expenseByCategoryOptions } from "@/queries/expenses";
import { Chart } from "./chart";

export default function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(expenseByCategoryOptions());

  return (
    <main className="w-10/12 max-w-[1440px] m-auto my-8">
      <h1 className="text-[32px] font-semibold">Finance</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Chart />
      </HydrationBoundary>
    </main>
  );
}
