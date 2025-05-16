import { Column, TableElement, TableProps } from './types/DataTable.types'
import Cell from './Cell'

type Props = {
    rowId: number
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
    return (
        <div className={'ndt-table-row'} style={{ gridTemplateColumns: widths }}>
            {columns.map((column, id) => (
                <Cell
                    key={`cell-${rowId}-${id}`}
                    row={row}
                    column={column}
                    // rowId={rowId}
                    displayId={displayId}
                    isTitles={isTitles}
                    isRowSelected={isRowSelected}
                    onRowSelect={onRowSelect}
                />
            ))}
        </div>
    )
}

export default Row