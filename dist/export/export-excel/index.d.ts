import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactElement } from 'react';

type TableElement = {
    [key: string]: string | number;
};
type TableData = Array<TableElement>;
type Column = {
    field: string;
    title: string;
    width?: number;
    autoinc?: boolean;
    formatter?: (cell: string, row: TableElement) => ReactElement;
    exportCustomCell?: (cell: string, row: TableElement) => string;
    headerFilter?: (headerValue: string, rowValue: string) => string;
    sortable?: boolean;
    filterable?: boolean;
};
type CustomColumn = {
    header: string;
    key: string;
    width?: number;
    [key: string]: any;
};
type CustomColumns = Array<CustomColumn> | null;
type ExcelExportTypes = {
    columns: Array<Column>;
    excelData: TableData;
    title: string;
    exportCustomColumns?: CustomColumns;
};

declare const ExportExcel: ({ columns, excelData, title, exportCustomColumns }: ExcelExportTypes) => react_jsx_runtime.JSX.Element;

export { type ExcelExportTypes, ExportExcel };
