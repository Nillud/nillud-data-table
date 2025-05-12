import { Column, TableElement } from "../types/ExportSection.types"

export function prepareExportRows(
  columns: Column[],
  data: TableElement[]
): string[][] {
  return data.map((row) =>
    columns.map((col) => {
      const value = row[col.field]
      return typeof col.exportCustomCell !== 'undefined'
        ? col.exportCustomCell(String(value), row)
        : String(value ?? '')
    })
  )
}

export function prepareExportHeaders(columns: Column[]): string[] {
  return columns.map(col => col.title)
}
