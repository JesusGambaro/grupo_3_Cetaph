import React from "react";
import "../Navbar/navbar.scss";
import "./FooterStyle.scss";
const Footer = () => {
  return (
    <div>
      <div className="Footer">
        <span className="info">
          <div className="nav-wrapper">
            <span className="logo">
              <h1 className="logo-title">CETAPH</h1>
              <h2 className="logo-subtitle">MUSIC RECORDS</h2>
            </span>
          </div>
          <div className="details">
              <h1 className="title">Contactanos</h1>
            <div className="text">
              <h1>
                <i class="bi bi-geo-alt"></i>Mendoza Argentina
              </h1>
              <h1>
                <i class="bi bi-telephone"></i>+5492616172242
              </h1>
              <h1>
                <i class="bi bi-envelope-open"></i>cetaphMR@gmail.com
              </h1>
            </div>
          </div>
        </span>
        <span className="about-us">
          <span className="details">
            <h1 className="title">Redes</h1>
            <div className="redes">
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-facebook"></i>
            </div>
          </span>
          <span className="details">
            <h1 className="title">Metodos De Pago</h1>
            <div className="tarjetas">
              <i class="fa-brands fa-cc-visa"></i>
              <i class="fa-brands fa-cc-mastercard"></i>
            </div>
          </span>
        </span>
        <img src="./imagenes/ViniloFooter.png" alt="" />
      </div>
    </div>
  );
};

export default Footer;
