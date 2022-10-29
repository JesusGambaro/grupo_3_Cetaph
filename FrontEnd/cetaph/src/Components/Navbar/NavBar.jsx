import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./navbar.scss";
const NavBar = () => {
  const navigate = useNavigate();
  const [usuarioIcon, setUsuarioIcon] = useState(false);
  return (
    <nav>
      <div className="nav-wrapper">
        <span className="logo" onClick={() => navigate("/Home")}>
          {/*   <h1 className="logo-title">CETAPH</h1>
          <h2 className="logo-subtitle">MUSIC RECORDS</h2> */}
          <img src="/Images/cetaphIcono.png" alt="logo" />
        </span>
        <ul className="nav-menu">
          <li className="nav-item">
            <p className="nav-link" onClick={() => navigate("/Home")}>
              Home
            </p>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={() => navigate("/Catalogue")}>
              Catalogue
            </p>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={() => navigate("/AboutUs")}>
              About
            </p>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={() => navigate("/Contact")}>
              Contact
            </p>
          </li>
        </ul>
        <ul className="nav-icons">
          {/* <li className="nav-icon">
            <p className="icon-link">
              <i className="bi bi-heart"></i>
            </p>
          </li> */}

          <li
            className="nav-icon"
            onClick={() => {
              setUsuarioIcon(!usuarioIcon);
            }}
          >
            <p className="icon-link">
              <i className="bi bi-person-circle"></i>
            </p>

            <ul className={"icon-options " + (usuarioIcon ? "active" : "")}>
              {localStorage.getItem("token") ? (
                <>
                  <li>{localStorage.getItem("rol")}</li>
                  <li
                    onClick={() => {
                      if (usuarioIcon) {
                        localStorage.clear();
                        navigate("/home");
                        setUsuarioIcon(false);
                      }
                    }}
                  >
                    Log Out
                  </li>
                  {localStorage.getItem("rol") === "Admin" && (
                    <li onClick={() => {
                      if (usuarioIcon) {
                        navigate("/AdminDashboard");
                        setUsuarioIcon(false);
                      }
                    }}>
                      Admin Dashboard
                    </li>
                  )}
                </>
              ) : (
                <li onClick={() =>  {
                  if (usuarioIcon) {
                    navigate("/login");
                    setUsuarioIcon(false);
                  }
                }}>
                  Log In
                </li>
              )}
            </ul>
          </li>
          <li className="nav-icon">
            <p className="icon-link">
              <i className="bi bi-basket3"></i>
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
