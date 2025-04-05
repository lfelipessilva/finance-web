"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import { expenseByDayOptions, ExpenseFilterState } from "@/queries/expenses";
import { Filter } from "../table/filter";
import { parseAsString, useQueryStates } from "nuqs";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { expenseByDayToRecharts } from "@/lib/expense-by-date-to-recharts";

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const total = payload.reduce((sum, { value }) => sum + Number(value), 0);

  return (
    <div className="bg-white p-3 rounded shadow text-sm space-y-1">
      <p className="font-semibold">{`Dia: ${label}`}</p>
      {payload.map(({ name, color, value }) => (
        <div key={name?.toString()} className="flex justify-between gap-2">
          <div className="flex items-center gap-1">
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-gray-700">{name}:</span>
          </div>
          <span>{formatter.format(Number(value) / 100)}</span>
        </div>
      ))}
      <hr className="my-1" />
      <p className="font-semibold">Total: {formatter.format(total / 100)}</p>
    </div>
  );
};

export function ByDay() {
  const [filters] = useQueryStates({
    timestamp_start: parseAsString,
    timestamp_end: parseAsString,
    name: parseAsString,
    category: parseAsString,
  });

  const { data: groups } = useSuspenseQuery(
    expenseByDayOptions(filters as ExpenseFilterState)
  );

  const { result, categories } = expenseByDayToRecharts(groups.data);

  return (
    <main>
      <Filter />
      <ChartContainer config={{}} className="">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={result}>
            <XAxis dataKey="timestamp" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {categories.map(({ name, color }) => (
              <Bar
                key={name}
                dataKey={name}
                stackId="a"
                fill={color}
                name={name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </main>
  );
}
