import React, { useRef } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const pages = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Type",
    route: "/type",
  },
];
const Navbar = () => {
  const navListRef = useRef();
  const navShadowRef = useRef();
  let expanded = false;
  const navbarToggle = () => {
    const list = navListRef.current.children;
    if (!expanded) {
      navListRef.current.classList.remove("close");
      for (let item of list) {
        item.classList.remove("hideText");
      }
      navListRef.current.classList.add("open");
      navShadowRef.current.classList.add("open");
    } else {
      navListRef.current.classList.remove("open");
      navShadowRef.current.classList.remove("open");
      for (let item of list) {
        item.classList.add("hideText");
      }
      navListRef.current.classList.add("close");
    }
    expanded = !expanded;
  };
  return (
    <div className="navbar__container">
      <NavLink to="/" className="navbar__logo">
          <img src="/pokeball.svg" className="navbar__icon" alt="logo" />
          <div className="navbar__name">Poke-ref</div>
      </NavLink>
      <div className="navbar__expand" onClick={navbarToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="navbar__shadow" ref={navShadowRef}></div>
      <div className="navbar__list" ref={navListRef}>
        {pages.map(({ label, route }) => (
          <NavLink
            exact
            to={route}
            key={route}
            className="navbar__link"
            activeClassName="navbar__active"
            data-testid={label}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
