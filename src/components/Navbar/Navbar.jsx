import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ButtonRegular from "../Buttons/ButtonRegular";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className={`${styles.nav}`}>
      <NavLink to="/">Anoday Anode $</NavLink>

      {isLoggedIn && (
        <div className={`${styles.nav__links}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            end
          >
            Check In / Journal
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Profile
          </NavLink>
          <ButtonRegular handleClick={logOutUser}>Logout</ButtonRegular>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <ButtonRegular>
            <NavLink to="/login">Login</NavLink>
          </ButtonRegular>
          <ButtonRegular>
            <NavLink to="/signup">Sign Up</NavLink>
          </ButtonRegular>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
