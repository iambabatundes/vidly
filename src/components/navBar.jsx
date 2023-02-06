import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink
              className="nav-item nav-link active"
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>

            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>

            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>

            <NavLink to="/rentals" className="nav-item nav-link">
              Rentals
            </NavLink>
            {!user && (
              <>
                <NavLink to="/login" className="nav-item nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-item nav-link">
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink to="/profile" className="nav-item nav-link">
                  {user.name}
                </NavLink>
                <NavLink to="/logout" className="nav-item nav-link">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
