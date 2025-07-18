// components/data-table/DataTable.tsx
import { useImperativeHandle, useEffect as useEffect2, useState, useCallback, useMemo as useMemo4, forwardRef } from "react";

// components/data-table/Column.tsx
import { memo, useMemo } from "react";

// components/data-table/img/SortDown.tsx
import { jsx } from "react/jsx-runtime";
var SortDown = () => {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-caret-down-fill", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" }) });
};
var SortDown_default = SortDown;

// components/data-table/img/SortUp.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var SortUp = () => {
  return /* @__PURE__ */ jsx2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-caret-up-fill", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx2("path", { d: "m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" }) });
};
var SortUp_default = SortUp;

// components/data-table/img/CloseIcon.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var CloseIcon = ({
  size = 16,
  fill = "currentColor"
}) => {
  return /* @__PURE__ */ jsx3("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, fill, className: "bi bi-x-circle-fill", viewBox: `0 0 ${size} ${size}`, children: /* @__PURE__ */ jsx3("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" }) });
};
var CloseIcon_default = CloseIcon;

// components/data-table/Column.tsx
import { Fragment, jsx as jsx4, jsxs } from "react/jsx-runtime";
var Column = ({ column, getSortField, sortBy, getFilters, filters, selectedRows, toggleAllSelection, displayData }) => {
  var _a;
  const currentSort = useMemo(() => {
    return sortBy.col === column.field ? sortBy.type : null;
  }, [sortBy, column.field]);
  const toggleSort = () => {
    const nextType = currentSort === "asc" ? "desc" : "asc";
    getSortField({ col: column.field, type: nextType });
  };
  const onFilterChange = (value) => {
    getFilters({ ...filters, [column.field]: value });
  };
  const renderSelectable = () => {
    return /* @__PURE__ */ jsx4("div", { className: "ndt-column ndt-checkbox-column", children: /* @__PURE__ */ jsx4(
      "input",
      {
        type: "checkbox",
        checked: selectedRows.size === displayData.length && displayData.length > 0,
        onChange: toggleAllSelection
      }
    ) });
  };
  const renderColumnHead = () => {
    if (column.headerFormatter) {
      return column.headerFormatter(column.title);
    }
    return /* @__PURE__ */ jsx4("span", { title: `${column.title}`, children: column.title });
  };
  const renderColumnSort = () => {
    if (typeof column.autoinc === "undefined" && (typeof column.sortable === "undefined" || column.sortable)) {
      return /* @__PURE__ */ jsx4("div", { className: "ndt-sorter", role: "button", tabIndex: 1, onClick: toggleSort, children: currentSort === "asc" ? /* @__PURE__ */ jsx4(SortDown_default, {}) : currentSort === "desc" ? /* @__PURE__ */ jsx4(SortUp_default, {}) : /* @__PURE__ */ jsx4(SortDown_default, {}) });
    }
    return /* @__PURE__ */ jsx4(Fragment, {});
  };
  return /* @__PURE__ */ jsx4(Fragment, { children: column.selectable ? renderSelectable() : /* @__PURE__ */ jsxs("div", { className: "ndt-column", children: [
    /* @__PURE__ */ jsxs("div", { className: "ndt-column-head", children: [
      renderColumnHead(),
      renderColumnSort()
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "ndt-column-footer", children: typeof column.autoinc === "undefined" && (typeof column.filterable === "undefined" || column.filterable) && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx4(
        "input",
        {
          type: "text",
          value: (_a = filters[column.field]) != null ? _a : "",
          onChange: (e) => onFilterChange(e.target.value),
          placeholder: column.filterPlaceholder || ""
        }
      ),
      typeof filters[column.field] !== "undefined" && filters[column.field] !== "" && /* @__PURE__ */ jsx4("span", { onClick: () => onFilterChange(""), children: /* @__PURE__ */ jsx4(CloseIcon_default, { size: 16, fill: "#707695" }) })
    ] }) })
  ] }) });
};
var Column_default = memo(Column);

