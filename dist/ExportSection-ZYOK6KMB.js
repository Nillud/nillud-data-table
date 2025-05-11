// components/export/WordExport.tsx
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
import saveAs from "file-saver";

// utils/exportUtils/ExportHelpers.ts
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

// components/export/WordExport.tsx
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
  // exportCustomColumns 
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
var WordExport_default = WordExport;

// utils/exportUtils/exportUtils.ts
var generateExcelColumns = (columns, exportCustomColumns) => {
  let excelColumns = columns.map((column) => ({
    header: column.title,
    key: column.field,
    width: 20
  }));
  if (exportCustomColumns) {
    exportCustomColumns.forEach((custom) => {
      excelColumns = excelColumns.map(
        (col) => col.key === custom.key ? { ...col, ...custom } : col
      );
    });
  }
  return excelColumns;
};
var applyHeaderStyles = (row, columnCount) => {
  row.height = 40;
  row.font = { size: 12, bold: true };
  row.alignment = { vertical: "middle", horizontal: "center" };
  for (let i = 1; i <= columnCount; i++) {
    const cell = row.getCell(i);
    cell.alignment = { wrapText: true, vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
  }
};
var applyRowStyles = (row, columnCount) => {
  row.height = 40;
  row.font = { size: 12 };
  row.alignment = { vertical: "middle", horizontal: "center" };
  for (let i = 1; i <= columnCount; i++) {
    const cell = row.getCell(i);
    cell.alignment = { wrapText: true, vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
  }
};
var generateExcelDataRows = (columns, data) => {
  return data.map((element) => {
    const rowData = {};
    columns.forEach((col) => {
      const value = element[col.field];
      rowData[col.field] = typeof col.exportCustomCell !== "undefined" ? col.exportCustomCell(String(value), element) : value != null ? value : "";
    });
    return rowData;
  });
};
var setColumnAutoWidths = (sheet) => {
  var _a;
  (_a = sheet.columns) == null ? void 0 : _a.forEach((column) => {
    var _a2;
    let maxLength = 10;
    (_a2 = column.eachCell) == null ? void 0 : _a2.call(column, { includeEmpty: true }, (cell) => {
      const cellValue = cell.value ? String(cell.value) : "";
      maxLength = Math.max(maxLength, cellValue.length + 5);
    });
    column.width = maxLength;
  });
};

// components/export/ExportExcel.tsx
import ExcelJS from "exceljs";
import { jsx as jsx2 } from "react/jsx-runtime";
var ExportExcel = ({ columns, excelData, title, exportCustomColumns }) => {
  const exportExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(title, {
      pageSetup: {
        fitToPage: true,
        fitToHeight: 2,
        fitToWidth: 1,
        orientation: "landscape"
      },
      headerFooter: {
        oddFooter: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 &P \u0438\u0437 &N",
        evenFooter: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 &P \u0438\u0437 &N"
      }
    });
    const excelColumns = generateExcelColumns(columns, exportCustomColumns);
    sheet.columns = excelColumns;
    const headerRow = sheet.getRow(1);
    applyHeaderStyles(headerRow, sheet.columns.length);
    const dataRows = generateExcelDataRows(columns, excelData);
    dataRows.forEach((data) => {
      const row = sheet.addRow(data);
      applyRowStyles(row, sheet.columns.length);
    });
    setColumnAutoWidths(sheet);
    if (excelData.length > 15) {
      sheet.pageSetup.fitToHeight = Math.floor(excelData.length / 15);
    } else {
      sheet.pageSetup.fitToHeight = 1;
    }
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${title}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  return /* @__PURE__ */ jsx2("button", { className: `ndt-buttonExport ndt-Excel`, onClick: exportExcel, children: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C Excel" });
};
var ExportExcel_default = ExportExcel;

// components/ExportSection.tsx
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
var ExportSection = ({ wordBtn, excelBtn, downloadSectionLeftSideContent, tableData, columns, tableName, exportCustomColumns, wordOptions }) => {
  return /* @__PURE__ */ jsx3(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "ndt-download-section", children: [
    /* @__PURE__ */ jsx3("div", { className: "ndt-download-content", children: (wordBtn || excelBtn) && downloadSectionLeftSideContent !== null && downloadSectionLeftSideContent }),
    /* @__PURE__ */ jsxs("div", { className: "ndt-download-buttons", children: [
      wordBtn && /* @__PURE__ */ jsx3(
        WordExport_default,
        {
          wordData: tableData,
          columns,
          title: tableName,
          exportCustomColumns,
          options: wordOptions
        }
      ),
      excelBtn && /* @__PURE__ */ jsx3(
        ExportExcel_default,
        {
          excelData: tableData,
          columns,
          title: tableName,
          exportCustomColumns
        }
      )
    ] })
  ] }) });
};
var ExportSection_default = ExportSection;
export {
  ExportSection_default as default
};
