import React from "react";
import { Route, Routes } from "react-router-dom";
import Customers from "./components/customers";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Home from "./components/home";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import "./App.css";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <main className="container">
      <NavBar />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/movies/:id" element={<MovieForm />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
