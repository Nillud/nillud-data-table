import { ReactElement, useEffect, useState } from "react"
import { Column, ExportOptions, TableData, TableProps } from "../data-table/types/DataTable.types"
import WordExport from "./ExportWord"
import ExportExcel from "./ExportExcel"
import { ExportSectionTypes } from "./types/ExportSection.types"

const ExportSection = ({
    wordBtn,
    excelBtn,
    downloadSectionLeftSideContent,
    tableData,
    columns,
    tableName,
    exportCustomColumns,
    wordOptions
}: ExportSectionTypes) => {
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