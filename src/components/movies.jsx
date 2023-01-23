import React, { useEffect, useState } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setMovies(getMovies());
    setGenres(genres);
  }, []);

  function handleDelete(movie) {
    const movieId = movies.filter((m) => m._id !== movie._id);
    setMovies(movieId);
  }

  function handleLiked(movie) {
    const movieId = [...movies];
    const index = movies.indexOf(movie);
    movieId[index] = { ...movies[index] };
    movieId[index].liked = !movieId[index].liked;
    setMovies(movieId);
  }

  function handleGenreSelect(genre) {
    setSelectedGenre(genre);
    setCurrentPage(selectedGenre);
  }

  function handleSort(sortColumns) {
    setSortColumn(sortColumns);
  }

  //   function handlePageChange(page) {
  //     setCurrentPage(currentPage);
  //   }

  if (movies.length === 0) return <p>There are no movies in database</p>;

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const allMovies = paginate(sorted, currentPage, pageSize);

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <p>Showing {filtered.length} movies in database</p>

        <MoviesTable
          allMovies={allMovies}
          onDelete={handleDelete}
          sortColumn={sortColumn}
          onLike={handleLiked}
          onSort={handleSort}
        />

        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Movies;
