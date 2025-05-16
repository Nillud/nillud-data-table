import React from 'react'
import { Column as ColumnType, LocalStorageData, LocalStorageSort, TableData, TableProps } from './types/DataTable.types'
import Column from './Column'

type Props = {
  columns: Array<ColumnType>
  sortBy: LocalStorageSort
  getSortField: (element: LocalStorageSort) => void
  getFilters: (element: LocalStorageData) => void
  filters: LocalStorageData
  widths?: string
  headerGroup: TableProps['headerGroup']
  selectedRows: Set<number>
  toggleAllSelection: () => void
  displayData: TableData
}

const Header = ({ columns, getSortField, sortBy, getFilters, filters, widths, headerGroup, selectedRows, toggleAllSelection, displayData }: Props) => {
  const renderHeaderGroup = () => (
    headerGroup && (
      <div className={"ndt-table-columns"} style={{ gridTemplateColumns: widths || 'auto' }}>
        {headerGroup.map((col, id) => (
          <div key={`header-group-${id}`} className={'ndt-column'} style={{ gridColumn: `span ${col.cols || 1}` }}>
            <div className="ndt-column-head">
              <span>{col.title}</span>
            </div>
          </div>
        ))}
      </div>
    )
  )

  const renderColumns = () => (
    columns && columns.length > 0
      ? columns.map((column, id) => (
        <Column
          key={`column-${id}`}
          column={column}
          getSortField={getSortField}
          sortBy={sortBy}
          getFilters={getFilters}
          filters={filters}
          selectedRows={selectedRows}
          toggleAllSelection={toggleAllSelection}
          displayData={displayData}
        />
      ))
      : <div className={'ndt-data-error'}>Ошибка: columns is undefined</div>
  )
  return (
    <>
      {renderHeaderGroup()}

      <div className={"ndt-table-columns"} style={{ gridTemplateColumns: widths || 'auto' }}>
        {renderColumns()}
      </div>
    </>
  )
}

export default React.memo(Header)