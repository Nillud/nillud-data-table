import React, { useImperativeHandle, useEffect, useState, useCallback, useMemo, forwardRef, useRef } from 'react'
import { DataTableRef, LocalStorageData, LocalStorageSort, PaginationPage, PaginationSize, TableElement, TableProps, TableData } from './types/DataTable.types'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import { filterData, sortData } from './utils/sort-data'
import { useDebouncedEffect } from './utils/useDebouncedEffect'
import { v4 as uuidv4 } from 'uuid'

const DataTable = forwardRef<DataTableRef, TableProps>(({
    tableData,
    columns,
    tableName = 'table-data',
    loading = false,
    loadingElement = null,
    isFooter = false,
    paginationCounts = null,
    scrollable = false,
    scrollHeight = 300,
    headerGroup = null,
    groupBy = null,
    isTitles = false,
}: TableProps, ref) => {
    const idMapRef = useRef<Map<TableElement, string | number>>(new Map())

    const dataWithIds = useMemo(() => {
        return tableData.map((row) => {
            if (typeof row.id !== 'undefined' && row.id !== null) return row

            const existing = idMapRef.current.get(row)
            if (existing) return { ...row, id: existing }

            const newId = uuidv4()
            idMapRef.current.set(row, newId)

            return { ...row, id: newId }
        })
    }, [tableData])

    const [filters, setFilters] = useState<LocalStorageData>({})
    const [sortBy, setSortBy] = useState<LocalStorageSort>({ col: '', type: 'asc' })

    const [paginationSize, setPaginationSize] = useState<PaginationSize>(paginationCounts?.[0] || 0)
    const [paginationPage, setPaginationPage] = useState<PaginationPage>(0)

    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())

    const widths = useMemo(() => {
        return columns.map(c => c.width ? `${c.width}px` : '1fr').join(' ')
    }, [columns])

    const loadFromLocalStorage = useCallback(() => {
        try {
            const s = localStorage.getItem(`${tableName}-sort-by`)
            const f = localStorage.getItem(`${tableName}-filters`)
            const c = localStorage.getItem(`${tableName}-counts`)
            // const p = localStorage.getItem(`${tableName}-page`)
            if (s) setSortBy(JSON.parse(s))
            if (f) setFilters(JSON.parse(f))
            if (c) setPaginationSize(c === 'all' ? 0 : Number(c))
            // if (p) setPaginationPage(Number(p))
        } catch (e) {
            console.error('Error parsing localStorage data:', e)
            setSortBy({ col: '', type: 'asc' })
            setFilters({})
            setPaginationSize(paginationCounts?.[0] || 0)
            setPaginationPage(0)
        }
    }, [tableName, paginationCounts])

    useEffect(() => {
        loadFromLocalStorage()
    }, [loadFromLocalStorage])

    // Обработка данных (фильтрация + сортировка) — работаем с dataWithIds
    const processedData: TableData = useMemo(() => {
        let result = [...dataWithIds]

        const columnMap = new Map(columns.map(col => [col.field, col]))

        for (const field in filters) {
            const filterValue = String(filters[field])
            if (filterValue === '') continue

            const column = columnMap.get(field)
            if (!column) continue

            result = column.headerFilter
                ? result.filter(e => column.headerFilter!(filterValue, String(e[field]), e))
                : filterData(result, field, filterValue)
        }

        if (sortBy.col) {
            result = sortData(result, sortBy.col, sortBy.type)
        }

        return result
    }, [dataWithIds, filters, sortBy, columns])

    // Пагинация
    const displayData = useMemo(() => {
        if (paginationSize === 0) return processedData
        const start = paginationPage * paginationSize
        return processedData.slice(start, start + paginationSize)
    }, [processedData, paginationPage, paginationSize])

    // id -> индекс в исходном (dataWithIds)
    const idIndexMap = useMemo(() => {
        const map = new Map<string | number, number>()
        dataWithIds.forEach((row, i) => {
            if (typeof row.id !== 'undefined') map.set(row.id, i)
        })
        return map
    }, [dataWithIds])

    const toggleRowSelection = (id: string | number) => {
        setSelectedRows(prev => {
            const updated = new Set(prev)
            if (updated.has(id)) {
                updated.delete(id)
            } else {
                updated.add(id)
            }
            return updated
        })
    }

    const toggleAllSelection = useCallback(() => {
        const allSelected = processedData.every(r => typeof r.id !== 'undefined' && selectedRows.has(r.id))
        if (allSelected) {
            setSelectedRows(new Set())
        } else {
            setSelectedRows(new Set(processedData.map(r => r.id!)))
        }
    }, [processedData, selectedRows])

    const toggleGroup = (groupKey: string) => {
        setCollapsedGroups(prev => ({
            ...prev,
            [groupKey]: !prev[groupKey],
        }))
    }

    useEffect(() => {
        if (Object.values(filters).some(value => {
            return value !== null && value !== undefined && value !== '';
        })) setPaginationPage(0)
    }, [filters])

    useDebouncedEffect(() => {
        localStorage.setItem(`${tableName}-filters`, JSON.stringify(filters))
    }, [filters, tableName], 500)

    useDebouncedEffect(() => {
        localStorage.setItem(`${tableName}-sort-by`, JSON.stringify(sortBy))
    }, [sortBy, tableName], 500)

    useImperativeHandle(ref, () => ({
        getData: () => processedData,
        getCurrentData: () => displayData,
        getSelectedData: () => processedData.filter(row => typeof row.id !== 'undefined' && selectedRows.has(row.id))
    }), [processedData, displayData, selectedRows]);

    return (
        <div className="ndt-table-container">
            <div className="ndt-table">
                <TableHeader
                    columns={columns}
                    sortBy={sortBy}
                    getSortField={setSortBy}
                    filters={filters}
                    getFilters={setFilters}
                    widths={widths}
                    headerGroup={headerGroup}
                    selectedRows={selectedRows}
                    toggleAllSelection={toggleAllSelection}
                    displayData={processedData}
                />

                {loading
                    ? loadingElement !== null
                        ? loadingElement
                        : <span style={{ marginLeft: 10, fontWeight: 'bold' }}>Загрузка данных...</span>
                    : <TableBody
                        tableData={displayData}
                        columns={columns}
                        scrollable={scrollable}
                        scrollHeight={scrollHeight}
                        widths={widths}
                        groupBy={groupBy}
                        collapsedGroups={collapsedGroups}
                        toggleGroup={toggleGroup}
                        isTitles={isTitles}
                        selectedRows={selectedRows}
                        toggleRowSelection={toggleRowSelection}
                        idIndexMap={idIndexMap}
                        paginationSize={paginationSize}
                        paginationPage={paginationPage}
                    />
                }

                {isFooter && (
                    <TableFooter
                        paginationCounts={paginationCounts}
                        tableData={processedData}
                        paginationSize={paginationSize}
                        getPaginationSize={setPaginationSize}
                        paginationPage={paginationPage}
                        getPaginationPage={setPaginationPage}
                    />
                )}
            </div>
        </div>
    )
})

DataTable.displayName = 'DataTable';

export default DataTable
