import React from "react";
import "./ConfirmDialog.scss"
const ConfirmDialog = ({cancelFunc,aceptFunc}) => {
  return (
    <section className="ConfirmDialog">
      <header>
        <h1>¿Esta seguro de realizar esta accion?</h1>
      </header>
      <ul>
        <li>
            <button onClick={cancelFunc}>Cancelar</button>
        </li>
        <li>
            <button onClick={aceptFunc}>Aceptar</button>
        </li>
      </ul>
    </section>
  );
};

export default ConfirmDialog;
