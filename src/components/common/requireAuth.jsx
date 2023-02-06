// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import auth from "../../services/authService";
// import MovieForm from "../movieForm";

// function RequireAuth({ children }) {
//   return auth.getCurrentUser() === true ? (
//     <MovieForm />
//   ) : (
//     <Navigate to="/login" />
//   );
// }

// export default RequireAuth;

// import React, { useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import auth from "../../services/authService";
// import MovieForm from "../movieForm";

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";
import MovieForm from "../movieForm";

function RequireAuth({ children }) {
  const location = useLocation();

  if (auth.getCurrentUser() === null)
    return (
      <Navigate
        to={{ pathname: "/login" }}
        state={{ path: location.pathname }}
      />
    );
  return <MovieForm />;
}

export default RequireAuth;

// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import auth from "../../services/authService";
// import MovieForm from "../movieForm";

// function RequireAuth({ children }) {
//   if (auth.getCurrentUser() === null) return <Navigate to="/login" />;
//   return <MovieForm />;
// }

// export default RequireAuth;
