import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* Always visible */}
      <Link to="/" style={{ marginRight: "20px" }}>
        Books
      </Link>

      {/* Only for logged-in users */}
      {auth.isAuth && (
        <Link to="/my-books" style={{ marginRight: "20px" }}>
          My Books
        </Link>
      )}

      {/* Right side: email + logout (if logged in) OR login/register (if not) */}
      <span style={{ float: "right" }}>
        {auth.isAuth ? (
          <>
            <span style={{ marginRight: "20px" }}>{auth.user?.email}</span>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "20px" }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </span>
    </div>
  );
};

export default Navbar;
