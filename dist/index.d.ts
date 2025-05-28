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
    formatter?: (cell: string, row: TableElement, column: Column) => ReactElement;
    headerFormatter?: (column: string) => ReactElement;
    exportCustomCell?: (title: string, row: TableElement) => string;
    headerFilter?: (headerValue: string, rowValue: string) => boolean;
    sortable?: boolean;
    filterable?: boolean;
    selectable?: boolean;
    isSelectableCell?: boolean;
    filterPlaceholder?: string;
    editable?: boolean;
};
type Columns = Column[];
type TableProps = {
    tableData: TableData;
    columns: Array<Column>;
    tableName: string;
    loading?: boolean;
    loadingElement?: ReactElement | null;
    isFooter?: boolean;
    paginationCounts?: Array<number> | null;
    scrollable?: boolean;
    scrollHeight?: number | string;
    headerGroup?: Array<{
        title: string;
        cols: number;
    }> | null;
    groupBy?: string | null;
    isTitles?: boolean;
};
type DataTableRef = {
    getData: () => TableData;
    getCurrentData: () => TableData;
    getSelectedData: () => TableData;
};

declare const DataTable: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<DataTableRef>>;

export { type Column, type Columns, DataTable, type DataTableRef, type TableData, type TableElement, type TableProps };
