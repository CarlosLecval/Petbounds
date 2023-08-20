import React, { useState } from "react";
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
import Error from "./Error";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import { useHistory } from "react-router-dom";

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
const rutaPerfil = "/PerfilUs";
const rutaHome = "/HomeUs";
const rutaServicios = "/ServiciosUs";
const rutaDonaciones = "/DonacionesUs";
const rutaMisAdopciones = "/MisAdopcionesUs";
const rutaMisLikes = "/MisLikesUs";
const rutaEditarPerfil = "/EditarPerfilUs";
const rutaAyuda = "";
function PerfilUs() {
  if (localStorage.getItem("flagUsuario") === "true") {
    return (
      <div>
        <Header />
        <Cuerpo />
      </div>
    );
  } else {
    return (
      <Error></Error>
    );
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
function Cuerpo() {
  let history = useHistory();
  const [estado, setEstado] = useState(true);
  const eliminar = () => {
    setEstado(!estado);
  };
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
                  src={data.usuario.foto}
                />
                <strong>{data.usuario.nickname}</strong>
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
            <div
              className="dropleft d-md-flex justify-content-end align-self-end justify-content-md-center align-items-md-center"
              id="menu-perfil"
            >
              <button
                className="btn btn-primary dropdown-toggle d-md-flex align-items-md-center dropdown-menu-perfil"
                aria-expanded="false"
                data-toggle="dropdown"
                type="button"
                style={{ bordeRight: ".3em none!important" }}
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
                  to={rutaEditarPerfil}
                  className="dropdown-item d-md-flex align-items-md-center editar-eliminar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    style={{ marginRight: "10px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                    ></path>
                  </svg>
                  Editar perfil
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
            <img
              className="rounded-circle foto-perfil-perfil"
              src={data.usuario.foto}
            />
            <h4 className="nick-name-perfil">
              <strong>{data.usuario.nickname}</strong>
            </h4>
            
            <div className="align-self-start">
              <h6 className="title-nombre">Nombre completo:</h6>
              <h5 className="nombre-perfil-perfil">
                <strong>
                  {data.usuario.nombre} {data.usuario.apellidop}{" "}
                  {data.usuario.apellidom}
                </strong>
              </h5>
            </div>
            <div className="align-self-start">
              <h6 className="title-nombre">Fecha de nacimiento:</h6>
              <h5 className="nombre-perfil-perfil">
                <strong>{data.usuario.nacimiento}</strong>
              </h5>
            </div>
            <div className="align-self-start">
              <h6 className="title-nombre">Documentos:</h6>
            </div>
            <div className="align-self-start">
              <a
                href={data.usuario.identificacion}
                target="blank"
                className="btn btn-primary d-inline-flex align-items-center align-content-center boton-documento"
                role="button"
                style={{marginRight:'20px'}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="bi bi-file-text"
                  style={{ marginRight: "10px" }}
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
                  {data.usuario.identificacion!==null?(<p>{data.usuario.identificacion.slice(53)}</p>):(<p>No hay identificación</p>)}
              </a>
              <a
                href={data.usuario.comprobante}
                target="blank"
                className="btn btn-primary d-inline-flex align-items-center align-content-center boton-documento"
                type="button"
                style={
                  ({ marginTop: "10px" },
                  { borderStyle: "none" },
                  { background: "#606060" })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="bi bi-file-text"
                  style={{ marginRight: "10px" }}
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
                {data.usuario.comprobante!==null?(<p>{data.usuario.comprobante.slice(53)}</p>):(<p>No hay comprobante</p>)}
              </a>
              </div>
              </div>
              </div>
      </div>
    );
  }
}
export default PerfilUs;
