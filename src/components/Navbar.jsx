import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* Always visible to everyone */}
      <Link to="/" style={{ marginRight: "20px" }}>
        Books
      </Link>

      {/* Only visible to logged-in users */}
      {auth.isAuth && (
        <Link to="/my-books" style={{ marginRight: "20px" }}>
          My Books
        </Link>
      )}

      {/* Show email or login/logout */}
      <span style={{ float: "right" }}>
        {auth.isAuth ? (
          <>
            <span style={{ marginRight: "20px" }}>{auth.user?.email}</span>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </span>
    </div>
  );
};

export default Navbar;
