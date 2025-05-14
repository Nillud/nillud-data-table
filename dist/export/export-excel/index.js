// components/export/export-excel/exportUtils.ts
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

// components/export/export-excel/ExportExcel.tsx
import ExcelJS from "exceljs";
import { jsx } from "react/jsx-runtime";
var ExportExcel = ({ columns, excelData, title, exportCustomColumns }) => {
  const exportExcel = async () => {
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
  return /* @__PURE__ */ jsx("button", { className: `ndt-buttonExport ndt-Excel`, onClick: exportExcel, children: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C Excel" });
};
var ExportExcel_default = ExportExcel;
export {
  ExportExcel_default as ExportExcel
};
