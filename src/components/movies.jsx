import React, { useState } from "react";

import { getMovies } from "../services/fakeMovieService";
import Liked from "./common/like";
import Pagination from "./common/pagination";

function Movies() {
  const [movies, setMovies] = useState(getMovies());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

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

  //   function handlePageChange(page) {
  //     setCurrentPage(currentPage);
  //   }

  if (movies.length === 0) return <p>There are no movies in database</p>;

  return (
    <>
      <p>Showing {movies.length} movies in database</p>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th />
            <th />
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Liked liked={movie.liked} onClick={() => handleLiked(movie)} />
              </td>
              <td>
                <button
                  onClick={() => handleDelete(movie)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={movies.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default Movies;
