import { Column, TableElement, TableProps } from '../../types/DataTable.types'
import { applyHeaderStyles, applyRowStyles, generateExcelColumns, generateExcelDataRows, setColumnAutoWidths } from '../../utils/exportUtils/exportUtils'
import ExcelJS from 'exceljs'

type Props = {
    columns: Array<Column>
    excelData: Array<TableElement>
    title: string
    exportCustomColumns: TableProps["exportCustomColumns"]
}

const ExportExcel = ({ columns, excelData, title, exportCustomColumns }: Props) => {
    const exportExcel = () => {
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