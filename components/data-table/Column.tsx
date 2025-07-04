import { memo, useMemo } from 'react'
import { Column as ColumnType, LocalStorageData, LocalStorageSort, TableData } from './types/DataTable.types'
import SortDown from './img/SortDown'
import SortUp from './img/SortUp'

type Props = {
    column: ColumnType
    getSortField: (element: LocalStorageSort) => void
    sortBy: LocalStorageSort
    getFilters: (element: LocalStorageData) => void
    filters: LocalStorageData
    selectedRows: Set<number>
    toggleAllSelection: () => void
    displayData: TableData
}

const Column = ({ column, getSortField, sortBy, getFilters, filters, selectedRows, toggleAllSelection, displayData }: Props) => {
    const currentSort = useMemo(() => {
        return sortBy.col === column.field ? sortBy.type : null
    }, [sortBy, column.field])

    const toggleSort = () => {
        const nextType = currentSort === 'asc' ? 'desc' : 'asc'
        getSortField({ col: column.field, type: nextType })
    }

    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        getFilters({ ...filters, [column.field]: e.target.value })
    }

    const renderSelectable = () => {
        return <div className="ndt-column ndt-checkbox-column">
            <input
                type="checkbox"
                checked={selectedRows.size === displayData.length && displayData.length > 0}
                onChange={toggleAllSelection}
            />
        </div>
    }

    const renderColumnHead = () => {
        if (column.headerFormatter) {
            return column.headerFormatter(column.title)
        }

        return <span title={`${column.title}`}>{column.title}</span>
    }

    const renderColumnSort = () => {
        if (typeof column.autoinc === 'undefined' && (typeof column.sortable === 'undefined' || column.sortable)) {
            return <div className="ndt-sorter" role='button' tabIndex={1} onClick={toggleSort}>
                {currentSort === 'asc'
                    ? <SortDown />
                    : currentSort === 'desc'
                        ? <SortUp />
                        : <SortDown />
                }
            </div>
        }

        return <></>
    }

    return (
        <>
            {
                column.selectable
                    ? renderSelectable()
                    : <div className={'ndt-column'}>
                        <div className="ndt-column-head">
                            {renderColumnHead()}
                            {renderColumnSort()}
                        </div>

                        <div className="ndt-column-footer">
                            {typeof column.autoinc === 'undefined' &&
                                (typeof column.filterable === 'undefined' || column.filterable) && (
                                    <input
                                        type="text"
                                        value={filters[column.field] ?? ''}
                                        onChange={onFilterChange}
                                        placeholder={column.filterPlaceholder || ''}
                                    />
                                )}
                        </div>
                    </div>
            }
        </>
    )
}

export default memo(Column)