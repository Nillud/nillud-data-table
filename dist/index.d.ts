import React, { ReactElement } from 'react';

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
};
type DataTableRef = {
    getData: () => TableData;
    getCurrentData: () => TableData;
};

declare const DataTable: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<DataTableRef>>;

export { type Column, DataTable, type TableElement, type TableProps };
