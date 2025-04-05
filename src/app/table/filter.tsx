"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseFilterState } from "@/queries/expenses";
import { endOfDay, format, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { categoryOptions } from "@/queries/categories";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoryBadge } from "@/components/ui/category-badge";
import { useQueryState } from "nuqs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

export interface FilterProps {
  filters: ExpenseFilterState;
  setFilters: (filters: ExpenseFilterState) => void;
}

const Filter = () => {
  const [category, setCategory] = useQueryState("category");
  const [name, setName] = useQueryState("name");
  const [timestamp_start, setTimestamp_start] =
    useQueryState("timestamp_start");
  const [timestamp_end, setTimestamp_end] = useQueryState("timestamp_end");

  const { data: categories } = useSuspenseQuery(categoryOptions());

  return (
    <section className="flex gap-4">
      <Input
        placeholder="Filtrar nome"
        value={name ?? undefined}
        onChange={({ target: { value } }) => setName(value)}
      />

      <Select
        value={category ?? undefined}
        onValueChange={(value) => {
          setCategory(value);
        }}
        defaultValue={undefined}
      >
        <SelectTrigger className="w-full min-w-20">
          <SelectValue placeholder="Selecione a categoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem value={String(category.id)} key={category.id}>
              <CategoryBadge category={category} />
            </SelectItem>
          ))}
          {/* @ts-expect-error @ts-ignore */}
          <SelectItem value={null}>Sem categoria</SelectItem>
        </SelectContent>
      </Select>
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !timestamp_start && "text-muted-foreground"
            )}
          >
            {timestamp_start ? (
              format(timestamp_start, "PPP", { locale: ptBR })
            ) : (
              <span>Seleciona uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={timestamp_start ? new Date(timestamp_start) : undefined}
            onSelect={(date: Date | undefined) => {
              if (!date) setTimestamp_start("");
              setTimestamp_start(
                format(startOfDay(date!), "yyyy-MM-dd'T'HH:mm:ss'Z'")
              );
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !timestamp_end && "text-muted-foreground"
            )}
          >
            {timestamp_end ? (
              format(timestamp_end, "PPP", { locale: ptBR })
            ) : (
              <span>Seleciona uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={timestamp_end ? new Date(timestamp_end) : undefined}
            onSelect={(date: Date | undefined) => {
              if (!date) setTimestamp_end("");
              setTimestamp_end(
                format(endOfDay(date!), "yyyy-MM-dd'T'HH:mm:ss'Z'")
              );
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </section>
  );
};

export { Filter };
