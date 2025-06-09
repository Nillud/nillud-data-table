import { applyHeaderStyles, applyRowStyles, generateExcelColumns, generateExcelDataRows, setColumnAutoWidths } from './exportUtils'
import ExcelJS from 'exceljs'
import { ExcelExportTypes, TableElement } from './types/ExportExcel.types'

const ExportExcel = ({ columns, excelData, tableRef, titleFile, title, text, exportCustomColumns, customHeight }: ExcelExportTypes) => {
    const exportExcel = async () => {
        const tableData = excelData || tableRef.current.getData() as Array<TableElement>

        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet(titleFile, {
            pageSetup: {
                fitToPage: true,
                fitToHeight: 2,
                fitToWidth: 1,
                orientation:
                    "landscape"
            },
            headerFooter: {
                oddFooter: "Страница &P из &N",
                evenFooter: 'Страница &P из &N'
            }
        })
        sheet.properties.defaultRowHeight = 20

        let tableHeaderRow = 1

        if (title) {
            sheet.getCell('A1').value = title
            sheet.getRow(1).height = 25
            sheet.getRow(1).alignment = { vertical: 'middle' }
            sheet.getCell('A1').font = {
                size: 18,
                bold: true
            }
            tableHeaderRow++
        }

        if (text) {
            sheet.getCell('A2').value = text
            sheet.getRow(2).height = 15
            sheet.getRow(2).alignment = { vertical: 'middle' }
            sheet.getCell('A2').font = {
                size: 12,
            }
            tableHeaderRow++
        }

        if (title || text) tableHeaderRow++

        const excelColumns = generateExcelColumns(columns, exportCustomColumns)
        sheet.columns = excelColumns

        const headerRow = sheet.getRow(tableHeaderRow)
        headerRow.values = excelColumns.map(col => col.title as string)
        applyHeaderStyles(headerRow, sheet.columns.length)

        const dataRows = generateExcelDataRows(columns, tableData)
        dataRows.forEach((data) => {
            const row = sheet.addRow(data)
            applyRowStyles(row, sheet.columns.length, customHeight, columns)
        })

        setColumnAutoWidths(sheet)

        if (tableData.length > 15) {
            sheet.pageSetup.fitToHeight = Math.floor(tableData.length / 15)
        } else {
            sheet.pageSetup.fitToHeight = 1
        }

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url
            anchor.download = `${titleFile}.xlsx`
            anchor.click()
            window.URL.revokeObjectURL(url)
        })
    }

    return (
        <button className={`ndt-buttonExport ndt-Excel`} onClick={exportExcel}>
            Скачать Excel
        </button>
    )
}

export default ExportExcel