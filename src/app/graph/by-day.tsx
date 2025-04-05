"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import { expenseByDayOptions, ExpenseFilterState } from "@/queries/expenses";

export function ByDay() {
  const { data: groups } = useSuspenseQuery(
    expenseByDayOptions({} as ExpenseFilterState)
  );

  return (
    <ChartContainer config={{}} className="">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={groups.data}>
          <Bar dataKey="total_value" fill="#8884d8" />
          <Tooltip />
          <XAxis dataKey="timestamp" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
