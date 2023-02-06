import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

function Movies({ user }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getGenre() {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];

      setGenres(genres);
    }

    getGenre();

    async function getMovie() {
      await getGenres();
      const { data: movies } = await getMovies();
      setMovies(movies);
    }

    getMovie();
  }, []);

  async function handleDelete(movie) {
    const originalMovies = movies;
    const movieId = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(movieId);

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted");

      setMovies(originalMovies);
    }
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
    setSearchQuery("");
    setCurrentPage(selectedGenre);
  }

  function handleSearch(query) {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(currentPage);
  }

  function handleSort(sortColumns) {
    setSortColumn(sortColumns);
  }

  if (movies.length === 0) return <p>There are no movies in database</p>;

  let filtered = movies;
  if (searchQuery)
    filtered = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (selectedGenre && selectedGenre._id)
    filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const allMovies = paginate(sorted, currentPage, pageSize);

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        {user && (
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        )}
        <p>Showing {filtered.length} movies in database</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />

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
