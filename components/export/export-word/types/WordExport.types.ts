import { ReactElement } from "react"

type TableElement = {
    [key: string]: string | number
}

type TableData = Array<TableElement>

type Column = {
    field: string	// Устанавливает связь по ключу в массиве данных tableData
    title: string	// Устанавливает заголовок столбца
    width?: number	// Принимает числовое значение, ограничивает ширину столбца в пикселях
    autoinc?: boolean	// Форматирует значения в столбце по порядку в таблице, начиная с 1
    formatter?: (cell: string, row: TableElement) => ReactElement // Кастомное форматирование, принимает в себя функцию, описание далее
    exportCustomCell?: (cell: string, row: TableElement) => string	// Кастомное форматирование для Excel и Word, принимает в себя функцию, возвращает строку
    headerFilter?: (headerValue: string, rowValue: string) => string	// Кастомный фильтр, принимает в себя функуцию, описание далее
    sortable?: boolean	//  Убирает возможность сортировки, по умолчанию true
    filterable?: boolean // Убирает возможность фильтрации, по умолчанию true
}

type ExportOptions = {
    fontSize?: number
    boldHeaders?: boolean
    autoLandscape?: boolean
    maxColumnsBeforeLandscape?: number
}

type CustomColumn = {
    header: string
    key: string
    width?: number
    [key: string]: any
}

type CustomColumns = Array<CustomColumn> | null

type ExportWordTypes = {
    wordData: TableData
    columns: Array<Column>
    title: string
    options?: ExportOptions
}

export type {
    TableElement,
    TableData,
    Column,
    ExportOptions,
    ExportWordTypes,
    CustomColumn,
    CustomColumns
}