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
type ExportWordTypes = {
    wordData: TableData;
    columns: Array<Column>;
    title: string;
    options?: ExportOptions;
};

declare const WordExport: ({ wordData, columns, title, options }: ExportWordTypes) => react_jsx_runtime.JSX.Element;

export { type ExportWordTypes, WordExport };
