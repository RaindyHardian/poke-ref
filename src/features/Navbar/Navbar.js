import React from "react";
import "./navbar.css";
import { NavLink} from "react-router-dom";

const pages = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "Category",
    route: "/category"
  },
  {
    label: "Search",
    route: "/search"
  }
];
const Navbar = () => {
  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <img src="/pikachu-crop.png" className="navbar__icon" alt="logo" />
        <div className="navbar__name">Poke-ref</div>
      </div>
      <div className="navbar__list">
        {pages.map(({ label, route }) => (
          <NavLink
            exact
            to={route}
            key={route}
            className="navbar__link"
            activeClassName="navbar__active"
          >
            <div className="navbar__list-item">{label}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
