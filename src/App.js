import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Navigate } from "react-router-dom";

import Customers from "./components/customers";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Home from "./components/home";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import RequireAuth from "./components/common/requireAuth";

function App({ user }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setData(user);
  }, []);
  return (
    <>
      <ToastContainer />
      <NavBar user={data} />
      <main className="container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/movies/:id"
            element={
              <RequireAuth>
                <MovieForm />
              </RequireAuth>
            }
          />
          <Route
            path="/movies"
            element={!user ? <Movies user={data} /> : <Navigate to="/login" />}
          />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
