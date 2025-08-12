import React, { memo, useMemo } from 'react'
import { Column, PaginationPage, PaginationSize, TableData, TableProps } from './types/DataTable.types'
import Row from '../data-table/Row'
import { groupDataBy } from './utils/groupDataBy'

type Props = {
    columns: Array<Column>
    tableData: TableData
    loading?: boolean
    scrollable?: boolean
    scrollHeight?: number | string
    widths?: string
    groupBy?: TableProps['groupBy']
    collapsedGroups?: Record<string, boolean>
    toggleGroup?: (groupKey: string) => void
    isTitles: TableProps['isTitles']
    selectedRows: Set<string | number>
    toggleRowSelection: (id: string | number) => void
    idIndexMap: Map<string | number, number>
    paginationSize: PaginationSize;
    paginationPage: PaginationPage;
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
    isTitles,
    selectedRows,
    toggleRowSelection,
    idIndexMap,
    paginationSize,
    paginationPage
}: Props) => {
    const grouped = useMemo(() => (
        groupBy ? groupDataBy(tableData, groupBy) : []
    ), [tableData, groupBy])

    if (!tableData || tableData.length === 0) {
        return (
            <div className={`ndt-table-body${scrollable ? ' ndt-table-body-scrollable' : ''}`} style={scrollable ? { height: scrollHeight } : {}}>
                <div className='ndt-table-row' style={{ height: '100%' }}>
                    <div className='ndt-row-item' style={{ margin: 'auto', padding: 20, fontWeight: 'bold' }}>Данных нет</div>
                </div>
            </div>
        )
    }

    const renderGroupedRows = () => {
        let currentIndex = 0

        return (
            grouped.map((group) => {
                const groupHeader = (
                    <div
                        key={`group-header-${group.key}`}
                        className="ndt-group-header"
                        onClick={() => toggleGroup?.(group.key)}
                    >
                        <span style={{ marginRight: 8 }}>
                            {collapsedGroups[group.key] ? '▶' : '▼'}
                        </span>
                        {group.key} ({group.items.length})
                    </div>
                )

                const rows = !collapsedGroups[group.key]
                    ? group.items.map((element) => {
                        const globalIndex = element.id ? idIndexMap.get(element.id) : undefined
                        if (globalIndex === undefined) return null

                        const localIndex = currentIndex++

                        const displayIndex = paginationSize === 0
                            ? localIndex
                            : paginationPage * paginationSize + localIndex

                        return (
                            <Row
                                key={`row-${group.key}-${element.id}`}
                                rowId={element.id!}
                                displayId={displayIndex}
                                row={element}
                                columns={columns}
                                widths={widths}
                                isTitles={isTitles}
                                isRowSelected={!!(element.id && selectedRows.has(element.id))}
                                onRowSelect={() => element.id && toggleRowSelection(element.id)}
                            />
                        )
                    })
                    : null

                return (
                    <React.Fragment key={`group-${group.key}`}>
                        {groupHeader}
                        {rows}
                    </React.Fragment>
                )
            })
        )
    }

    const renderFlatRows = () => {
        let currentIndex = 0

        return (
            tableData.map((element) => {
                const globalIndex = element.id ? idIndexMap.get(element.id) : undefined
                if (globalIndex === undefined) return null

                const localIndex = currentIndex++

                const displayIndex = paginationSize === 0
                    ? localIndex
                    : paginationPage * paginationSize + localIndex

                return (
                    <Row
                        key={`row-${element.id}`}
                        rowId={element.id!}
                        displayId={displayIndex}
                        row={element}
                        columns={columns}
                        widths={widths}
                        isTitles={isTitles}
                        isRowSelected={!!(element.id && selectedRows.has(element.id))}
                        onRowSelect={() => element.id && toggleRowSelection(element.id)}
                    />
                )
            })
        )
    }

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

export default memo(TableBody)
