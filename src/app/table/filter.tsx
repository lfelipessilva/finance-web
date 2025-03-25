"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ExpenseFilterState } from "@/queries/expenses";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounde";
import { monthOptions } from "@/lib/contants";
import { getMonth } from "date-fns";
import { getStartAndEndOfMonth } from "@/lib/utils";

export interface FilterProps {
  filters: ExpenseFilterState;
  setFilters: (filters: ExpenseFilterState) => void;
}

const Filter = () => {
  return (
    <section className="flex gap-4">
      <NameFilter />
      <MonthFilter />
    </section>
  );
};

const NameFilter = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState<string | undefined>(
    searchParams.get("name") || undefined
  );
  const debouncedName = useDebounce(name, 300);

  useEffect(() => {
    updateFilter({
      name: debouncedName as string,
    });
  }, [debouncedName]);

  return (
    <Input
      placeholder="Filtrar nome"
      value={name}
      onChange={({ target: { value } }) => setName(value)}
    />
  );
};

const MonthFilter = () => {
  const searchParams = useSearchParams();
  const timestamp_start = searchParams.get("timestamp_start");
  const timestamp_end = searchParams.get("timestamp_start");

  const [selectedMonth, setSelectedMonth] = useState<number>(
    timestamp_start &&
      timestamp_end &&
      getMonth(timestamp_start) === getMonth(timestamp_end)
      ? getMonth(timestamp_start) + 1
      : new Date().getMonth()
  );

  useEffect(() => {
    updateFilter({
      ...getStartAndEndOfMonth(selectedMonth),
    });
  }, [selectedMonth]);

  return (
    <Select
      value={String(selectedMonth)}
      onValueChange={(value) => setSelectedMonth(Number(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mês</SelectLabel>
          {monthOptions.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const updateFilter = (filter: Record<string, string | null>) => {
  const params = new URLSearchParams(window.location.search.toString());

  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  window.history.pushState(null, "", `?${params.toString()}`);
};

export { Filter };
