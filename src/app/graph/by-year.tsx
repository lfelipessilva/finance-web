"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  expenseByYearOptions,
  ExpenseFilterState,
} from "@/queries/expenses";

export function ByYear() {
  const { data: groups } = useSuspenseQuery(
    expenseByYearOptions({} as ExpenseFilterState)
  );

  return (
    <ChartContainer config={{}} className="">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={groups.data}>
          <Bar dataKey="total_value" fill="#8884d8" />
          <XAxis dataKey="timestamp" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
