import React, { useState } from "react";
import Joi from "joi";
import Input from "./common/input";

function LoginForm() {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().min(3).label("Username"),
    password: Joi.string().label("Password"),
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
    console.log(errors);
    setData(data);
    setErrors(errors || {});
    if (errors) return null;

    console.log(data);
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          name="username"
          value={data.username}
          onChange={handleChange}
          label="Username"
          error={errors.username}
        />

        <Input
          name="password"
          value={data.password}
          label="Password"
          onChange={handleChange}
          error={errors.password}
        />

        <button disabled={validate()} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
