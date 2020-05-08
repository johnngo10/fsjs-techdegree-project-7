import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/shibas">Shibas</NavLink>
        </li>
        <li>
          <NavLink to="/cats">Cats</NavLink>
        </li>
        <li>
          <NavLink to="/french-fries">French Fries</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
