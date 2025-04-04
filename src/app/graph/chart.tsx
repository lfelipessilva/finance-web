"use client";

import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
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

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

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
