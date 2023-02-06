import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";
import MovieForm from "../movieForm";

function RequireAuth() {
  const deletes = () => {
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      setColumns((prevColumns) => [
        ...prevColumns,
        {
          key: "delete",
          content: (movie) => (
            <button onClick={() => onDelete(movie)} className="btn btn-danger">
              Delete
            </button>
          ),
        },
      ]);
    }
  };

  deletes();

  return <>{user && <MovieForm />}</>;
}

export default RequireAuth;
