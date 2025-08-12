import { Column, TableElement, TableProps } from './types/DataTable.types'
import Cell from './Cell'
import { memo } from 'react'

type Props = {
    rowId: string | number
    displayId: number
    row: TableElement
    columns: Array<Column>
    widths?: string
    isTitles?: TableProps['isTitles']
    isRowSelected?: boolean
    onRowSelect?: () => void
}

const Row = ({
    rowId,
    displayId,
    columns,
    row,
    widths,
    isTitles,
    isRowSelected,
    onRowSelect
}: Props) => {
    const isSelectable = columns.find(element => element.selectable)

    return (
        <div
            className={`ndt-table-row ${isSelectable && 'ndt-table-row-selectable'} ${isRowSelected && 'ndt-table-row-selected'}`}
            style={{ gridTemplateColumns: widths }}
        >
            {columns.map((column, id) => (
                <Cell
                    key={`cell-${rowId}-${id}`}
                    row={row}
                    column={column}
                    displayId={displayId}
                    isTitles={isTitles}
                    isRowSelected={isRowSelected}
                    onRowSelect={onRowSelect}
                    isSelectable={!!isSelectable}
                />
            ))}
        </div>
    )
}

export default memo(Row)
