"use client";

import { ptBR } from "date-fns/locale";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Expense } from "@/entity/expense";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format, endOfDay } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useUpdateExpenseMutation } from "@/mutations/expense";
import { useQueryClient } from "@tanstack/react-query";
import { getExpensesQueryKey } from "@/queries/expenses";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  value: z.number().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  category: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  timestamp: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type UpdateExpense = z.infer<typeof formSchema>;

export function UpdateDrawer({ initialValues }: { initialValues: Expense }) {
  const queryClient = useQueryClient();
  const form = useForm<UpdateExpense>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { mutate } = useUpdateExpenseMutation();

  function onSubmit(data: UpdateExpense) {
    console.log(data)
    mutate(
      { expense: data, id: initialValues.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getExpensesQueryKey] });
        },
      }
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Atualizar gasto</DrawerTitle>
            <DrawerDescription>
              Atualize o nome, valor, categoria ou horário do seu gasto
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="nome" {...field} />
                    </FormControl>
                    <FormDescription>Nome do seu gasto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="value"
                        {...field}
                        type="number"
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>Valor do seu gasto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 00,00" {...field} />
                    </FormControl>
                    <FormDescription>
                      Essa é a categoria do seu gasto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timestamp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Pick a date</span>
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
                              format(
                                endOfDay(date!),
                                "yyyy-MM-dd'T'HH:mm:ss'Z'"
                              )
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Esse é o horário do seu gasto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
