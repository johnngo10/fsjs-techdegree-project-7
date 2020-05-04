import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="">Shibas</NavLink>
        </li>
        <li>
          <NavLink to="">Cats</NavLink>
        </li>
        <li>
          <NavLink to="">French Fries</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
