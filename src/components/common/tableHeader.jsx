import React from "react";
import user from "../../services/userService";

function TableHeader({ sortColumn, columns, onSort, raiseSort }) {
  raiseSort = (path) => {
    const sortColumns = { ...sortColumn };
    if (sortColumns.path === path)
      sortColumns.order = sortColumns.order === "asc" ? "desc" : "asc";
    else {
      sortColumns.path = path;
      sortColumns.order = "asc";
    }
    onSort(sortColumns);
  };

  function renderSortIcon(column) {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;

    return <i className="fa fa-sort-desc" />;
  }
  return (
    <thead>
      <tr className="clickable">
        {columns.map((column) => (
          <th
            key={column.path || column.key || user}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
