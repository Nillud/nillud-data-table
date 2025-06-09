import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactElement } from 'react';
import { CellValue } from 'exceljs';

type TableElement = {
    [key: string]: string | number;
};
type Column = {
    field: string;
    title: string;
    width?: number;
    autoinc?: boolean;
    formatter?: (cell: string, row: TableElement, column: Column) => ReactElement;
    headerFormatter?: (column: string) => ReactElement;
    exportCustomCell?: (title: string, row: TableElement) => string;
    cellAlignment?: CellAlignment;
    headerFilter?: (headerValue: string, rowValue: string) => boolean;
    sortable?: boolean;
    filterable?: boolean;
    selectable?: boolean;
    isSelectableCell?: boolean;
    filterPlaceholder?: string;
    editable?: boolean;
};
type CustomColumn = {
    header?: string;
    key: string;
    width?: number;
    exportCustomCell?: (value: string, row: TableElement) => string | CellValue;
    [key: string]: any;
};
type CellAlignment = {
    vertical: 'top' | 'middle' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
};
type ExcelExportTypes = {
    columns: Array<Column>;
    excelData?: Array<TableElement>;
    tableRef?: any;
    titleFile: string;
    title?: string;
    text?: string;
    exportCustomColumns?: Array<CustomColumn>;
    customHeight?: number;
};

declare const ExportExcel: ({ columns, excelData, tableRef, titleFile, title, text, exportCustomColumns, customHeight }: ExcelExportTypes) => react_jsx_runtime.JSX.Element;

export { type ExcelExportTypes, ExportExcel };
