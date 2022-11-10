import React from 'react'
import '../Navbar/navbar.scss'
import './FooterStyle.scss'
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content__left">
        <img src="/Images/cetaphIcono.png" alt="logo" />
        <div className="details">
          <h1 className="title">Contactanos</h1>
          <div className="text">
            <p>
              <i className="bi bi-geo-alt"></i>Mendoza Argentina
            </p>
            <p>
              <i className="bi bi-telephone"></i>+54-9-2616172242
            </p>
            <p>
              <i className="bi bi-envelope-open"></i>cetaphMR@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="footer-content__right">
        <div className="details">
          <h1 className="title">Metodos De Pago</h1>
          <div className="payment-methods">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-amex"></i>
            <i className="fa-brands fa-cc-paypal"></i>
            <span className="own-card">
              <img src="/Images/mercado-pago-logo.png" />
            </span>
            <span className="own-card">
              <i className="fa-solid fa-building-columns"></i>
            </span>
          </div>
        </div>
        <img src="/Images/ViniloFooter.png" alt="" />
      </div>
    </div>
  )
}

export default Footer
