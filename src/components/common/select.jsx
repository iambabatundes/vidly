import React from "react";

function Select({ name, label, options, onChange, value, error, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        value={value || "default"}
        className="form-select"
      >
        <option value="default"> Select a Genre</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Select;
