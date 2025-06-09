// exportUtils.ts
import ExcelJS from 'exceljs'
import { Column, CustomColumn, TableElement } from './types/ExportExcel.types'

export const generateExcelColumns = (
    columns: Column[],
    exportCustomColumns?: Array<CustomColumn>
) => {
    let excelColumns = columns.filter(column => column.title !== '').map(column => ({
        title: column.title,
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

export const applyRowStyles = (row: ExcelJS.Row, columnCount: number, height = 40, columns: Column[]) => {
    row.height = height
    row.font = { size: 12 }
    row.alignment = { vertical: 'middle', horizontal: 'center' }

    for (let i = 1; i <= columnCount; i++) {
        const cell = row.getCell(i)
        const column = columns[i - 1]

        cell.alignment = {
            wrapText: true,
            vertical: column.cellAlignment ? column.cellAlignment.vertical : 'middle',
            horizontal: column.cellAlignment ? column.cellAlignment.horizontal : 'center'
        }
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
    data: TableElement[],
    exportCustomColumns?: CustomColumn[]
): (string | number | ExcelJS.CellValue)[][] => {
    return data.map((element, rowIndex) => {
        return columns.map((col, colIndex) => {
            const isAutoinc = col.autoinc;

            if (isAutoinc) return rowIndex + 1;

            const value = element[col.field];

            // Проверка: есть ли кастомная колонка с таким ключом?
            const customCol = exportCustomColumns?.find(custom => custom.key === col.field);
            if (customCol?.exportCustomCell) {
                return customCol.exportCustomCell(String(value ?? ''), element);
            }

            if (typeof col.exportCustomCell !== 'undefined') {
                return col.exportCustomCell(String(value ?? ''), element);
            }

            return value ?? '';
        });
    });
};


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