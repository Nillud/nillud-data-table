import React from 'react'
import { Column, TableData, TableElement, TableProps } from './types/DataTable.types'
import Row from '../data-table/Row'
import { groupDataBy } from './utils/groupDataBy'

type Props = {
    columns: Array<Column>
    tableData: TableData
    loading?: boolean
    scrollable?: boolean
    scrollHeight?: number
    widths?: string
    groupBy?: TableProps['groupBy']
    collapsedGroups?: Record<string, boolean>
    toggleGroup?: (groupKey: string) => void
    isTitles: TableProps['isTitles']
}

const TableBody = ({
    columns,
    tableData,
    scrollable,
    scrollHeight,
    widths,
    groupBy,
    collapsedGroups = {},
    toggleGroup,
    isTitles
}: Props) => {
    const grouped = groupBy ? groupDataBy(tableData, groupBy) : []

    if (!tableData || tableData.length === 0) {
        return (
            <div className={`ndt-table-body${scrollable ? ' ndt-table-body-scrollable' : ''}`} style={scrollable ? { height: scrollHeight } : {}}>
                <div className='ndt-table-row' style={{ height: '100%' }}>
                    <div className='ndt-row-item' style={{ margin: 'auto', padding: 20, fontWeight: 'bold' }}>Данных нет</div>
                </div>
            </div>
        )
    }

    const renderGroupedRows = () => (
        grouped.map((group, id) => (
            <React.Fragment key={`row-${group.key}-${id}`}>
                <div
                    className="ndt-group-header"
                    onClick={() => toggleGroup?.(group.key)}
                >
                    <span style={{ marginRight: 8 }}>
                        {collapsedGroups[group.key] ? '▶' : '▼'}
                    </span>
                    {group.key} ({group.items.length})
                </div>
                {!collapsedGroups[group.key] &&
                    group.items.map((element: TableElement, id: number) => (
                        <Row
                            key={`row-${group.key}-${id}`}
                            rowId={id}
                            row={element}
                            columns={columns}
                            widths={widths}
                            isTitles={isTitles}
                        />
                    ))}
            </React.Fragment>
        ))
    )

    const renderFlatRows = () => (
        tableData.map((element, id) => (
            <Row
                key={`row-${id}`}
                rowId={id}
                row={element}
                columns={columns}
                widths={widths}
            />
        ))
    )

    return (
        <div className={`ndt-table-body${scrollable ? ' ndt-table-body-scrollable' : ''}`} style={scrollable ? { height: scrollHeight } : {}}>
            {
                groupBy
                    ? renderGroupedRows()
                    : renderFlatRows()
            }
        </div>
    )
}

export default TableBody