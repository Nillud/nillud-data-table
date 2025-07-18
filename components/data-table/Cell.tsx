import { CSSProperties, memo, PropsWithChildren, useMemo } from 'react'
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

type CellVerticalAlignment = {
    [key in 'top' | 'middle' | 'bottom']: CSSProperties
}

type CellHorizontalAlignment = {
    [key in 'left' | 'center' | 'right']: CSSProperties
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

    const formattedContent = useMemo(() => (
        column.formatter?.(stringValue, row, column)
    ), [column.formatter, stringValue, row, column])

    const cellVerticalAlignment: CellVerticalAlignment = {
        'top': { alignItems: 'flex-start' },
        'middle': { alignItems: 'center' },
        'bottom': { alignItems: 'flex-end' }
    }

    const cellHorizontalAlignment: CellHorizontalAlignment = {
        'left': { justifyContent: 'flex-start' },
        'center': { justifyContent: 'center' },
        'right': { justifyContent: 'flex-end' }
    }

    const CellWithData = ({ children }: PropsWithChildren) => (
        <div
            className='ndt-cell'
            title={isTitles && stringValue ? stringValue : ''}
            style={
                column.cellAlignment
                    ? {
                        ...cellVerticalAlignment[column.cellAlignment.vertical],
                        ...cellHorizontalAlignment[column.cellAlignment.horizontal]
                    }
                    : {}
            }
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

    if (isAutoinc) return <CellWithData>{displayId + 1}</CellWithData>
    if (isFormatted) return <CellWithData>{formattedContent}</CellWithData>
    if (isEditable) return <EditableCell />
    if (isColumnSelectable) return <SelectableCell />
    return <CellWithData>{stringValue}</CellWithData>
}

export default memo(Cell)