// components/export/export-word/ExportHelpers.ts
function prepareExportRows(columns, data) {
  return data.map(
    (row) => columns.map((col) => {
      const value = row[col.field];
      return typeof col.exportCustomCell !== "undefined" ? col.exportCustomCell(String(value), row) : String(value != null ? value : "");
    })
  );
}
function prepareExportHeaders(columns) {
  return columns.map((col) => col.title);
}

// components/export/export-word/ExportWord.tsx
import {
  AlignmentType,
  Document,
  Packer,
  PageOrientation,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType
} from "docx";
import { saveAs } from "file-saver";
import { jsx } from "react/jsx-runtime";
var WordExport = ({
  wordData,
  columns,
  title,
  options = {
    fontSize: 20,
    boldHeaders: false,
    autoLandscape: false,
    maxColumnsBeforeLandscape: 5
  }
}) => {
  const createNewWord = async () => {
    const {
      fontSize = 0,
      boldHeaders = true,
      autoLandscape = true,
      maxColumnsBeforeLandscape = 5
    } = options;
    const isLandscape = autoLandscape && columns.length > maxColumnsBeforeLandscape;
    const headerCells = prepareExportHeaders(columns).map((header) => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({
          text: header,
          size: fontSize,
          bold: boldHeaders
        })],
        alignment: AlignmentType.CENTER
      })],
      verticalAlign: VerticalAlign.CENTER
    }));
    const tableHeaderRow = new TableRow({ children: headerCells });
    const rows = prepareExportRows(columns, wordData).map((cells) => {
      const rowCells = cells.map(
        (value) => new TableCell({
          children: [new Paragraph({
            children: [new TextRun({
              text: value,
              size: fontSize
            })],
            alignment: AlignmentType.CENTER
          })],
          verticalAlign: VerticalAlign.CENTER
        })
      );
      return new TableRow({ children: rowCells });
    });
    const table = new Table({
      rows: [tableHeaderRow, ...rows],
      width: { size: 11e3, type: WidthType.DXA },
      indent: { size: -1e3, type: WidthType.DXA }
    });
    const doc = new Document({
      sections: [{
        children: [table, new Paragraph({ text: "" })],
        properties: isLandscape ? { page: { size: { orientation: PageOrientation.LANDSCAPE } } } : {}
      }]
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${title}.docx`);
    });
  };
  return /* @__PURE__ */ jsx("button", { className: `ndt-buttonExport ndt-Word}`, onClick: createNewWord, children: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C Word" });
};
var ExportWord_default = WordExport;
export {
  ExportWord_default as WordExport
};
