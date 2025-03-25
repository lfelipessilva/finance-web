import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
};

const TableSkeleton = ({ columns = 4, rows = 4 }: TableSkeletonProps) => {
  return (
    <div>
      <div className="flex items-center justify-between py-4 gap-4">
        <Skeleton className="h-8 w-full border" />
        <Skeleton className="h-8 w-full border" />
        <Skeleton className="h-8 w-full border" />
      </div>

      <div className="border rounded-lg w-full">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {Array.from({ length: columns }, (_, i: number) => (
                  <TableHead key={`skeleton-head-${i}`}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rows }, (_, i: number) => (
                <TableRow
                  key={`skeleton-row-${i}`}
                  className="hover:bg-transparent"
                >
                  {Array.from({ length: columns }, (_, i: number) => (
                    <TableCell key={`skeleton-cell-${i}`}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export { TableSkeleton };
