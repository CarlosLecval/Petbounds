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

const REGISTRO_USUARIO = gql`
  mutation (
    $registroUsuarioCorreo: String!
    $registroUsuarioContra: String!
    $registroUsuarioNombre: String!
    $registroUsuarioApellidoP: String!
    $registroUsuarioApellidoM: String!
    $registroUsuarioNickname: String!
    $registroUsuarioNacimiento: Date
    $registroUsuarioGenero: String
  ) {
    registroUsuario(
      correo: $registroUsuarioCorreo
      contra: $registroUsuarioContra
      nombre: $registroUsuarioNombre
      apellidoP: $registroUsuarioApellidoP
      apellidoM: $registroUsuarioApellidoM
      nickname: $registroUsuarioNickname
      nacimiento: $registroUsuarioNacimiento
      genero: $registroUsuarioGenero
    ) {
      id
    }
  }
`;

function CrearUsuario(props) {
  const [values, setValues] = useState({
    correo: "",
    nickname: "",
    nombre: "",
    apellidop: "",
    apellidom: "",
    contrasena: "",
    nacimiento: null,
    genero: "",
  });
  const [registro] = useMutation(REGISTRO_USUARIO, {
    onCompleted({ registroUsuario }) {
      if (registroUsuario != null) {
        props.history.push("/IniciaSesion");
      } else {
        alert("El correo ya está registrado");
      }
    },
    variables: {
      registroUsuarioCorreo: values.correo,
      registroUsuarioContra: values.contrasena,
      registroUsuarioNombre: values.nombre,
      registroUsuarioApellidoP: values.apellidop,
      registroUsuarioApellidoM: values.apellidom,
      registroUsuarioNacimiento: values.nacimiento,
      registroUsuarioNickname: values.nickname,
      registroUsuarioGenero: values.genero,
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
      values.apellidop !== " " &&
      values.apellidom !== " " &&
      values.nickname !== " " &&
      values.genero !== "Género"
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
                value={values.correo}
                onChange={handleChange}
                className="form-control"
                type="email"
                name="correo"
                required
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <p className="errorCo" id="errorCorreo"></p>
            </div>
            <div className="form-group">
              <input
                value={values.nombre}
                onChange={handleChange}
                className="form-control"
                name="nombre"
                type="text"
                required
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                value={values.apellidop}
                onChange={handleChange}
                className="form-control"
                name="apellidop"
                type="text"
                required
                placeholder="Apellido paterno"
              />
            </div>
            <div className="form-group">
              <input
                value={values.apellidom}
                onChange={handleChange}
                className="form-control"
                name="apellidom"
                type="text"
                required
                placeholder="Apellido materno"
              />
            </div>
            <div className="form-group">
              <input
                value={values.nickname}
                onChange={handleChange}
                className="form-control"
                type="text"
                name="nickname"
                required
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                value={values.contrasena}
                onChange={handleChange}
                name="contrasena"
                required
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <p className="errorCo" id="errorContra"></p>
            </div>
            <h3 className="d-lg-flex justify-content-lg-start already">
              Fecha de nacimiento
            </h3>
            <input
              className="form-control"
              type="date"
              name="nacimiento"
              value={values.nacimiento}
              onChange={handleChange}
              required
            />
            <select
              className="form-control"
              onChange={handleChange}
              value={values.genero}
              name="genero"
              required
            >
              <option value="">Género</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
            </select>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Crear cuenta
              </button>
            </div>
            <Link to="/IniciaSesion" className="already" href="login.html">
              ¿Ya tienes una cuenta? Inicia sesión aquí
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}
export default CrearUsuario;
