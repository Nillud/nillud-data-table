// components/export/export-excel/exportUtils.ts
var generateExcelColumns = (columns, exportCustomColumns) => {
  let excelColumns = columns.filter((column) => column.title !== "").map((column) => ({
    title: column.title,
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
var applyRowStyles = (row, columnCount, height = 40, columns) => {
  row.height = height;
  row.font = { size: 12 };
  row.alignment = { vertical: "middle", horizontal: "center" };
  for (let i = 1; i <= columnCount; i++) {
    const cell = row.getCell(i);
    const column = columns[i - 1];
    cell.alignment = {
      wrapText: true,
      vertical: column.cellAlignment ? column.cellAlignment.vertical : "middle",
      horizontal: column.cellAlignment ? column.cellAlignment.horizontal : "center"
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
  }
};
var generateExcelDataRows = (columns, data, exportCustomColumns) => {
  return data.map((element, rowIndex) => {
    return columns.map((col, colIndex) => {
      const isAutoinc = col.autoinc;
      if (isAutoinc) return rowIndex + 1;
      const value = element[col.field];
      const customCol = exportCustomColumns == null ? void 0 : exportCustomColumns.find((custom) => custom.key === col.field);
      if (customCol == null ? void 0 : customCol.exportCustomCell) {
        return customCol.exportCustomCell(String(value != null ? value : ""), element);
      }
      if (typeof col.exportCustomCell !== "undefined") {
        return col.exportCustomCell(String(value != null ? value : ""), element);
      }
      return value != null ? value : "";
    });
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
var ExportExcel = ({ columns, excelData, tableRef, titleFile, title, text, exportCustomColumns, customHeight }) => {
  const exportExcel = async () => {
    const tableData = excelData || tableRef.current.getData();
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(titleFile, {
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
    sheet.properties.defaultRowHeight = 20;
    let tableHeaderRow = 1;
    if (title) {
      sheet.getCell("A1").value = title;
      sheet.getRow(1).height = 25;
      sheet.getRow(1).alignment = { vertical: "middle" };
      sheet.getCell("A1").font = {
        size: 18,
        bold: true
      };
      tableHeaderRow++;
    }
    if (text) {
      sheet.getCell("A2").value = text;
      sheet.getRow(2).height = 15;
      sheet.getRow(2).alignment = { vertical: "middle" };
      sheet.getCell("A2").font = {
        size: 12
      };
      tableHeaderRow++;
    }
    if (title || text) tableHeaderRow++;
    const excelColumns = generateExcelColumns(columns, exportCustomColumns);
    sheet.columns = excelColumns;
    const headerRow = sheet.getRow(tableHeaderRow);
    headerRow.values = excelColumns.map((col) => col.title);
    applyHeaderStyles(headerRow, sheet.columns.length);
    const dataRows = generateExcelDataRows(columns, tableData);
    dataRows.forEach((data) => {
      const row = sheet.addRow(data);
      applyRowStyles(row, sheet.columns.length, customHeight, columns);
    });
    setColumnAutoWidths(sheet);
    if (tableData.length > 15) {
      sheet.pageSetup.fitToHeight = Math.floor(tableData.length / 15);
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
      anchor.download = `${titleFile}.xlsx`;
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
