import React from "react";
import "./navbar.scss";
const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="sass.html">
              <i class="bi bi-heart"></i>

            </a>
          </li>
          <li>
            <a href="badges.html"><i class="bi bi-person-circle"></i></a>
          </li>
          <li>
            <a href="collapsible.html"><i class="bi bi-basket3"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
