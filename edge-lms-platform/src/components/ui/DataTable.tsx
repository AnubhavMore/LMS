import * as React from "react"
import { cn } from "@/lib/utils"

interface Column<T> {
  header: React.ReactNode
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  className?: string
  onRowClick?: (row: T) => void
  rowClassName?: (row: T) => string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No data available",
  className,
  onRowClick,
  rowClassName
}: DataTableProps<T>) {
  function renderCell(row: T, col: Column<T>) {
    if (typeof col.accessor === "function") return col.accessor(row)
    return String(row[col.accessor] ?? "")
  }

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-gray-100", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map((col, i) => (
              <th
                key={i}
                className={cn(
                  "px-4 py-3 text-left font-semibold text-brand-neutral text-xs uppercase tracking-wider",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-brand-neutral">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-gray-50 transition-all duration-300",
                  onRowClick ? "cursor-pointer hover:bg-gray-50" : "",
                  rowClassName?.(row)
                )}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={cn("px-4 py-3 text-brand-dark-grey", col.className)}>
                    {renderCell(row, col)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
