import { create } from "zustand";

interface RowSelectionState {
  rowSelection: Record<string, boolean>;
  setRowSelection: (
    updater:
      | ((prev: Record<string, boolean>) => Record<string, boolean>)
      | Record<string, boolean>
  ) => void;
  clearSelection: () => void;
}

export const useTableState = create<RowSelectionState>((set) => ({
  rowSelection: {},
  setRowSelection: (updater) =>
    set((state) => {
      const newSelection =
        typeof updater === "function" ? updater(state.rowSelection) : updater;
      return { rowSelection: newSelection };
    }),
  clearSelection: () => set({ rowSelection: {} }),
}));
