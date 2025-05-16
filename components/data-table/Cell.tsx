import { Column, TableElement, TableProps } from './types/DataTable.types'

type Props = {
    row: TableElement
    column: Column
    // rowId: number
    displayId: number
    isTitles: TableProps['isTitles']
    isRowSelected?: boolean
    onRowSelect?: () => void
}

const Cell = ({
    row,
    column,
    // rowId,
    displayId,
    isTitles,
    isRowSelected,
    onRowSelect
}: Props) => {
    const rawValue = row[column.field]
    const stringValue = typeof rawValue !== 'undefined' && rawValue !== null ? String(rawValue) : ''

    const content = column.formatter
        ? column.formatter(stringValue, row, column)
        : column.autoinc
            ? <span>{displayId + 1}</span>
            : <span>{stringValue}</span>

    const renderCell = () => (
        <div
            className='ndt-cell'
            title={isTitles && stringValue ? stringValue : ''}
        >
            {content}
        </div>
    )

    const renderSelectableCell = () => (
        <div className="ndt-cell ndt-checkbox-cell">
            <input type="checkbox" checked={!!isRowSelected} onChange={onRowSelect} />
        </div>
    )

    return (
        <>
            {
                column.selectable
                    ? renderSelectableCell()
                    : renderCell()
            }
        </>
    )
}

export default Cell