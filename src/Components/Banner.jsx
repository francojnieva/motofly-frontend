import React from "react";
import "../styles/Banner.css";
function Banner() {
  return (
    <section className="banner-info pt-5 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="row">
              <div className="col-auto">
                <i className="bi bi-truck"></i>
              </div>
              <div className="col">
                <h3>ENVIOS A TODO EL PAIS</h3>
                <p>Gratis a partir de $12.000</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="row">
              <div className="col-auto">
                <i className="bi bi-truck"></i>
              </div>
              <div className="col">
                <h3>ENVIOS A TODO TUCUMÁN</h3>
                <p>A partir de los $4.000</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="row">
              <div className="col-auto">
                <i className="bi bi-credit-card"></i>
              </div>
              <div className="col">
                <h3>PAGA COMO QUIERAS</h3>
                <p>Tarjetas de crédito o efectivo</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="row">
              <div className="col-auto">
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="col">
                <h3>COMPRA CON SEGURIDAD</h3>
                <p>Tus datos siempre protegidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
