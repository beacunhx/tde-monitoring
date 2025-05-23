import { Skeleton } from "../ui/skeleton";

type TableSkeletonProps = {
  columns: number | number[];
  rows?: number;
};

export function TableSkeleton({ columns, rows = 5 }: TableSkeletonProps) {
  const rowsArr = Array.from({ length: rows });
  const colsArr =
    typeof columns === "number"
      ? (Array.from({ length: columns }).fill(undefined) as undefined[])
      : columns;

  return (
    <div className="rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr>
            {colsArr.map((width, index) => (
              <th
                key={"table_skeleton_head_" + index}
                className="h-10 p-2"
                style={{ width }}
              >
                <Skeleton className="h-full w-full" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {rowsArr.map((_, i) => (
            <tr key={"table_skeleton_row_" + i}>
              {colsArr.map((_, j) => (
                <td key={"table_skeleton_column_" + j} className="p-2">
                  <Skeleton className="h-5 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