// components/data-table/TableHeader.tsx
import { memo as memo2 } from "react";
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var Header = ({ columns, getSortField, sortBy, getFilters, filters, widths, headerGroup, selectedRows, toggleAllSelection, displayData }) => {
  const renderHeaderGroup = () => headerGroup && /* @__PURE__ */ jsx5("div", { className: "ndt-table-columns", style: { gridTemplateColumns: widths || "auto" }, children: headerGroup.map((col, id) => /* @__PURE__ */ jsx5("div", { className: "ndt-column", style: { gridColumn: `span ${col.cols || 1}` }, children: /* @__PURE__ */ jsx5("div", { className: "ndt-column-head", children: /* @__PURE__ */ jsx5("span", { title: col.title, children: col.title }) }) }, `header-group-${id}`)) });
  const renderColumns = () => columns && columns.length > 0 ? columns.map((column, id) => /* @__PURE__ */ jsx5(
    Column_default,
    {
      column,
      getSortField,
      sortBy,
      getFilters,
      filters,
      selectedRows,
      toggleAllSelection,
      displayData
    },
    `column-${id}`
  )) : /* @__PURE__ */ jsx5("div", { className: "ndt-data-error", children: "\u041E\u0448\u0438\u0431\u043A\u0430: columns is undefined" });
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    renderHeaderGroup(),
    /* @__PURE__ */ jsx5("div", { className: "ndt-table-columns", style: { gridTemplateColumns: widths || "auto" }, children: renderColumns() })
  ] });
};
var TableHeader_default = memo2(Header);

// components/data-table/TableBody.tsx
import React, { memo as memo5, useMemo as useMemo3 } from "react";

