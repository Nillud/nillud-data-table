import React, { useImperativeHandle, useEffect, useState, useCallback, useMemo, forwardRef } from 'react'
import { DataTableRef, LocalStorageData, LocalStorageSort, PaginationPage, PaginationSize, TableProps } from './types/DataTable.types'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import { filterData, sortData } from './utils/sort-data'
import { useDebouncedEffect } from './utils/useDebouncedEffect'
// import ExportSection from './ExportSection'

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
    const [filters, setFilters] = useState<LocalStorageData>({})
    const [sortBy, setSortBy] = useState<LocalStorageSort>({ col: '', type: 'asc' })

    const [paginationSize, setPaginationSize] = useState<PaginationSize>(paginationCounts?.[0] || 0)
    const [paginationPage, setPaginationPage] = useState<PaginationPage>(0)

    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

    const toggleGroup = (groupKey: string) => {
        setCollapsedGroups(prev => ({
            ...prev,
            [groupKey]: !prev[groupKey],
        }))
    }

    // const [widths, setWidths] = useState<string>('1fr')

    const widths = useMemo(() => {
        return columns.map(c => c.width ? `${c.width}px` : '1fr').join(' ')
    }, [columns])

    const loadFromLocalStorage = useCallback(() => {
        try {
            const s = localStorage.getItem(`${tableName}-sort-by`)
            const f = localStorage.getItem(`${tableName}-filters`)
            const c = localStorage.getItem(`${tableName}-counts`)
            const p = localStorage.getItem(`${tableName}-page`)
            if (s) setSortBy(JSON.parse(s))
            if (f) setFilters(JSON.parse(f))
            if (c) setPaginationSize(c === 'all' ? 0 : Number(c))
            if (p) setPaginationPage(Number(p))
        } catch (e) {
            console.error('Error parsing localStorage data:', e)
            setSortBy({ col: '', type: 'asc' })
            setFilters({})
            setPaginationSize(paginationCounts?.[0] || 10)
            setPaginationPage(0)
        }
    }, [tableName, paginationCounts])

    useEffect(() => {
        loadFromLocalStorage()
    }, [loadFromLocalStorage])

    // Обработка данных (фильтрация + сортировка)
    const processedData = useMemo(() => {
        let result = [...tableData]

        const columnMap = new Map(columns.map(col => [col.field, col]))

        for (const field in filters) {
            const filterValue = String(filters[field])
            if (filterValue === '') continue

            const column = columnMap.get(field)
            if (!column) continue

            result = column.headerFilter
                ? result.filter(e => column.headerFilter!(filterValue, String(e[field])))
                : filterData(result, field, filterValue)
        }

        if (sortBy.col) {
            result = sortData(result, sortBy.col, sortBy.type)
        }

        return result
    }, [tableData, filters, sortBy, columns])

    // Пагинация
    const displayData = useMemo(() => {
        if (paginationSize === 0) return processedData
        const start = paginationPage * paginationSize
        return processedData.slice(start, start + paginationSize)
    }, [processedData, paginationPage, paginationSize])

    // Сброс страницы при изменении фильтров/сортировки
    useEffect(() => {
        setPaginationPage(0)
    }, [filters, sortBy])

    // Сохраняем filters с задержкой
    useDebouncedEffect(() => {
        localStorage.setItem(`${tableName}-filters`, JSON.stringify(filters))
    }, [filters, tableName], 500)

    // Сохраняем sortBy с задержкой
    useDebouncedEffect(() => {
        localStorage.setItem(`${tableName}-sort-by`, JSON.stringify(sortBy))
    }, [sortBy, tableName], 500)


    useEffect(() => {
        localStorage.setItem(`${tableName}-counts`, paginationSize === 0 ? 'all' : paginationSize.toString())
    }, [paginationSize, tableName])

    useEffect(() => {
        localStorage.setItem(`${tableName}-page`, paginationPage.toString())
    }, [paginationPage, tableName])

    useImperativeHandle(ref, () => ({
        getData: () => processedData,
        getCurrentData: () => displayData,
    }), [processedData, displayData]);

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
                    />
                }

                {isFooter && (
                    <TableFooter
                        paginationCounts={paginationCounts}
                        tableData={processedData} // Передаем все отфильтрованные данные
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