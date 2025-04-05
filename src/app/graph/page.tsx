import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import {
  expenseByCategoryOptions,
  expenseByDayOptions,
} from "@/queries/expenses";
import { Chart } from "./by-category";
import { ByDay } from "./by-day";
import { ByMonth } from "./by-month";
import { ByYear } from "./by-year";

export default function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(expenseByCategoryOptions());
  void queryClient.prefetchQuery(expenseByDayOptions());

  return (
    <main className="w-10/12 max-w-[1440px] m-auto my-8">
      <h1 className="text-[32px] font-semibold">Finance</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Chart />
        <ByDay />
        <ByMonth />
        <ByYear />
      </HydrationBoundary>
    </main>
  );
}
