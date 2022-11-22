import React from "react";
import "./ConfirmDialog.scss"
const ConfirmDialog = ({cancelFunc,aceptFunc}) => {
  return (
    <section className="ConfirmDialog">
      <header className="header-dialog">
        <h1>¿Esta seguro de realizar esta accion?</h1>
      </header>
      <ul className="options-dialog">
        <li className="option">
            <button onClick={cancelFunc}>Cancelar</button>
        </li>
        <li className="option">
            <button onClick={aceptFunc}>Aceptar</button>
        </li>
      </ul>
    </section>
  );
};

export default ConfirmDialog;
