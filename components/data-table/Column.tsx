import { useMemo } from 'react'
import { Column as ColumnType, LocalStorageData, LocalStorageSort } from './types/DataTable.types'
import SortDown from './img/SortDown'
import SortUp from './img/SortUp'

type Props = {
    column: ColumnType
    getSortField: (element: LocalStorageSort) => void
    sortBy: LocalStorageSort
    getFilters: (element: LocalStorageData) => void
    filters: LocalStorageData
}

const Column = ({ column, getSortField, sortBy, getFilters, filters }: Props) => {
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

    return (
        <div className={'ndt-column'}>
            <div className="ndt-column-head">
                <span>{column.title}</span>

                {typeof column.autoinc === 'undefined' &&
                    (typeof column.sortable === 'undefined' || column.sortable) && (
                        <div className="ndt-sorter" onClick={toggleSort}>
                            {currentSort === 'asc' ? <SortDown /> : currentSort === 'desc' ? <SortUp /> : null}
                        </div>
                    )}
            </div>

            <div className="ndt-column-footer">
                {typeof column.autoinc === 'undefined' &&
                    (typeof column.filterable === 'undefined' || column.filterable) && (
                        <input
                            type="text"
                            value={filters[column.field] ?? ''}
                            onChange={onFilterChange}
                            placeholder="Фильтр..."
                        />
                    )}
            </div>
        </div>
    )
}

export default Column