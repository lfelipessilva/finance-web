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
import { useEffect, useState, useMemo } from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { ExpenseFilterState } from "@/queries/expenses";
import { useDebounce } from "@/hooks/use-debounde";

const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";

const defineMonthFilter = (month: number) => {
  const year = new Date().getFullYear();
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  return {
    timestamp_start: format(start, DATE_FORMAT),
    timestamp_end: format(end, DATE_FORMAT),
  };
};

export interface FilterProps {
  filters: ExpenseFilterState;
  setFilters: (filters: ExpenseFilterState) => void;
}

const Filter = ({ setFilters }: FilterProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().getMonth().toString()
  );
  const [name, setName] = useState<string>("");
  const debouncedName = useDebounce(name, 300);

  useEffect(() => {
    setFilters({
      ...defineMonthFilter(Number(selectedMonth)),
      name: debouncedName as string,
    });
  }, [selectedMonth, debouncedName, setFilters]);

  const monthOptions = useMemo(
    () => [
      { value: "0", label: "Janeiro" },
      { value: "1", label: "Fevereiro" },
      { value: "2", label: "Março" },
      { value: "3", label: "Abril" },
      { value: "4", label: "Maio" },
      { value: "5", label: "Junho" },
      { value: "6", label: "Julho" },
      { value: "7", label: "Agosto" },
      { value: "8", label: "Setembro" },
      { value: "9", label: "Outubro" },
      { value: "10", label: "Novembro" },
      { value: "11", label: "Dezembro" },
    ],
    []
  );

  return (
    <section className="flex gap-4">
      <Input
        placeholder="Filtrar nome"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <Select
        value={selectedMonth}
        onValueChange={(value) => setSelectedMonth(value)}
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
    </section>
  );
};

export { Filter };
