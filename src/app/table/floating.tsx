"use client";

import { Button } from "@/components/ui/button";
import { useTableState } from "../state/table-state";
import { CalendarIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { endOfDay, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  value: z.number().min(0, {}),
  timestamp: z.string(),
  tagIds: z.array(z.number()),
  categoryId: z.number(),
});

export type UpdateExpense = z.infer<typeof formSchema>;

export const Floating = () => {
  const { rowSelection } = useTableState((state) => state);

  const form = useForm<UpdateExpense>({
    resolver: zodResolver(formSchema),
  });

  if (!Object.values(rowSelection)[0]) return null;

  const onSubmit = (data: UpdateExpense) => {
    console.log(data);
  };

  return (
    <section className="sticky bottom-12 bg-foreground h-12 px-4 py-2 z-10 flex items-center justify-center rounded-sm gap-4 w-fit mx-auto">
      <Button>
        <Trash />
        Excluir
      </Button>

      <Separator orientation="vertical" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="nome"
                    {...field}
                    className="bg-primary text-background"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="description"
                    {...field}
                    className="bg-primary text-background"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="value"
                    {...field}
                    type="number"
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                    className="bg-primary text-background"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className=" min-w-32 w-full bg-primary text-background">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Light</SelectItem>
                      <SelectItem value="2">Dark</SelectItem>
                      <SelectItem value="3">System</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timestamp"
            render={({ field }) => (
              <FormItem>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          "bg-primary text-background text-white",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Seleciona uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(date: Date | undefined) => {
                        if (!date) field.onChange("");
                        field.onChange(
                          format(endOfDay(date!), "yyyy-MM-dd'T'HH:mm:ss'Z'")
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Atualizar</Button>
        </form>
      </Form>
    </section>
  );
};
