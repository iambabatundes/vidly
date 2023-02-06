import React, { useState } from "react";
import Joi from "joi";
import Input from "./common/input";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { Navigate, useLocation } from "react-router-dom";

function LoginForm() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const { state } = useLocation();

  const schema = Joi.object({
    email: Joi.string().min(3).label("email"),
    password: Joi.string().label("Password"),
  });

  function validate() {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  // async function handleSubmit(event) {
  //   event.preventDefault();

  //   const errors = validate();
  //   if (errors) {
  //     setData(null);
  //     setErrors(errors);
  //     return;
  //   }

  //   try {
  //     await auth.login(data.email, data.password);
  //     toast.success("You are now logged in");
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       const error = { ...errors };
  //       error.email = ex.response.data;
  //       setErrors(error);
  //       toast.error("Invalid email or password");
  //     }
  //   }
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validate();
    console.log(errors);
    setData(data);
    setErrors(errors || {});
    if (errors) return null;

    try {
      await auth.login(data.email, data.password);
      window.location = state ? state.path : "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...errors };
        error.email = ex.response.data;
        setErrors(error);
      }
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
  if (auth.getCurrentUser()) return <Navigate to="/movies" />;
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          name="email"
          value={data.email}
          onChange={handleChange}
          label="Email"
          error={errors.email}
          type="email"
        />

        <Input
          name="password"
          value={data.password}
          label="Password"
          onChange={handleChange}
          error={errors.password}
          type="password"
        />

        <button disabled={validate()} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
