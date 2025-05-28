import { PropsWithChildren } from 'react'
import { Column, TableElement, TableProps } from './types/DataTable.types'

type Props = {
    row: TableElement
    column: Column
    // rowId: number
    displayId: number
    isTitles: TableProps['isTitles']
    isRowSelected?: boolean
    onRowSelect?: () => void
    isSelectable?: boolean
}

const Cell = ({
    row,
    column,
    // rowId,
    displayId,
    isTitles,
    isRowSelected,
    onRowSelect,
    isSelectable
}: Props) => {
    const rawValue = row[column.field]
    const stringValue = typeof rawValue !== 'undefined' && rawValue !== null ? String(rawValue) : ''

    const isAutoinc = !!column.autoinc
    const isFormatted = typeof column.formatter !== 'undefined'
    const isEditable = !!column.editable
    const isColumnSelectable = !!column.selectable

    const formattedContent = column.formatter && column.formatter(stringValue, row, column)

    const CellWithData = ({ children }: PropsWithChildren) => (
        <div
            className='ndt-cell'
            title={isTitles && stringValue ? stringValue : ''}
            onClick={
                isSelectable && (
                    typeof column.isSelectableCell === 'undefined'
                    || column.isSelectableCell
                    || column.editable
                )
                    ? onRowSelect
                    : () => { }
            }
        >
            {children}
        </div>
    )

    const EditableCell = () => (
        <input
            className='ndt-cell ndt-cell-editable'
            defaultValue={stringValue ? String(stringValue) : ''}
            onChange={(e) => {
                row[column.field] = e.target.value
            }}
        />
    )

    const SelectableCell = () => (
        <div className="ndt-cell ndt-checkbox-cell" onClick={onRowSelect}>
            <input type="checkbox" checked={!!isRowSelected} onChange={() => { }} />
        </div>
    )

    switch (true) {
        case isAutoinc:
            return <CellWithData>{displayId + 1}</CellWithData>
        case isFormatted:
            return <CellWithData>{formattedContent}</CellWithData>
        case isEditable:
            return <EditableCell />
        case isColumnSelectable:
            return <SelectableCell />
        default:
            return <CellWithData>{stringValue}</CellWithData>
    }
}

export default Cell