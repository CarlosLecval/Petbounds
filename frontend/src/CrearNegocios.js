import React, { Component } from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/css/Login-Form-Dark-1.css";
import "./assets/css/Login-Form-Dark.css";
import "./assets/css/Registration-Form-with-Photo.css";
import "./assets/css/styles.css";
import "./assets/css/Team-Boxed.css";
import "./index.css";
import "./assets/fonts/font-awesome.min.css";
import logo from "./assets/img/petbounds_blanco.png";
import { Link } from "react-router-dom";

class CrearNegocio extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-light navbar-expand-lg fixed-top bg-dark"
          id="mainNav"
          style={{ color: "var(--gray-dark)" }}
        >
          <div className="container">
            <Link to="/">
              <a style={{ cursor: "pointer" }}>
                <img
                  className="img-fluid d-lg-flex justify-content-lg-center"
                  src={logo}
                  width="500"
                  style={{ textAlign: "center" }}
                />
              </a>
            </Link>
          </div>
        </nav>
        <section className="register-photo">
          <div className="form-container">
            <form method="post">
              <h2 className="text-center">
                <strong>Crea tu cuenta</strong>
              </h2>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Correo"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre del negocio"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Número de telefono"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Contraseña"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Dirección del negocio"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Crear cuenta
                </button>
              </div>
              <a className="already" href="login.html">
                ¿Ya tienes una cuenta? Inicia sesión aquí&nbsp;
              </a>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
export default CrearNegocio;