// components/data-table/Cell.tsx
import { memo as memo3, useMemo as useMemo2 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Cell = ({
  row,
  column,
  // rowId,
  displayId,
  isTitles,
  isRowSelected,
  onRowSelect,
  isSelectable
}) => {
  const rawValue = row[column.field];
  const stringValue = typeof rawValue !== "undefined" && rawValue !== null ? String(rawValue) : "";
  const isAutoinc = !!column.autoinc;
  const isFormatted = typeof column.formatter !== "undefined";
  const isEditable = !!column.editable;
  const isColumnSelectable = !!column.selectable;
  const formattedContent = useMemo2(() => {
    var _a;
    return (_a = column.formatter) == null ? void 0 : _a.call(column, stringValue, row, column);
  }, [column.formatter, stringValue, row, column]);
  const cellVerticalAlignment = {
    "top": { alignItems: "flex-start" },
    "middle": { alignItems: "center" },
    "bottom": { alignItems: "flex-end" }
  };
  const cellHorizontalAlignment = {
    "left": { justifyContent: "flex-start" },
    "center": { justifyContent: "center" },
    "right": { justifyContent: "flex-end" }
  };
  const CellWithData = ({ children }) => /* @__PURE__ */ jsx6(
    "div",
    {
      className: "ndt-cell",
      title: isTitles && stringValue ? stringValue : "",
      style: column.cellAlignment ? {
        ...cellVerticalAlignment[column.cellAlignment.vertical],
        ...cellHorizontalAlignment[column.cellAlignment.horizontal]
      } : {},
      onClick: isSelectable && (typeof column.isSelectableCell === "undefined" || column.isSelectableCell || column.editable) ? onRowSelect : () => {
      },
      children
    }
  );
  const EditableCell = () => /* @__PURE__ */ jsx6(
    "input",
    {
      className: "ndt-cell ndt-cell-editable",
      defaultValue: stringValue ? String(stringValue) : "",
      onChange: (e) => {
        row[column.field] = e.target.value;
      }
    }
  );
  const SelectableCell = () => /* @__PURE__ */ jsx6("div", { className: "ndt-cell ndt-checkbox-cell", onClick: onRowSelect, children: /* @__PURE__ */ jsx6("input", { type: "checkbox", checked: !!isRowSelected, onChange: () => {
  } }) });
  if (isAutoinc) return /* @__PURE__ */ jsx6(CellWithData, { children: displayId + 1 });
  if (isFormatted) return /* @__PURE__ */ jsx6(CellWithData, { children: formattedContent });
  if (isEditable) return /* @__PURE__ */ jsx6(EditableCell, {});
  if (isColumnSelectable) return /* @__PURE__ */ jsx6(SelectableCell, {});
  return /* @__PURE__ */ jsx6(CellWithData, { children: stringValue });
};
var Cell_default = memo3(Cell);

// components/data-table/Row.tsx
import { memo as memo4 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Row = ({
  rowId,
  displayId,
  columns,
  row,
  widths,
  isTitles,
  isRowSelected,
  onRowSelect
}) => {
  const isSelectable = columns.find((element) => element.selectable);
  return /* @__PURE__ */ jsx7(
    "div",
    {
      className: `ndt-table-row ${isSelectable && "ndt-table-row-selectable"} ${isRowSelected && "ndt-table-row-selected"}`,
      style: { gridTemplateColumns: widths },
      children: columns.map((column, id) => /* @__PURE__ */ jsx7(
        Cell_default,
        {
          row,
          column,
          displayId,
          isTitles,
          isRowSelected,
          onRowSelect,
          isSelectable: !!isSelectable
        },
        `cell-${rowId}-${id}`
      ))
    }
  );
};
var Row_default = memo4(Row);

// components/data-table/utils/groupDataBy.ts
var groupDataBy = (data, key) => {
  const groups = /* @__PURE__ */ new Map();
  data.forEach((item) => {
    const groupKey = item[key] || "\u2014";
    if (!groups.has(String(groupKey))) {
      groups.set(String(groupKey), []);
    }
    groups.get(String(groupKey)).push(item);
  });
  return Array.from(groups.entries()).map(([key2, items]) => ({ key: key2, items }));
};

// components/data-table/TableBody.tsx
import { jsx as jsx8, jsxs as jsxs3 } from "react/jsx-runtime";
var TableBody = ({
  columns,
  tableData,
  // groupedData,
  scrollable,
  scrollHeight,
  widths,
  groupBy,
  collapsedGroups = {},
  toggleGroup,
  isTitles,
  selectedRows,
  toggleRowSelection,
  rowIdMap,
  paginationSize,
  paginationPage
}) => {
  const grouped = useMemo3(() => groupBy ? groupDataBy(tableData, groupBy) : [], [tableData, groupBy]);
  if (!tableData || tableData.length === 0) {
    return /* @__PURE__ */ jsx8("div", { className: `ndt-table-body${scrollable ? " ndt-table-body-scrollable" : ""}`, style: scrollable ? { height: scrollHeight } : {}, children: /* @__PURE__ */ jsx8("div", { className: "ndt-table-row", style: { height: "100%" }, children: /* @__PURE__ */ jsx8("div", { className: "ndt-row-item", style: { margin: "auto", padding: 20, fontWeight: "bold" }, children: "\u0414\u0430\u043D\u043D\u044B\u0445 \u043D\u0435\u0442" }) }) });
  }
  const renderGroupedRows = () => {
    let currentIndex = 0;
    return grouped.map((group) => {
      const groupHeader = /* @__PURE__ */ jsxs3(
        "div",
        {
          className: "ndt-group-header",
          onClick: () => toggleGroup == null ? void 0 : toggleGroup(group.key),
          children: [
            /* @__PURE__ */ jsx8("span", { style: { marginRight: 8 }, children: collapsedGroups[group.key] ? "\u25B6" : "\u25BC" }),
            group.key,
            " (",
            group.items.length,
            ")"
          ]
        },
        `group-header-${group.key}`
      );
      const rows = !collapsedGroups[group.key] ? group.items.map((element) => {
        const globalIndex = rowIdMap.get(element);
        if (globalIndex === void 0) return null;
        const localIndex = currentIndex++;
        const displayIndex = paginationSize === 0 ? localIndex : paginationPage * paginationSize + localIndex;
        return /* @__PURE__ */ jsx8(
          Row_default,
          {
            rowId: globalIndex,
            displayId: displayIndex,
            row: element,
            columns,
            widths,
            isTitles,
            isRowSelected: selectedRows.has(globalIndex),
            onRowSelect: () => toggleRowSelection(globalIndex)
          },
          `row-${group.key}-${globalIndex}`
        );
      }) : null;
      return /* @__PURE__ */ jsxs3(React.Fragment, { children: [
        groupHeader,
        rows
      ] }, `group-${group.key}`);
    });
  };
  const renderFlatRows = () => {
    let currentIndex = 0;
    return tableData.map((element) => {
      const globalIndex = rowIdMap.get(element);
      if (globalIndex === void 0) return null;
      const localIndex = currentIndex++;
      const displayIndex = paginationSize === 0 ? localIndex : paginationPage * paginationSize + localIndex;
      return /* @__PURE__ */ jsx8(
        Row_default,
        {
          rowId: globalIndex,
          displayId: displayIndex,
          row: element,
          columns,
          widths,
          isTitles,
          isRowSelected: selectedRows.has(globalIndex),
          onRowSelect: () => toggleRowSelection(globalIndex)
        },
        `row-${globalIndex}`
      );
    });
  };
  return /* @__PURE__ */ jsx8("div", { className: `ndt-table-body${scrollable ? " ndt-table-body-scrollable" : ""}`, style: scrollable ? { height: scrollHeight } : {}, children: groupBy ? renderGroupedRows() : renderFlatRows() });
};
var TableBody_default = memo5(TableBody);

// components/data-table/img/NextIcon.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var NextIcon = () => {
  return /* @__PURE__ */ jsx9("svg", { width: "41", height: "65", viewBox: "0 0 41 65", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx9("path", { d: "M0.674316 57.2669L25.3872 32.5L0.674316 7.73312L8.28244 0.125L40.6574 32.5L8.28244 64.875L0.674316 57.2669Z", fill: "#666666" }) });
};
var NextIcon_default = NextIcon;

// components/data-table/img/LastIcon.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var LastIcon = () => {
  return /* @__PURE__ */ jsx10("svg", { width: "68", height: "65", viewBox: "0 0 68 65", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx10("path", { d: "M0.185059 7.73312L24.9519 32.5L0.185059 57.2669L7.79318 64.875L40.1682 32.5L7.79318 0.125L0.185059 7.73312ZM56.3557 0.125H67.1474V64.875H56.3557V0.125Z", fill: "#666666" }) });
};
var LastIcon_default = LastIcon;

