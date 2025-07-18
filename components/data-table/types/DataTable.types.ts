import { ReactElement } from "react"

type TableElement = {
    [key: string]: string | number
}

type TableData = Array<TableElement>

type CellAlignment = {
    vertical: 'top' | 'middle' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
}

type Column = {
    field: string	// Устанавливает связь по ключу в массиве данных tableData
    title: string	// Устанавливает заголовок столбца
    width?: number	// Принимает числовое значение, ограничивает ширину столбца в пикселях
    autoinc?: boolean	// Форматирует значения в столбце по порядку в таблице, начиная с 1
    formatter?: (cell: string, row: TableElement, column: Column) => ReactElement // Кастомное форматирование, принимает в себя функцию, возвращает реакт компонент
    headerFormatter?: (column: string) => ReactElement // Кастомное форматирование заголовка таблицы, принимает в себя функцию, возвращает реакт компонент
    exportCustomCell?: (title: string, row: TableElement) => string	// Кастомное форматирование для Excel и Word, принимает в себя функцию, возвращает строку
    cellAlignment?: CellAlignment
    headerFilter?: (headerValue: string, rowValue: string, row: TableElement) => boolean	// Кастомный фильтр, принимает в себя функуцию, вернуть должен булевое значение
    sortable?: boolean	//  Убирает возможность сортировки, по умолчанию true
    filterable?: boolean // Убирает возможность фильтрации, по умолчанию true
    selectable?: boolean
    isSelectableCell?: boolean
    filterPlaceholder?: string
    editable?: boolean
}

type Columns = Column[]

type ExportOptions = {
    fontSize?: number
    boldHeaders?: boolean
    autoLandscape?: boolean
    maxColumnsBeforeLandscape?: number
}

type TableProps = {
    tableData: TableData
    columns: Array<Column>
    tableName: string	// Наименование таблицы для хранения значений в localStorage
    loading?: boolean	// Состояние загрузки, принимает в себя state типа boolean
    loadingElement?: ReactElement | null
    isFooter?: boolean	// Отображение footer
    paginationCounts?: Array<number> | null	// Принимает массив чисел, число - количество строк для пагинации
    scrollable?: boolean	// Зафиксировать высоту таблицы и добавить скролл
    scrollHeight?: number | string	// Высота тела таблицы, работает, если scrollable: true
    headerGroup?: Array<{
        title: string,
        cols: number
    }> | null // Добавляет группировку заголовков (заголовок - title, растягивается на cols - столбцов)
    groupBy?: string | null // Добавляет группировку по полю (groupBy = column.field)
    isTitles?: boolean // Добавляет html title в ячейки, по умолчанию column.title
}

type LocalStorageData = {
    [key: string]: string | number | undefined
}

type LocalStorageSort = {
    col: string
    type: 'asc' | 'desc'
}

type PaginationSize = number

type PaginationPage = number

type DataTableRef = {
    getData: () => TableData
    getCurrentData: () => TableData
    getSelectedData: () => TableData
}

export type { TableElement, TableData, Column, Columns, TableProps, LocalStorageData, LocalStorageSort, PaginationSize, PaginationPage, ExportOptions, DataTableRef }