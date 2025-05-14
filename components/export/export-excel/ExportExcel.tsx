import { applyHeaderStyles, applyRowStyles, generateExcelColumns, generateExcelDataRows, setColumnAutoWidths } from './exportUtils'
import ExcelJS from 'exceljs'
import { ExcelExportTypes } from './types/ExportExcel.types'

const ExportExcel = ({ columns, excelData, title, exportCustomColumns }: ExcelExportTypes) => {
    const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet(title, {
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

        const excelColumns = generateExcelColumns(columns, exportCustomColumns)
        sheet.columns = excelColumns

        const headerRow = sheet.getRow(1)
        applyHeaderStyles(headerRow, sheet.columns.length)

        const dataRows = generateExcelDataRows(columns, excelData)
        dataRows.forEach((data) => {
            const row = sheet.addRow(data)
            applyRowStyles(row, sheet.columns.length)
        })

        setColumnAutoWidths(sheet)

        if (excelData.length > 15) {
            sheet.pageSetup.fitToHeight = Math.floor(excelData.length / 15)
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
            anchor.download = `${title}.xlsx`
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