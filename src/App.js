import React from "react";
import { Route, redirect } from "react-router-dom";
import "./App.css";
import Customers from "./components/customers";
import Movies from "./components/movies";
import Rentals from "./components/rentals";

function App() {
  return (
    <main className="container">
      <Route path="/movies" element={Movies} />
      <Route path="/customers" element={Customers} />
      <Route path="/rentals" element={Rentals} />
      <Route path="/" element={Movies} />
    </main>
  );
}

export default App;
