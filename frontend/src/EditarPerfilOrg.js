import React, { useState, useEffect } from "react";
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
import "bootstrap/dist/js/bootstrap.js";
import {useHistory} from 'react-router-dom'
import Error from './Error'

const ORGANIZACION = gql`
  query ($organizacionId: ID!) {
    organizacion(id: $organizacionId) {
      id
      nombre
      foto
      telefono
      pagina
      direccion
    }
  }
`;
const BORRAR_ORG = gql`
  mutation ($borrarOrgId: ID!) {
    borrarOrg(id: $borrarOrgId) {
      success
      message
    }
  }
`;

const UPDATE_ORG = gql`
  mutation (
    $modificacionOrgId: String!
    $modificacionOrgTelefono: String
    $modificacionOrgPagina: String
    $modificacionOrgFoto: String
    $modificacionOrgDireccion: String
  ) {
    modificacionOrg(
      id: $modificacionOrgId
      telefono: $modificacionOrgTelefono
      pagina: $modificacionOrgPagina
      foto: $modificacionOrgFoto
      direccion: $modificacionOrgDireccion
    ) {
      success
    }
  }
`;
var rutaPerfil = "/PerfilOrg";
var rutaHome = "/HomeOrg";
var rutaAdopciones = "/AdopcionesOrg";
var rutaDonaciones = "/DonacionesOrg";
var rutaMisMascotas = "/MisMascotasOrg";
function EditarPerfilOrg(props) {
  if (localStorage.getItem("flagOrg") === "true") {
    return (
      <div>
        <Header></Header>
        <Cuerpo></Cuerpo>
      </div>
    );
  } else {
    return <Error></Error>;
  }
}
function Header(props) {
  return (
    <div>
      <div
        className="d-inline-flex justify-content-between align-items-center"
        id="header-menu"
        style={{ color: "var(--white)" }}
      >
        <Link to={rutaPerfil} className="texto-menu-sup">
          <img
            className="rounded-circle"
            src={localStorage.getItem("fotoOrga")}
          />
        </Link>
        <Link to={rutaHome} className="icon-menu-org">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="25"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Link>
        <Link to={rutaDonaciones} className="icon-menu-org">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="30"
            fill="currentColor"
            className="bi bi-cash"
            viewBox="0 0 16 16"
          >
            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
          </svg>
        </Link>
        <Link to={rutaAdopciones} className="icon-menu-org">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="25"
            fill="currentColor"
            className="bi bi-file-text"
            viewBox="0 0 16 16"
          >
            <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
          </svg>
        </Link>
        <Link to={rutaMisMascotas} className="icon-menu-org">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="25"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </Link>
      </div>
      <div>
        <Link to={rutaHome}>
          <img className="logo-petbounds" src={logo} />
        </Link>
      </div>
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
    telefono: "",
    pagina: "",
    direccion: "",
    bandera: false,
    banderaFoto: false,
  });
  const [eliminarCuenta] = useMutation(BORRAR_ORG, {
    variables: {
      borrarOrgId: localStorage.getItem("idOrg"),
    },
    onCompleted({ borrarOrg }) {
      if (borrarOrg.success) {
        history.push("/");
      }
    },
  });
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
            localStorage.setItem("fotoOrg", result);
          })
          .catch((e) => console.log(e));
      });
    reader.addEventListener("load", (event) => {
      document
        .getElementById("foto-perfil-editar")
        .setAttribute("src", event.target.result);
    });
    reader.readAsDataURL(fileList[0]);
  };
  const [modificar_usuario] = useMutation(UPDATE_ORG, {
    variables: {
      modificacionOrgId: localStorage.getItem("idOrg"),
      modificacionOrgTelefono: values.telefono,
      modificacionOrgPagina: values.pagina,
      modificacionOrgDireccion: values.direccion,
      modificacionOrgFoto: localStorage.getItem("fotoOrg"),
    },
    onCompleted({ modificacionOrg }) {
      if (modificacionOrg.success) {
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
    var nuevoTel = "";
    var nuevoPag = "";
    var nuevoDir = "";
    if (values.telefono === " " || values.telefono === "") {
      nuevoTel = document.getElementById("telOrg").getAttribute("placeholder");
    } else {
      nuevoTel = values.telefono;
    }
    if (values.pagina === " " || values.pagina === "") {
      nuevoPag = document.getElementById("pagOrg").getAttribute("placeholder");
    } else {
      nuevoPag = values.pagina;
    }
    if (values.direccion === " " || values.direccion === "") {
      nuevoDir = document.getElementById("dirOrg").getAttribute("placeholder");
    } else {
      nuevoDir = values.direccion;
    }
    if (values.banderaFoto === false) {
      localStorage.setItem(
        "fotoOrg",
        document.getElementById("foto-perfil-editar").getAttribute("src")
      );
    }
    setValues({
      telefono: nuevoTel,
      pagina: nuevoPag,
      direccion: nuevoDir,
      bandera: true,
    });
  };
  const { loading, error, data } = useQuery(ORGANIZACION, {
    variables: {
      organizacionId: localStorage.getItem("idOrg"),
    },
  });
  if (loading) return null;
  if (error) <Error></Error>;
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
                  src={data.organizacion.foto}
                />
                <strong>{data.organizacion.nombre}</strong>
              </span>
            </Link>
            <Link to={rutaHome} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="25"
                  fill="currentColor"
                  className="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <strong>Añadir mascota</strong>
              </span>
            </Link>
            <Link to={rutaDonaciones} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="30"
                  fill="currentColor"
                  className="bi bi-cash"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                </svg>
                <strong>Donaciones</strong>
              </span>
            </Link>
            <Link to={rutaAdopciones} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="25"
                  fill="currentColor"
                  className="bi bi-file-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                </svg>
                <strong>Adopciones</strong>
              </span>
            </Link>
            <Link to={rutaMisMascotas} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="25"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                <strong>Mis mascotas</strong>
              </span>
            </Link>
            <a
              onClick={() => {
                localStorage.setItem("flagOrg", "false");
                localStorage.setItem("nombreOrg", "");
                localStorage.setItem("fotoOrga", "");
                localStorage.setItem("idOrg", "");
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
          <div className="col-12 col-md-8 col-lg-8 col-xl-8 d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex flex-column justify-content-start align-items-center justify-content-sm-start align-items-sm-center justify-content-md-start align-items-md-center justify-content-lg-start align-items-lg-center justify-content-xl-start align-items-xl-center principal-perfil">
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
                    src={data.organizacion.foto}
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
                <h6 style={{ fontFamily: "Lexend" }}>Teléfono:</h6>
                <input
                  name="telefono"
                  id="telOrg"
                  onChange={handleCampos}
                  className="form-control form-editar"
                  type="text"
                  placeholder={data.organizacion.telefono}
                />
              </div>
              <div
                className="form-group align-self-start"
                style={{ width: "278px" }}
              >
                <h6 style={{ fontFamily: "Lexend" }}>Página:</h6>
                <input
                  name="pagina"
                  id="pagOrg"
                  onChange={handleCampos}
                  className="form-control form-editar"
                  type="text"
                  placeholder={data.organizacion.pagina}
                />
              </div>
              <div
                className="form-group align-self-start"
                style={{ width: "278px" }}
              >
                <h6 style={{ fontFamily: "Lexend" }}>Dirección:</h6>
                <input
                  name="direccion"
                  id="dirOrg"
                  onChange={handleCampos}
                  className="form-control form-editar"
                  type="text"
                  placeholder={data.organizacion.direccion}
                />
              </div>
              <button className="btn btn-primary submit-editar" type="submit">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default EditarPerfilOrg;
