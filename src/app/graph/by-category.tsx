"use client";

import { Cell, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  expenseByCategoryOptions,
  ExpenseFilterState,
} from "@/queries/expenses";
import { useState } from "react";

export function Chart() {
  const { data: groups } = useSuspenseQuery(
    expenseByCategoryOptions({} as ExpenseFilterState)
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ChartContainer config={{}} className="">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={groups.data}
          dataKey="total_amount"
          nameKey="category_name"
          innerRadius={0}
          outerRadius={300}
          strokeWidth={5}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          activeIndex={activeIndex}
          activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            <Sector {...props} outerRadius={outerRadius * 1.1} opacity={1} />
          )}
        >
          {groups.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.category_color}
              opacity={activeIndex === index ? 1 : 0.8}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
