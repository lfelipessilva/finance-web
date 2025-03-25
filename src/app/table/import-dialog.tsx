"use client";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { processCSVData } from "@/lib/importCsv";
import { Expense } from "@/entity/expense";
import { ImportTable } from "@/components/tables/import-table";
import { useBatchCreateExpenses } from "@/mutations/expense";
import { useQueryClient } from "@tanstack/react-query";
import { getExpensesQueryKey } from "@/queries/expenses";

export function ImportDialog() {
  const [expenses, setExpenses] = useState<Omit<Expense, "id">[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useBatchCreateExpenses();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    mutate(
      { expenses },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getExpensesQueryKey] });
          setOpen(false);
        },
      }
    );
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const results = await new Promise<string[][]>((resolve, reject) => {
        Papa.parse(file, {
          complete: (result) => resolve(result.data as string[][]),
          error: reject,
          skipEmptyLines: true,
        });
      });

      const processedExpenses = processCSVData(results);
      setExpenses(processedExpenses);
    } catch (error) {
      console.error("Error processing CSV:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Importar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] sm:max-h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Importe seus dados bancários por CSV</DialogTitle>
          <DialogDescription>
            Exporte os seus dados bancários no aplicativo do seu banco e importe
            eles aqui
          </DialogDescription>

          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="file-input mb-4"
          />

          {expenses.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground mb-2">
                Encontrou {expenses.length} transações
              </p>
              <ImportTable data={expenses} />
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleSubmit()}>
                  Confirmar Importação
                </Button>
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
