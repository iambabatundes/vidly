import http from "./httpService";
import config from "../config.json";

const endPoint = config.apiUri + "/movies";

export function getMovies() {
  return http.get(endPoint);
}

export function getMovie(movieId) {
  return http.get(endPoint + "/" + movieId);
}

export function saveMovie(movie) {
  // return http.post(endPoint + "/" + movieId);
}

export function deleteMovie(movieId) {
  return http.delete(endPoint + "/" + movieId);
}
