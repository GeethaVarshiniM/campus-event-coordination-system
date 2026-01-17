import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">College Events</span>

      {user && (
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}
        >
          Logout
        </button>
      )}

      {!user && (
        <div>
          <Link className="btn btn-sm btn-light me-2" to="/">
            Login
          </Link>
          <Link className="btn btn-sm btn-light" to="/signup">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
