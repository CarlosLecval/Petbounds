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
import { Link, useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import Error from "./Error";

const CONSULTA_DON = gql`
  query ($consultaDonacionOrgId: ID!) {
    consultaDonacionOrg(id: $consultaDonacionOrgId) {
      id
      organizacion {
        id
        foto
        nombre
        stripeid
      }
      titulo
      descripcion
      meta
      total
    }
  }
`;
const REGISTRO_DON = gql`
  mutation (
    $registroDonacionOrganizacionId: ID!
    $registroDonacionTitulo: String!
    $registroDonacionDescripcion: String!
    $registroDonacionMeta: Int!
  ) {
    registroDonacion(
      organizacionId: $registroDonacionOrganizacionId
      titulo: $registroDonacionTitulo
      descripcion: $registroDonacionDescripcion
      meta: $registroDonacionMeta
    ) {
      success
      message
    }
  }
`;
var rutaPerfil = "/PerfilOrg";
var rutaHome = "/HomeOrg";
var rutaAdopciones = "/AdopcionesOrg";
var rutaDonaciones = "/DonacionesOrg";
var rutaMisMascotas = "/MisMascotasOrg";
function DonacionesOrg(props) {
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
  const [campos, setCampo] = useState({
    titulo: "",
    desc: "",
    meta: 0,
  });
  const handleCampos = (e) => {
    setCampo({ ...campos, [e.target.name]: e.target.value });
  };
  const [crearDon] = useMutation(REGISTRO_DON, {
    variables: {
      registroDonacionOrganizacionId: localStorage.getItem("idOrg"),
      registroDonacionTitulo: campos.titulo,
      registroDonacionDescripcion: campos.desc,
      registroDonacionMeta: parseInt(campos.meta),
    },
    onCompleted({ registroDonacion }) {
      if (registroDonacion.success) {
        window.location.reload();
      } else {
        alert("Algo salio mal");
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      campos.titulo !== "" &&
      campos.titulo !== " " &&
      campos.desc !== "" &&
      campos.desc !== " " &&
      campos.meta !== 0
    ) {
      crearDon();
    } else {
      alert("No pueden estar vacios los campos");
    }
  };
  return (
    <div className="container contenedor-main">
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
                src={localStorage.getItem("fotoOrga")}
              />
              <strong>{localStorage.getItem("nombreOrg")}</strong>
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
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-5 principal">
          <div className="row justify-content-center">
            {localStorage.getItem("stripeidOrg") !== "null" ? (
              <div>
                <div className="row registro-donacion">
                  <div className="col">
                    <form onSubmit={handleSubmit}>
                      <input
                        className="form-control input-don"
                        type="text"
                        name="titulo"
                        placeholder="Motivo"
                        onChange={handleCampos}
                      />
                      <textarea
                        name="desc"
                        className="form-control"
                        placeholder="Descripción"
                        onChange={handleCampos}
                      ></textarea>
                      <div className="d-inline-flex doble-campo d-md-flex justify-content-between">
                        <input
                          className="form-control input-don"
                          type="number"
                          name="meta"
                          onChange={handleCampos}
                          style={{ width: "30%" }}
                          placeholder="Meta"
                        />
                        <button className="btn btn-primary" type="submit">
                          Crear donación
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <Donacion id={localStorage.getItem("idOrg")}></Donacion>
              </div>
            ) : (
              <div className="div-error-stripe">
                <h3 className="error-stripe">
                  No puedes recibir donaciones hasta haber configurado tus pagos
                </h3>
                <Link className="error-stripe" to={"/#/PerfilOrg"}>
                  Configura tus pagos aquí
                </Link>
              </div>
            )}

            <div className="col-12 col-lg-2 col-xl-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Donacion(props) {
  const { loading, error, data } = useQuery(CONSULTA_DON, {
    variables: {
      consultaDonacionOrgId: props.id,
    },
  });
  if (error) return <Error></Error>;
  if (loading) return null;
  else {
    return (
      <div>
        {data.consultaDonacionOrg.map((consultaDonacionOrg) => (
          <div className="row" key={consultaDonacionOrg.id}>
            <div className="col-lg-12 col-xl-12 d-flex justify-content-center donaciones-main">
              <div className="card text-left align-self-center card-donaciones">
                <div className="card-body">
                  <h4 className="d-flex justify-content-between card-title">
                    {consultaDonacionOrg.titulo}
                  </h4>
                  <p className="card-text">
                    <img
                      className="rounded-circle"
                      src={consultaDonacionOrg.organizacion.foto}
                    />
                    {consultaDonacionOrg.organizacion.nombre}
                  </p>
                  <p className="card-text">
                    {consultaDonacionOrg.descripcion}
                    <br />
                  </p>
                  <p
                    className="card-text"
                    id="meta"
                    value={consultaDonacionOrg.meta}
                  >
                    Meta: ${consultaDonacionOrg.meta}
                    <br />
                  </p>
                </div>
                <div className="card-footer text-white d-inline-flex justify-content-between align-items-center align-content-center">
                  <div className="progress">
                    <div
                      style={{
                        width:
                          (consultaDonacionOrg.total /
                            consultaDonacionOrg.meta) *
                            100 +
                          "%",
                      }}
                      value={consultaDonacionOrg.total}
                      className="progress-bar bg-primary progress-bar-animated"
                      id="progreso"
                    >
                      ${consultaDonacionOrg.total}
                    </div>
                  </div>
                  <Link
                    to={"/DashboardDonacion/" + consultaDonacionOrg.id}
                    className="btn btn-primary button-donar"
                    data-bss-hover-animate="pulse"
                    type="button"
                  >
                    Stats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DonacionesOrg;
