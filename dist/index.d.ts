import React, { ReactElement } from 'react';

type TableElement = {
    id?: string | number;
    [key: string]: string | number | undefined;
};
type TableData = Array<TableElement>;
type CellAlignment = {
    vertical: 'top' | 'middle' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
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
    headerFilter?: (headerValue: string, rowValue: string, row: TableElement) => boolean;
    sortable?: boolean;
    filterable?: boolean;
    selectable?: boolean;
    isSelectableCell?: boolean;
    filterPlaceholder?: string;
    editable?: boolean;
};
type Columns = Column[];
type Events = {
    onSelect: (data: TableData) => void;
};
type TableProps = {
    tableData: TableData;
    columns: Array<Column>;
    tableName: string;
    className?: string;
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
    selectByField?: string;
    events?: Events;
};
type DataTableRef = {
    getData: () => TableData;
    getCurrentData: () => TableData;
    getSelectedData: () => TableData;
};

declare const DataTable: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<DataTableRef>>;

export { type Column, type Columns, DataTable, type DataTableRef, type TableData, type TableElement, type TableProps };
