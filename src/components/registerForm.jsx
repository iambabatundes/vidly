import Joi from "joi";
import React, { useState } from "react";
import Input from "./common/input";

function RegisterForm() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    name: Joi.string().min(3).label("Name"),
    email: Joi.string()
      .label("Email")
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(5).label("Password"),
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          name="name"
          value={data.name}
          onChange={handleChange}
          label="Name"
          error={errors.name}
        />

        <Input
          name="email"
          value={data.email}
          onChange={handleChange}
          label="Email"
          error={errors.email}
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
