import React$1, { ReactElement } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

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
type TableProps = {
    tableData: TableData;
    columns: Array<Column>;
    tableName: string;
    loading?: boolean;
    loadingElement?: ReactElement | null;
    isFooter?: boolean;
    paginationCounts?: Array<number> | null;
    scrollable?: boolean;
    scrollHeight?: number;
    exportCustomColumns?: Array<{
        header: string;
        key: string;
        width: number;
    }> | null;
    excelBtn?: boolean;
    wordBtn?: boolean;
    downloadSectionLeftSideContent?: ReactElement | null;
    headerGroup?: Array<{
        title: string;
        cols: number;
    }> | null;
    groupBy?: string | null;
    isTitles?: boolean;
    wordOptions?: ExportOptions;
    WordExportComponent?: React.ComponentType<{
        wordData: TableData;
        columns: Array<Column>;
        title: string;
        options?: ExportOptions;
        exportCustomColumns?: TableProps["exportCustomColumns"];
    }>;
    ExportExcelComponent?: React.ComponentType<{
        excelData: TableData;
        columns: Array<Column>;
        title: string;
        exportCustomColumns?: TableProps["exportCustomColumns"];
    }>;
};
type DataTableRef = {
    getData: () => TableData;
    getCurrentData: () => TableData;
};

declare const DataTable: React$1.ForwardRefExoticComponent<TableProps & React$1.RefAttributes<DataTableRef>>;

type Props$1 = {
    wordData: TableData;
    columns: Array<Column>;
    title: string;
    options?: ExportOptions;
    exportCustomColumns?: TableProps["exportCustomColumns"];
};
declare const WordExport: ({ wordData, columns, title, options }: Props$1) => react_jsx_runtime.JSX.Element;

type Props = {
    columns: Array<Column>;
    excelData: Array<TableElement>;
    title: string;
    exportCustomColumns: TableProps["exportCustomColumns"];
};
declare const ExportExcel: ({ columns, excelData, title, exportCustomColumns }: Props) => react_jsx_runtime.JSX.Element;

export { type Column, DataTable, ExportExcel, type TableElement, type TableProps, WordExport };
