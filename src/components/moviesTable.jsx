import React from "react";
import Liked from "./common/like";
import Table from "./common/table";

function MoviesTable({
  allMovies,
  onDelete,
  onLike,
  onSort,
  sortColumn,
  columns,
}) {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Liked liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button onClick={() => onDelete(movie)} className="btn btn-danger">
          Delete
        </button>
      ),
    },
  ];
  return (
    <Table
      data={allMovies}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default MoviesTable;
