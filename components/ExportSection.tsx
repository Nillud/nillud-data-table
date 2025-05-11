import { ReactElement, useEffect, useState } from "react"
import { Column, ExportOptions, TableData, TableProps } from "../types/DataTable.types"
import WordExport from "./export/WordExport"
import ExportExcel from "./export/ExportExcel"

type Props = {
    wordBtn: boolean
    excelBtn: boolean
    downloadSectionLeftSideContent: ReactElement | null
    tableData: TableData
    columns: Array<Column>
    tableName: string
    exportCustomColumns?: TableProps['exportCustomColumns']
    wordOptions?: ExportOptions
}

const ExportSection = ({
    wordBtn,
    excelBtn,
    downloadSectionLeftSideContent,
    tableData,
    columns,
    tableName,
    exportCustomColumns,
    wordOptions
}: Props) => {
    return (
        <>
            <div className={'ndt-download-section'}>
                <div className={'ndt-download-content'}>
                    {
                        (wordBtn || excelBtn) && downloadSectionLeftSideContent !== null && downloadSectionLeftSideContent
                    }
                </div>
                <div className={'ndt-download-buttons'}>
                    {
                        wordBtn && <WordExport
                            wordData={tableData}
                            columns={columns}
                            title={tableName}
                            exportCustomColumns={exportCustomColumns}
                            options={wordOptions}
                        />
                    }
                    {
                        excelBtn && <ExportExcel
                            excelData={tableData}
                            columns={columns}
                            title={tableName}
                            exportCustomColumns={exportCustomColumns}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default ExportSection