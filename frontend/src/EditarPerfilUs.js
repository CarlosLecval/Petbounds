import React, { useEffect, useState } from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/font-awesome.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import "./assets/css/styles.css";
import "./assets/css/Article-Clean.css";
import "./assets/css/Highlight-Phone.css";
import "./assets/css/Navigation-Clean.css";
import "./assets/css/Navigation-with-Search.css";
import "./index.css";
import "./assets/fonts/font-awesome.min.css";
import logo from "./assets/img/petbounds_blanco.png";
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import "bootstrap";
import "filereader";
import "bootstrap/dist/js/bootstrap.js";
import { useHistory } from "react-router-dom";
import Error from "./Error";

const USUARIO = gql`
  query ($usuarioId: ID!) {
    usuario(id: $usuarioId) {
      id
      nombre
      apellidop
      apellidom
      foto
      nickname
      nacimiento
      identificacion
      comprobante
    }
  }
`;
const ELIMINAR_USUARIO = gql`
  mutation ($borrarUsuarioId: ID!) {
    borrarUsuario(id: $borrarUsuarioId) {
      success
    }
  }
`;
const UPDATE_USUARIO = gql`
  mutation (
    $modificacionUsuarioId: String!
    $modificacionUsuarioNombre: String
    $modificacionUsuarioApellidop: String
    $modificacionUsuarioApellidom: String
    $modificacionUsuarioFoto: String
    $modificacionUsuarioIdentificacion: String
    $modificacionUsuarioComprobante: String
  ) {
    modificacionUsuario(
      id: $modificacionUsuarioId
      nombre: $modificacionUsuarioNombre
      apellidop: $modificacionUsuarioApellidop
      apellidom: $modificacionUsuarioApellidom
      foto: $modificacionUsuarioFoto
      identificacion: $modificacionUsuarioIdentificacion
      comprobante: $modificacionUsuarioComprobante
    ) {
      success
      message
    }
  }
`;
const rutaPerfil = "/PerfilUs";
const rutaHome = "/HomeUs";
const rutaServicios = "/ServiciosUs";
const rutaDonaciones = "/DonacionesUs";
const rutaMisAdopciones = "/MisAdopcionesUs";
const rutaMisLikes = "/MisLikesUs";
//Aquí link al soporte xfas jeje
const rutaAyuda = "";
function EditarPerfilUs() {
  if (localStorage.getItem("flagUsuario") === "true") {
    return (
      <div>
        <Header />
        <Cuerpo />
      </div>
    );
  } else {
    return <Error></Error>;
  }
}
function Header(props) {
  let history = useHistory;
  const [estado, setEstado] = useState(false);
  const handleClick = () => {
    var estadoN = !estado;
    setEstado(estadoN);
  };

  return (
    <div>
      <div
        className="d-inline-flex justify-content-between align-items-center"
        id="header-menu"
        style={{ color: "var(--white)" }}
      >
        <a className="texto-menu-sup" onClick={handleClick}>
          <img
            className="rounded-circle"
            src={localStorage.getItem("fotoUsuario")}
          />
        </a>
        <Link to={rutaHome} className="texto-menu-sup">
          Adopciones
        </Link>
        <Link to={rutaServicios} className="texto-menu-sup">
          Servicios
        </Link>
        <Link to={rutaDonaciones} className="texto-menu-sup">
          Donaciones
        </Link>
      </div>
      <div>
        <Link to={rutaHome}>
          <img className="logo-petbounds" src={logo} />
        </Link>
      </div>
      {estado === false ? null : (
        <div
          className="text-left d-flex flex-column justify-content-start align-self-end ml-auto justify-content-sm-start"
          id="menu"
        >
          <button className="btn toggle-menu-left" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          <img
            className="rounded-circle imagen-perfil-menu"
            onClick={handleClick}
            src={localStorage.getItem("fotoUsuario")}
          />
          <h6 className="text-white hola-menu">
            Hola, {localStorage.getItem("nombreUsuario")}
          </h6>
          <Link
            to={rutaPerfil}
            className="d-flex justify-content-start align-items-center perfil-menu-text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-person"
            >
              <path
                fillRule="evenodd"
                d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
              ></path>
            </svg>
            Ver perfil
          </Link>
          <Link
            to={rutaMisAdopciones}
            className="d-flex justify-content-start align-items-center perfil-menu-text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-file-text"
              style={({ marginRight: "5px" }, { fontSize: "31px" })}
            >
              <path
                fillRule="evenodd"
                d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"
              ></path>
              <path
                fillRule="evenodd"
                d="M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
              ></path>
            </svg>
            Mis solicitudes
          </Link>
          <Link
            to={rutaMisLikes}
            className="d-flex justify-content-start align-items-center perfil-menu-text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-heart"
              style={({ marginRight: "5px" }, { fontSize: "19px" })}
            >
              <path
                fillRule="evenodd"
                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              ></path>
            </svg>
            Mis Likes
          </Link>
          <a
            onClick={() => {
              localStorage.setItem("flagUsuario", "false");
              localStorage.setItem("nombreUsuario", "");
              localStorage.setItem("fotoUsuario", "");
              history.push("/");
            }}
            className="d-flex justify-content-start align-items-center perfil-menu-text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-box-arrow-left"
              style={({ marginRight: "5px" }, { fontSize: "19px" })}
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              ></path>
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              ></path>
            </svg>
            Salir
          </a>
        </div>
      )}
    </div>
  );
}
function Cuerpo(props) {
  let history = useHistory();
  const [estado, setEstado] = useState(true);
  const eliminar = () => {
    setEstado(!estado);
  };
  const [values, setValues] = useState({
    nombre: "",
    apellidop: "",
    apellidom: "",
    bandera: false,
    banderaFoto: false,
  });
  const [eliminarCuenta] = useMutation(ELIMINAR_USUARIO, {
    onCompleted({ borrarUsuario }) {
      if (borrarUsuario.success) {
        history.push("/");
      }
    },
    variables: {
      borrarUsuarioId: localStorage.getItem("idUsuario"),
    },
  });
  const handleIdentifacion = (e) => {
    var fileList = e.target.files;
    var texto_poner = fileList[0].name;
    const enlaceIden =
      "http://52.43.69.219:4000/api/foto?nom=" +
      fileList[0].name +
      "&cont=" +
      fileList[0].type;
    fetch(enlaceIden, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const formData = new FormData();
        Object.keys(data.data.fields).forEach((key) => {
          formData.append(key, data.data.fields[key]);
        });
        formData.append("file", fileList[0]);
        const xhr = new XMLHttpRequest();
        function getUrl() {
          return new Promise(function (resolve, reject) {
            xhr.open("POST", data.data.url, true);
            xhr.send(formData);
            xhr.onload = function () {
              if (this.status === 204) {
                resolve(
                  "https://petbounds.s3-us-west-2.amazonaws.com/" +
                    fileList[0].name
                );
              } else {
                reject(this.responseText);
              }
            };
          });
        }
        getUrl()
          .then((result) => {
            localStorage.setItem("iden", result);
          })
          .catch((e) => console.log(e));
      });
    document.getElementById("identificacion-label").innerHTML = texto_poner;
  };
  const handleComprobante = (e) => {
    var fileList = e.target.files;
    var texto_poner = fileList[0].name;
    const enlaceCompro =
      "http://52.43.69.219:4000/api/foto?nom=" +
      fileList[0].name +
      "&cont=" +
      fileList[0].type;
    fetch(enlaceCompro, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const formData = new FormData();
        Object.keys(data.data.fields).forEach((key) => {
          formData.append(key, data.data.fields[key]);
        });
        formData.append("file", fileList[0]);
        const xhr = new XMLHttpRequest();
        function getUrl() {
          return new Promise(function (resolve, reject) {
            xhr.open("POST", data.data.url, true);
            xhr.send(formData);
            xhr.onload = function () {
              if (this.status === 204) {
                resolve(
                  "https://petbounds.s3-us-west-2.amazonaws.com/" +
                    fileList[0].name
                );
              } else {
                reject(this.responseText);
              }
            };
          });
        }
        getUrl()
          .then((result) => {
            localStorage.setItem("compro", result);
          })
          .catch((e) => console.log(e));
      });
    document.getElementById("comprobante-label").innerHTML = texto_poner;
  };
  const handleFotoPerfil = (e) => {
    var fileList = e.target.files;
    const reader = new FileReader();
    setValues({ banderaFoto: true });
    const enlaceFoto =
      "http://52.43.69.219:4000/api/foto?nom=" +
      fileList[0].name +
      "&cont=" +
      fileList[0].type;
    fetch(enlaceFoto, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const formData = new FormData();
        Object.keys(data.data.fields).forEach((key) => {
          formData.append(key, data.data.fields[key]);
        });
        formData.append("file", fileList[0]);
        const xhr = new XMLHttpRequest();
        function getUrl() {
          return new Promise(function (resolve, reject) {
            xhr.open("POST", data.data.url, true);
            xhr.send(formData);
            xhr.onload = function () {
              console.log(this.status)
              if (this.status === 204) {
                resolve(
                  "https://petbounds.s3-us-west-2.amazonaws.com/" +
                    fileList[0].name
                );
              } else {
                reject(this.responseText);
              }
            };
          });
        }
        getUrl()
          .then((result) => {
            localStorage.setItem("foto", result);
          })
          .catch((e) => console.log("error rip",e));
      });
    reader.addEventListener("load", (event) => {
      document
        .getElementById("foto-perfil-editar")
        .setAttribute("src", event.target.result);
    });
    reader.readAsDataURL(fileList[0]);
  };
  const [modificar_usuario] = useMutation(UPDATE_USUARIO, {
    variables: {
      modificacionUsuarioId: localStorage.getItem("idUsuario"),
      modificacionUsuarioNombre: values.nombre,
      modificacionUsuarioApellidop: values.apellidop,
      modificacionUsuarioApellidom: values.apellidom,
      modificacionUsuarioFoto: localStorage.getItem("foto"),
      modificacionUsuarioIdentificacion: localStorage.getItem("iden"),
      modificacionUsuarioComprobante: localStorage.getItem("compro"),
    },
    onCompleted({ modificacionUsuario }) {
      if (modificacionUsuario.success) {
        localStorage.setItem("fotoUsuario", localStorage.getItem("foto"));
        window.location.reload();
      }
    },
  });
  const handleCampos = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (values.bandera) {
      modificar_usuario();
    }
  });
  const onSubmit = (e) => {
    e.preventDefault();
    var nuevoNom = "";
    var nuevoAP = "";
    var nuevoAM = "";
    if (values.nombre === " " || values.nombre === "") {
      nuevoNom = document
        .getElementById("nombreUs")
        .getAttribute("placeholder");
    } else {
      nuevoNom = values.nombre;
    }
    if (values.apellidop === " " || values.apellidop === "") {
      nuevoAP = document
        .getElementById("apellidopUs")
        .getAttribute("placeholder");
    } else {
      nuevoAP = values.apellidop;
    }
    if (values.apellidom === " " || values.apellidom === "") {
      nuevoAM = document
        .getElementById("apellidomUs")
        .getAttribute("placeholder");
    } else {
      nuevoAM = values.apellidom;
    }
    if (values.banderaFoto === false) {
      localStorage.setItem(
        "foto",
        document.getElementById("foto-perfil-editar").getAttribute("src")
      );
    }
    setValues({
      nombre: nuevoNom,
      apellidom: nuevoAM,
      apellidop: nuevoAP,
      bandera: true,
    });
  };
  const { loading, error, data } = useQuery(USUARIO, {
    variables: {
      usuarioId: localStorage.getItem("idUsuario"),
    },
  });
  if (error) return <Error></Error>;
  if (loading) return null;
  else {
    return (
      <div className="container contenedor-main">
        {estado === false ? (
          <div className="eliminar-cuenta-adv">
            <h3 className="d-xl-flex" style={{ fontFamily: "Lexend" }}>
              ¿Estás seguro de eliminar tu cuenta?
            </h3>
            <div className="d-xl-flex justify-content-xl-center" role="group">
              <button className="btn boton-cancelar" onClick={eliminar}>
                No, continuar
              </button>
              <button
                className="btn btn-primary boton-eliminar"
                type="button"
                onClick={eliminarCuenta}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        ) : null}
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 d-flex flex-column"></div>
          <div
            className="col-12 col-md-4 col-lg-4 col-xl-4 d-flex flex-column"
            id="menu-lateral"
          >
            <Link to={rutaPerfil} className="link-perfil">
              <span className="text-left texto-menu-lateral-con-foto">
                <img
                  className="rounded-circle foto-perfil-menu-lateral"
                  src={localStorage.getItem("fotoUsuario")}
                />
                <strong>{localStorage.getItem("nombreUsuario")}</strong>
              </span>
            </Link>
            <Link to={rutaHome} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <i className="fa fa-paw"></i>
                <strong>Adopciones</strong>
              </span>
            </Link>
            <Link to={rutaServicios} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <i className="fa fa-shopping-cart"></i>
                <strong>Servicios</strong>
              </span>
            </Link>
            <Link to={rutaDonaciones} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <i className="fa fa-money"></i>
                <strong>Donaciones</strong>
              </span>
            </Link>
            <Link to={rutaMisAdopciones} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="bi bi-file-earmark-text"
                >
                  <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"></path>
                  <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"></path>
                  <path
                    fillRule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                  ></path>
                </svg>
                <strong>Mis adopciones</strong>
              </span>
            </Link>
            <Link to={rutaMisLikes} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <i className="fa fa-heart-o"></i>
                <strong>Mis likes</strong>
              </span>
            </Link>
            <Link to={rutaAyuda} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="bi bi-question-octagon"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"
                  ></path>
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                </svg>
                <strong>Ayuda</strong>
                <br />
              </span>
            </Link>
            <a
              onClick={() => {
                localStorage.setItem("flagUsuario", "false");
                localStorage.setItem("nombreUsuario", "");
                localStorage.setItem("fotoUsuario", "");
                history.push("/");
              }}
              className="d-flex justify-content-start align-items-center perfil-menu-text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="bi bi-box-arrow-left"
                style={({ marginRight: "5px" }, { fontSize: "19px" })}
              >
                <path
                  fillRule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                ></path>
              </svg>
              Salir
            </a>
          </div>
          <div className="col-12 col-md-8 col-lg-8 col-xl-8 d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex flex-column justify-content-start align-items-center justify-content-sm-start align-items-sm-center justify-content-md-start align-items-md-center justify-content-lg-start align-items-lg-center justify-content-xl-start align-items-xl-center principal-editar">
            <form
              onSubmit={onSubmit}
              className="d-flex d-xl-flex flex-column justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
            >
              <div className="form-group">
                <div
                  className="d-flex align-items-end"
                  style={{ marginRight: "31px!important" }}
                >
                  <img
                    className="rounded-circle foto-editar"
                    id="foto-perfil-editar"
                    src={data.usuario.foto}
                  />
                  <input
                    className="form-control-file file"
                    type="file"
                    id="foto_perfil_file"
                    onChange={handleFotoPerfil}
                    accept="image/png, image/jpeg"
                  />
                  <label
                    htmlFor="foto_perfil_file"
                    style={({ marginBottom: "35px" }, { marginLeft: "-37px" })}
                  >
                    <span className="d-flex justify-content-center align-items-center foto_icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="foto-icon-editar"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="bi bi-camera"
                        style={{ color: "rgb(255,255,255)" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 12V6a1 1 0 0 0-1-1h-1.172a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 9.173 3H6.828a1 1 0 0 0-.707.293l-.828.828A3 3 0 0 1 3.172 5H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        ></path>
                        <path d="M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div
                className="form-group align-self-start"
                style={{ width: "278px" }}
              >
                <h6 style={{ fontFamily: "Lexend" }}>Nombre:</h6>
                <input
                  name="nombre"
                  id="nombreUs"
                  onChange={handleCampos}
                  className="form-control form-editar"
                  type="text"
                  placeholder={data.usuario.nombre}
                />
              </div>
              <div
                className="form-group align-self-start"
                style={{ width: "278px" }}
              >
                <h6 style={{ fontFamily: "Lexend" }}>Apellido paterno:</h6>
                <input
                  name="apellidop"
                  id="apellidopUs"
                  onChange={handleCampos}
                  className="form-control form-editar"
                  type="text"
                  placeholder={data.usuario.apellidop}
                />
              </div>
              <div
                className="form-group align-self-start"
                style={{ width: "278px" }}
              >
                <h6 style={{ fontFamily: "Lexend" }}>Apellido materno:</h6>
                <input
                  name="apellidom"
                  id="apellidomUs"
                  onChange={handleCampos}
                  className="form-control form-editar"
                  type="text"
                  placeholder={data.usuario.apellidom}
                />
              </div>
              <div
                className="form-group align-self-start"
                style={{ width: "278px" }}
              >
                <h6 style={{ fontFamily: "Lexend" }}>Documentos:</h6>
                <label
                  className="d-flex justify-content-start align-items-start label_input_file"
                  htmlFor="ine_editar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={({ marginRight: "5px" }, { fontSize: "22px" })}
                  >
                    <path
                      d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <p id="identificacion-label">Identificación</p>
                </label>
                <input
                  onChange={handleIdentifacion}
                  accept=".doc,.docx,.pdf,image/png,image/jpeg,image/png"
                  className="form-control-file file"
                  type="file"
                  id="ine_editar"
                  style={{ marginBottom: "10px" }}
                />
                <label
                  className="d-flex align-items-start label_input_file"
                  htmlFor="comprobante_editar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={({ marginRight: "5px" }, { fontSize: "22px" })}
                  >
                    <path
                      d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <p id="comprobante-label">Comprobante</p>
                </label>
                <input
                  onChange={handleComprobante}
                  accept=".doc,.docx,.pdf,image/png,image/jpeg,image/png"
                  className="form-control-file file"
                  type="file"
                  id="comprobante_editar"
                />
              </div>
              <button className="btn btn-primary submit-editar" type="submit">
                Guardar cambios
              </button>
            </form>
            <div
              className="dropleft d-md-flex justify-content-end align-self-end justify-content-md-center align-items-md-center"
              id="menu-perfil"
            >
              <button
                className="btn btn-primary dropdown-toggle d-md-flex align-items-md-center dropdown-menu-perfil"
                aria-expanded="false"
                data-toggle="dropdown"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="bi bi-three-dots"
                  style={{ fontSize: "30px!important" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  ></path>
                </svg>
              </button>
              <div
                className="dropdown-menu drop-left-menu"
                style={
                  ({ marginRight: "0px" },
                  { width: "193.891px" },
                  { boxShadow: "4px 3px 20px rgb(0,0,0)" })
                }
              >
                <Link
                  to={rutaPerfil}
                  className="dropdown-item d-md-flex align-items-md-center editar-eliminar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="bi bi-person"
                    style={{ marginRight: "10px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                    ></path>
                  </svg>
                  Ver perfil
                </Link>
                <button
                  className="dropdown-item d-md-flex align-items-md-center editar-eliminar"
                  onClick={eliminar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="bi bi-person-x-fill"
                    style={{ marginRight: "10px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditarPerfilUs;
