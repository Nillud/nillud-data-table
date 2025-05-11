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
type ExportOptions = {
    fontSize?: number;
    boldHeaders?: boolean;
    autoLandscape?: boolean;
    maxColumnsBeforeLandscape?: number;
};
type ExportSectionTypes = {
    wordBtn: boolean;
    excelBtn: boolean;
    downloadSectionLeftSideContent: ReactElement | null;
    tableData: TableData;
    columns: Array<Column>;
    tableName: string;
    exportCustomColumns?: Array<{
        header: string;
        key: string;
        width: number;
    }> | null;
    wordOptions?: ExportOptions;
};
type ExcelExportTypes = {
    columns: Array<Column>;
    excelData: TableData;
    title: string;
    exportCustomColumns: ExportSectionTypes["exportCustomColumns"];
};
type ExportWordTypes = {
    wordData: TableData;
    columns: Array<Column>;
    title: string;
    options?: ExportOptions;
};

declare const ExportExcel: ({ columns, excelData, title, exportCustomColumns }: ExcelExportTypes) => react_jsx_runtime.JSX.Element;

declare const WordExport: ({ wordData, columns, title, options }: ExportWordTypes) => react_jsx_runtime.JSX.Element;

declare const ExportSection: ({ wordBtn, excelBtn, downloadSectionLeftSideContent, tableData, columns, tableName, exportCustomColumns, wordOptions }: ExportSectionTypes) => react_jsx_runtime.JSX.Element;

export { type ExcelExportTypes, ExportExcel, ExportSection, type ExportSectionTypes, type ExportWordTypes, WordExport };
