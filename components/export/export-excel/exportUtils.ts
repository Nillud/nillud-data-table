// exportUtils.ts
import ExcelJS from 'exceljs'
import { Column, CustomColumn, CustomColumns, TableElement } from "../export-word/types/ExportWord.types"

export const generateExcelColumns = (
    columns: Column[],
    exportCustomColumns?: CustomColumns
): Partial<ExcelJS.Column>[] => {
    let excelColumns = columns.map(column => ({
        header: column.title,
        key: column.field,
        width: 20
    }))

    if (exportCustomColumns) {
        exportCustomColumns.forEach((custom: CustomColumn) => {
            excelColumns = excelColumns.map(col =>
                col.key === custom.key ? { ...col, ...custom } : col
            )
        })
    }

    return excelColumns
}

export const applyHeaderStyles = (row: ExcelJS.Row, columnCount: number) => {
    row.height = 40
    row.font = { size: 12, bold: true }
    row.alignment = { vertical: 'middle', horizontal: 'center' }

    for (let i = 1; i <= columnCount; i++) {
        const cell = row.getCell(i)
        cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }
    }
}

export const applyRowStyles = (row: ExcelJS.Row, columnCount: number) => {
    row.height = 40
    row.font = { size: 12 }
    row.alignment = { vertical: 'middle', horizontal: 'center' }

    for (let i = 1; i <= columnCount; i++) {
        const cell = row.getCell(i)
        cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }
    }
}

export const generateExcelDataRows = (
    columns: Column[],
    data: TableElement[]
): Record<string, string | number>[] => {
    return data.map(element => {
        const rowData: Record<string, string | number> = {}
        columns.forEach(col => {
            const value = element[col.field]
            rowData[col.field] =
                typeof col.exportCustomCell !== 'undefined'
                    ? col.exportCustomCell(String(value), element)
                    : value ?? ''
        })
        return rowData
    })
}

export const setColumnAutoWidths = (sheet: ExcelJS.Worksheet) => {
    sheet.columns?.forEach(column => {
        let maxLength = 10
        column.eachCell?.({ includeEmpty: true }, cell => {
            const cellValue = cell.value ? String(cell.value) : ''
            maxLength = Math.max(maxLength, cellValue.length + 5)
        })
        column.width = maxLength
    })
}