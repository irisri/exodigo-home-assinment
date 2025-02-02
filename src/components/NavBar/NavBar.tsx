import { NavLink } from "react-router";
import "./style.css";

export const NavBar = () => {
  return (
    <div className="nav-container">
      <NavLink to="/">
        <h1>The cocktail DB</h1>
      </NavLink>
    </div>
  );
};
