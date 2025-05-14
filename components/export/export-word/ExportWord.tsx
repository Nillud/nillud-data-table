import { prepareExportHeaders, prepareExportRows } from './ExportHelpers'
import {
  AlignmentType, Document, Packer,
  PageOrientation,
  // PageOrientation, 
  Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType
} from "docx"
import { saveAs } from "file-saver"
import { ExportWordTypes } from './types/ExportWord.types'

const WordExport = ({
  wordData,
  columns,
  title,
  options = {
    fontSize: 20,
    boldHeaders: false,
    autoLandscape: false,
    maxColumnsBeforeLandscape: 5
  }
}: ExportWordTypes) => {
  const createNewWord = async () => {
    const {
      fontSize = 0,
      boldHeaders = true,
      autoLandscape = true,
      maxColumnsBeforeLandscape = 5
    } = options

    const isLandscape = autoLandscape && columns.length > maxColumnsBeforeLandscape

    const headerCells = prepareExportHeaders(columns).map(header => (
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({
            text: header,
            size: fontSize,
            bold: boldHeaders
          })],
          alignment: AlignmentType.CENTER
        })],
        verticalAlign: VerticalAlign.CENTER,
      })
    ))

    const tableHeaderRow = new TableRow({ children: headerCells })

    const rows = prepareExportRows(columns, wordData).map(cells => {
      const rowCells = cells.map(value =>
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({
              text: value,
              size: fontSize
            })],
            alignment: AlignmentType.CENTER
          })],
          verticalAlign: VerticalAlign.CENTER
        })
      )
      return new TableRow({ children: rowCells })
    })

    const table = new Table({
      rows: [tableHeaderRow, ...rows],
      width: { size: 11000, type: WidthType.DXA },
      indent: { size: -1000, type: WidthType.DXA }
    })

    const doc = new Document({
      sections: [{
        children: [table, new Paragraph({ text: '' })],
        properties: isLandscape
          ? { page: { size: { orientation: PageOrientation.LANDSCAPE } } }
          : {}
      }]
    })

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${title}.docx`)
    })
  }

  return (
    <button className={`ndt-buttonExport ndt-Word}`} onClick={createNewWord}>Скачать Word</button>
  )
}

export default WordExport