// components/data-table/img/PrevIcon.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var PrevIcon = () => {
  return /* @__PURE__ */ jsx11("svg", { width: "41", height: "65", viewBox: "0 0 41 65", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx11("path", { d: "M40.6574 57.2669L15.9445 32.5L40.6574 7.73312L33.0493 0.125L0.674316 32.5L33.0493 64.875L40.6574 57.2669Z", fill: "#666666" }) });
};
var PrevIcon_default = PrevIcon;

// components/data-table/img/FirstIcon.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var FirstIcon = () => {
  return /* @__PURE__ */ jsx12("svg", { width: "68", height: "65", viewBox: "0 0 68 65", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx12("path", { d: "M67.1474 57.2669L42.3805 32.5L67.1474 7.73312L59.5392 0.125L27.1642 32.5L59.5392 64.875L67.1474 57.2669ZM0.185059 0.125H10.9767V64.875H0.185059V0.125Z", fill: "#666666" }) });
};
var FirstIcon_default = FirstIcon;

// components/data-table/TableFooter.tsx
import { jsx as jsx13, jsxs as jsxs4 } from "react/jsx-runtime";
var TableFooter = ({
  tableData,
  paginationCounts,
  paginationSize,
  getPaginationSize,
  paginationPage,
  getPaginationPage
}) => {
  const totalItems = tableData.length;
  const totalPages = paginationSize === 0 ? 1 : Math.ceil(totalItems / paginationSize);
  if (totalItems === 0) return null;
  const handleCountChange = (e) => {
    getPaginationSize(Number(e.target.value));
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      getPaginationPage(newPage);
    }
  };
  const renderPageNumbers = () => {
    if (totalPages <= 1) return /* @__PURE__ */ jsx13(
      "button",
      {
        className: "btn-active",
        onClick: () => handlePageChange(0),
        disabled: true,
        children: "1"
      },
      "page-0"
    );
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, paginationPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(0, end - maxVisible + 1);
    }
    if (start > 0) {
      pages.push(
        /* @__PURE__ */ jsx13("button", { onClick: () => handlePageChange(0), children: "1" }, "page-0")
      );
      if (start > 1) {
        pages.push(/* @__PURE__ */ jsx13("span", { children: "..." }, "ellipsis-start"));
      }
    }
    for (let i = start; i <= end; i++) {
      pages.push(
        /* @__PURE__ */ jsx13(
          "button",
          {
            className: i === paginationPage ? "btn-active" : "",
            onClick: () => handlePageChange(i),
            disabled: i === paginationPage,
            children: i + 1
          },
          `page-${i}`
        )
      );
    }
    if (end < totalPages - 1) {
      if (end < totalPages - 2) {
        pages.push(/* @__PURE__ */ jsx13("span", { children: "..." }, "ellipsis-end"));
      }
      pages.push(
        /* @__PURE__ */ jsx13("button", { onClick: () => handlePageChange(totalPages - 1), children: totalPages }, `page-${totalPages - 1}`)
      );
    }
    return pages;
  };
  const firstItem = paginationSize === 0 ? 1 : paginationPage * paginationSize + 1;
  const lastItem = paginationSize === 0 ? totalItems : Math.min((paginationPage + 1) * paginationSize, totalItems);
  return /* @__PURE__ */ jsxs4("div", { className: "ndt-table-footer", children: [
    /* @__PURE__ */ jsxs4("div", { className: "ndt-footer-count", children: [
      /* @__PURE__ */ jsxs4("span", { children: [
        "\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0441\u0442\u0440\u043E\u043A\u0438 \u0441 ",
        firstItem,
        " \u043F\u043E ",
        lastItem,
        ", "
      ] }),
      /* @__PURE__ */ jsxs4("span", { children: [
        "\u0412\u0441\u0435\u0433\u043E: ",
        totalItems
      ] })
    ] }),
    paginationCounts && /* @__PURE__ */ jsxs4("div", { className: "ndt-footer-pagination", children: [
      /* @__PURE__ */ jsxs4("div", { className: "ndt-pagination-counts", children: [
        /* @__PURE__ */ jsx13("span", { children: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0441\u0442\u0440\u043E\u043A: " }),
        /* @__PURE__ */ jsx13("select", { value: paginationSize, onChange: handleCountChange, children: paginationCounts.map((count) => /* @__PURE__ */ jsx13("option", { value: count, children: count === 0 ? "\u0412\u0441\u0435" : count }, `count-${count}`)) })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "ndt-pagination-buttons", children: [
        /* @__PURE__ */ jsx13(
          "button",
          {
            disabled: paginationPage === 0,
            onClick: () => handlePageChange(0),
            "aria-label": "\u041F\u0435\u0440\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
            children: /* @__PURE__ */ jsx13(FirstIcon_default, {})
          }
        ),
        /* @__PURE__ */ jsx13(
          "button",
          {
            disabled: paginationPage === 0,
            onClick: () => handlePageChange(paginationPage - 1),
            "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
            children: /* @__PURE__ */ jsx13(PrevIcon_default, {})
          }
        ),
        /* @__PURE__ */ jsx13("div", { className: "ndt-buttons-num", children: renderPageNumbers() }),
        /* @__PURE__ */ jsx13(
          "button",
          {
            disabled: paginationPage >= totalPages - 1,
            onClick: () => handlePageChange(paginationPage + 1),
            "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
            children: /* @__PURE__ */ jsx13(NextIcon_default, {})
          }
        ),
        /* @__PURE__ */ jsx13(
          "button",
          {
            disabled: paginationPage >= totalPages - 1,
            onClick: () => handlePageChange(totalPages - 1),
            "aria-label": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
            children: /* @__PURE__ */ jsx13(LastIcon_default, {})
          }
        )
      ] })
    ] })
  ] });
};
var TableFooter_default = TableFooter;

// components/data-table/utils/sort-data.ts
var sortByAsc = (data, column) => {
  const sortedData = data.sort((a, b) => {
    if (!isNaN(+a[column]) && !isNaN(+b[column])) {
      return +a[column] - +b[column];
    }
    if (`${a[column]}`.toLowerCase() < `${b[column]}`.toLowerCase()) {
      return -1;
    }
    if (`${a[column]}`.toLowerCase() > `${b[column]}`.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return sortedData;
};
var sortByDesc = (data, column) => {
  const sortedData = data.sort((a, b) => {
    if (!isNaN(+a[column]) && !isNaN(+b[column])) {
      return +b[column] - +a[column];
    }
    if (`${a[column]}`.toLowerCase() > `${b[column]}`.toLowerCase()) {
      return -1;
    }
    if (`${a[column]}`.toLowerCase() < `${b[column]}`.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return sortedData;
};
var sortData = (data, col, type) => {
  if (type === "asc") {
    return sortByAsc(data, col);
  } else {
    return sortByDesc(data, col);
  }
};
var filterData = (data, filter, value) => {
  if (value == "") return data;
  const filteredData = data.filter((element) => `${element[filter]}`.toLowerCase().includes(value.toLowerCase()));
  return filteredData;
};

// components/data-table/utils/useDebouncedEffect.tsx
import { useEffect } from "react";
function useDebouncedEffect(callback, deps, delay) {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
}

// components/data-table/DataTable.tsx
import { jsx as jsx14, jsxs as jsxs5 } from "react/jsx-runtime";
var DataTable = forwardRef(({
  tableData,
  columns,
  tableName = "table-data",
  loading = false,
  loadingElement = null,
  isFooter = false,
  paginationCounts = null,
  scrollable = false,
  scrollHeight = 300,
  headerGroup = null,
  groupBy = null,
  isTitles = false
}, ref) => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState({ col: "", type: "asc" });
  const [paginationSize, setPaginationSize] = useState((paginationCounts == null ? void 0 : paginationCounts[0]) || 0);
  const [paginationPage, setPaginationPage] = useState(0);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [selectedRows, setSelectedRows] = useState(/* @__PURE__ */ new Set());
  const widths = useMemo4(() => {
    return columns.map((c) => c.width ? `${c.width}px` : "1fr").join(" ");
  }, [columns]);
  const loadFromLocalStorage = useCallback(() => {
    try {
      const s = localStorage.getItem(`${tableName}-sort-by`);
      const f = localStorage.getItem(`${tableName}-filters`);
      if (s) setSortBy(JSON.parse(s));
      if (f) setFilters(JSON.parse(f));
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      setSortBy({ col: "", type: "asc" });
      setFilters({});
      setPaginationSize((paginationCounts == null ? void 0 : paginationCounts[0]) || 0);
      setPaginationPage(0);
    } finally {
    }
  }, [tableName, paginationCounts]);
  useEffect2(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);
  const processedData = useMemo4(() => {
    let result = [...tableData];
    const columnMap = new Map(columns.map((col) => [col.field, col]));
    for (const field in filters) {
      const filterValue = String(filters[field]);
      if (filterValue === "") continue;
      const column = columnMap.get(field);
      if (!column) continue;
      result = column.headerFilter ? result.filter((e) => column.headerFilter(filterValue, String(e[field]), e)) : filterData(result, field, filterValue);
    }
    if (sortBy.col) {
      result = sortData(result, sortBy.col, sortBy.type);
    }
    return result;
  }, [tableData, filters, sortBy, columns]);
  const displayData = useMemo4(() => {
    if (paginationSize === 0) return processedData;
    const start = paginationPage * paginationSize;
    return processedData.slice(start, start + paginationSize);
  }, [processedData, paginationPage, paginationSize]);
  const rowIdMap = useMemo4(() => {
    const map = /* @__PURE__ */ new Map();
    tableData.forEach((row, i) => map.set(row, i));
    return map;
  }, [tableData]);
  const toggleRowSelection = (index) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };
  const toggleAllSelection = useCallback(() => {
    if (selectedRows.size === processedData.length) {
      setSelectedRows(/* @__PURE__ */ new Set());
    } else {
      setSelectedRows(new Set(processedData.map((_, i) => i)));
    }
  }, [processedData, selectedRows]);
  const toggleGroup = (groupKey) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };
  useEffect2(() => {
    if (Object.values(filters).some((value) => {
      return value !== null && value !== void 0 && value !== "";
    })) setPaginationPage(0);
  }, [filters]);
  useDebouncedEffect(() => {
    localStorage.setItem(`${tableName}-filters`, JSON.stringify(filters));
  }, [filters, tableName], 500);
  useDebouncedEffect(() => {
    localStorage.setItem(`${tableName}-sort-by`, JSON.stringify(sortBy));
  }, [sortBy, tableName], 500);
  useImperativeHandle(ref, () => ({
    getData: () => processedData,
    getCurrentData: () => displayData,
    getSelectedData: () => Array.from(selectedRows).map((i) => processedData[i])
  }), [processedData, displayData, selectedRows]);
  return /* @__PURE__ */ jsx14("div", { className: "ndt-table-container", children: /* @__PURE__ */ jsxs5("div", { className: "ndt-table", children: [
    /* @__PURE__ */ jsx14(
      TableHeader_default,
      {
        columns,
        sortBy,
        getSortField: setSortBy,
        filters,
        getFilters: setFilters,
        widths,
        headerGroup,
        selectedRows,
        toggleAllSelection,
        displayData: processedData
      }
    ),
    loading ? loadingElement !== null ? loadingElement : /* @__PURE__ */ jsx14("span", { style: { marginLeft: 10, fontWeight: "bold" }, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445..." }) : /* @__PURE__ */ jsx14(
      TableBody_default,
      {
        tableData: displayData,
        columns,
        scrollable,
        scrollHeight,
        widths,
        groupBy,
        collapsedGroups,
        toggleGroup,
        isTitles,
        selectedRows,
        toggleRowSelection,
        rowIdMap,
        paginationSize,
        paginationPage
      }
    ),
    isFooter && /* @__PURE__ */ jsx14(
      TableFooter_default,
      {
        paginationCounts,
        tableData: processedData,
        paginationSize,
        getPaginationSize: setPaginationSize,
        paginationPage,
        getPaginationPage: setPaginationPage
      }
    )
  ] }) });
});
DataTable.displayName = "DataTable";
var DataTable_default = DataTable;
export {
  DataTable_default as DataTable
};
