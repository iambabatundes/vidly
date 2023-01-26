import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useParams, useNavigate } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Input from "./common/input";
import Select from "./common/select";

function MovieForm() {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getGenre() {
      const { data: genres } = await getGenres();
      setGenres(genres);
    }

    getGenre();

    async function getMovies() {
      const movieId = params.id;
      if (movieId === "new") return;

      try {
        const { data: movie } = await getMovie(movieId);
        setData(viewModel(movie));
      } catch (error) {
        if (error.response && error.response.status === 404)
          navigate("/not-found", { replace: true });
        else console.log("An Error Occured:", error.message);
      }
    }
    getMovies();
  }, []);

  function viewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  const schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().min(3).max(255).trim().label("Title"),
    genreId: Joi.string(),
    numberInStock: Joi.number().min(0).max(1000).label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  });

  function validate() {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validate();
    if (errors) {
      setData(null);
      setErrors(errors);
    } else {
      saveMovie(data);

      navigate("/movies");
    }
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = schema.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  }

  function handleChange({ target: input }) {
    const error = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else error[input.name] = null;

    setData({
      ...data,
      [input.name]: input.value,
    });

    setErrors(error);
  }

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          name="title"
          value={data.title}
          onChange={handleChange}
          label="Title"
          error={errors.title}
        />

        <Select
          name="genreId"
          value={data.genreId}
          label="Genre"
          options={genres}
          onChange={handleChange}
          error={errors.genreId}
        />

        <Input
          name="numberInStock"
          value={data.numberInStock}
          onChange={handleChange}
          label="Stock"
          type="number"
          error={errors.numberInStock}
        />

        <Input
          name="dailyRentalRate"
          value={data.dailyRentalRate}
          onChange={handleChange}
          label="Rate"
          type="number"
          error={errors.dailyRentalRate}
        />

        <button disabled={validate()} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>

    // <div>
    //   <h1>Movie Form {params.id}</h1>
    //   <button className="btn btn-primary" onClick={() => navigate("/movies")}>
    //     Save
    //   </button>
    // </div>
  );
}

export default MovieForm;
