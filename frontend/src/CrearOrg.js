import React, { useState } from "react";
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
import { gql, useMutation } from "@apollo/client";

const REGISTRO_ORG = gql`
  mutation (
    $registroOrgCorreo: String!
    $registroOrgContra: String!
    $registroOrgNombre: String!
    $registroOrgTelefono: String!
    $registroOrgPagina: String
    $registroOrgDireccion: String
  ) {
    registroOrg(
      correo: $registroOrgCorreo
      contra: $registroOrgContra
      nombre: $registroOrgNombre
      telefono: $registroOrgTelefono
      pagina: $registroOrgPagina
      direccion: $registroOrgDireccion
    ) {
      id
    }
  }
`;

function CrearOrg(props) {
  const [values, setValues] = useState({
    correo: "",
    nombre: "",
    contrasena: "",
    direccion: "",
    telefono: "",
    pagina: "",
  });
  const [registro] = useMutation(REGISTRO_ORG, {
    onCompleted({ registroOrg }) {
      if (registroOrg != null) {
        props.history.push("/IniciaSesion");
      } else {
        alert("El correo ya está registrado");
      }
    },
    variables: {
      registroOrgCorreo: values.correo,
      registroOrgContra: values.contrasena,
      registroOrgNombre: values.nombre,
      registroOrgTelefono: values.telefono,
      registroOrgPagina: values.pagina,
      registroOrgDireccion: values.direccion,
    },
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var i = 0;
    if (
      values.nombre !== " " &&
      values.correo !== " " &&
      values.contrasena !== " " &&
      values.telefono !== " " &&
      values.direccion !== "" &&
      values.pagina !== " "
    ) {
      i++;
    } else {
      alert("Contesta correctamente todos los campos");
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.correo)) {
      i++;
      document.getElementById("errorCorreo").innerHTML = "";
    } else {
      document.getElementById("errorCorreo").innerHTML =
        "Escribe correctamente el correo";
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(values.contrasena)) {
      i++;
      document.getElementById("errorContra").innerHTML = "";
    } else {
      document.getElementById("errorContra").innerHTML =
        "La contraseña debe tener más de 8 caracteres, mayúsculas y números";
    }
    if (i === 3) {
      registro();
    }
  };
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
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">
              <strong>Crea tu cuenta</strong>
            </h2>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="correo"
                placeholder="Correo"
                value={values.correo}
                onChange={handleChange}
                required
              />
              <div className="form-group">
                <p className="errorCo" id="errorCorreo"></p>
              </div>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Nombre de la organización"
                name="nombre"
                onChange={handleChange}
                value={values.nombre}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="tel"
                placeholder="Número telefónico de la organización"
                name="telefono"
                onChange={handleChange}
                value={values.telefono}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Contraseña"
                name="contrasena"
                onChange={handleChange}
                value={values.contrasena}
              />
            </div>
            <div className="form-group">
              <p className="errorCo" id="errorContra"></p>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Página web"
                name="pagina"
                onChange={handleChange}
                value={values.pagina}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Dirección"
                name="direccion"
                onChange={handleChange}
                value={values.direccion}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Crear cuenta
              </button>
            </div>
            <Link to="/IniciaSesion" className="already">
              ¿Ya tienes una cuenta? Inicia sesión aquí&nbsp;
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}
export default CrearOrg;
