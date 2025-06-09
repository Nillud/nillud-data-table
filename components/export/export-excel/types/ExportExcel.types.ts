import { ReactElement } from "react"
import { CellValue } from "exceljs"

type TableElement = {
    [key: string]: string | number
}

type TableData = Array<TableElement>

type Column = {
    field: string	// Устанавливает связь по ключу в массиве данных tableData
    title: string	// Устанавливает заголовок столбца
    width?: number	// Принимает числовое значение, ограничивает ширину столбца в пикселях
    autoinc?: boolean	// Форматирует значения в столбце по порядку в таблице, начиная с 1
    formatter?: (cell: string, row: TableElement, column: Column) => ReactElement // Кастомное форматирование, принимает в себя функцию, возвращает реакт компонент
    headerFormatter?: (column: string) => ReactElement // Кастомное форматирование заголовка таблицы, принимает в себя функцию, возвращает реакт компонент
    exportCustomCell?: (title: string, row: TableElement) => string	// Кастомное форматирование для Excel и Word, принимает в себя функцию, возвращает строку
    cellAlignment?: CellAlignment
    headerFilter?: (headerValue: string, rowValue: string) => boolean	// Кастомный фильтр, принимает в себя функуцию, вернуть должен булевое значение
    sortable?: boolean	//  Убирает возможность сортировки, по умолчанию true
    filterable?: boolean // Убирает возможность фильтрации, по умолчанию true
    selectable?: boolean
    isSelectableCell?: boolean
    filterPlaceholder?: string
    editable?: boolean
}

type ExportOptions = {
    fontSize?: number
    boldHeaders?: boolean
    autoLandscape?: boolean
    maxColumnsBeforeLandscape?: number
}

type CustomColumn = {
    header?: string
    key: string
    width?: number
    exportCustomCell?: (value: string, row: TableElement) => string | CellValue
    [key: string]: any
}

type CustomColumns = Array<CustomColumn> | null

type CellAlignment = {
    vertical: 'top' | 'middle' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
}

type ExcelExportTypes = {
    columns: Array<Column>
    excelData?: Array<TableElement>
    tableRef?: any
    titleFile: string
    title?: string
    text?: string
    exportCustomColumns?: Array<CustomColumn>
    customHeight?: number
}

export type {
    TableElement,
    TableData,
    Column,
    ExportOptions,
    ExcelExportTypes,
    CustomColumn,
    CustomColumns
}