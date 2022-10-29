import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Gemma! or... Another Day.</Link>

      {isLoggedIn && (
        <div>
          <Link to="/">Check In</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logOutUser}>Logout</button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
