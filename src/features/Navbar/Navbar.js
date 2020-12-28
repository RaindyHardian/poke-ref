import React, { useRef } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const pages = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Category",
    route: "/category",
  },
  {
    label: "Search",
    route: "/search",
  },
];
const Navbar = () => {
  const navListRef = useRef();
  let expanded = false;
  const navbarToggle = () => {
    const list = navListRef.current.children;
    // console.log(list[0].classList);
    if (!expanded) {
      navListRef.current.classList.remove("close");
      for (let item of list) {
        item.classList.remove("hideText");
      }
      navListRef.current.classList.add("open");
    } else {
      navListRef.current.classList.remove("open");
      for (let item of list) {
        item.classList.add("hideText");
      }
      navListRef.current.classList.add("close");
    }
    expanded = !expanded;
  };
  return (
    <div className="navbar__container">
      <NavLink to="/" className="navbar__link">
        <div className="navbar__logo">
          <img src="/pokeball.svg" className="navbar__icon" alt="logo" />
          <div className="navbar__name">Poke-ref</div>
        </div>
      </NavLink>
      <div className="navbar__expand" onClick={navbarToggle}>
        Expand
      </div>
      <div className="navbar__list" ref={navListRef}>
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
