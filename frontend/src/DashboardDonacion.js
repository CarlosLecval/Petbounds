import React, { useEffect, useMemo, useState } from "react";
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
import { gql, useQuery } from "@apollo/client";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import { useHistory } from "react-router-dom";
import Error from "./Error";
import { Doughnut, Bar } from "react-chartjs-2";

const DON = gql`
  query ($consultaDonacionIndividualId: ID!) {
    consultaDonacionIndividual(id: $consultaDonacionIndividualId) {
      donacionusuarios {
        id
        fechasubida
        monto
        usuario {
          nombre
          apellidop
          apellidom
          correo
          genero
        }
      }
      titulo
      descripcion
      meta
      total
    }
  }
`;

var rutaPerfil = "/PerfilOrg";
var rutaHome = "/HomeOrg";
var rutaAdopciones = "/AdopcionesOrg";
var rutaDonaciones = "/DonacionesOrg";
var rutaMisMascotas = "/MisMascotasOrg";

function DashboardDonacion(props) {
  if (localStorage.getItem("flagOrg") === "true") {
    return (
      <div>
        <Header></Header>
        <Cuerpo idDon={props.match.params.idDon}></Cuerpo>
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
        <Dashboard id={props.idDon} />
      </div>
    </div>
  );
}
function Dashboard(props) {
  const { loading, error, data } = useQuery(DON, {
    variables: {
      consultaDonacionIndividualId: props.id,
    },
  });
  if (error) return <Error></Error>;
  if (loading) return null;
  else {
    return (
      <div className="col main-dashboard">
        <h2 className="header-dashboard">
          {data.consultaDonacionIndividual.titulo}
        </h2>
        <h4 style={{ marginBottom: "25px" }} className="header-dashboard">
          {data.consultaDonacionIndividual.descripcion}
        </h4>
        <div className="row">
          <div className="col-md-6 col-xl-4 mb-4">
            <div className="card shadow border-left-primary py-2 card-dashboard">
              <div className="card-body">
                <div className="row align-items-center no-gutters">
                  <div className="col mr-2">
                    <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                      <span style={{ fontFamily: "Lexend, sans-serif" }}>
                        Recaudado
                      </span>
                    </div>
                    <div className="text-dark font-weight-bold h5 mb-0">
                      <span style={{ fontFamily: " Lexend, sans-serif" }}>
                        ${data.consultaDonacionIndividual.total}
                      </span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fa fa-dollar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mb-4">
            <div className="card shadow border-left-success py-2 card-dashboard">
              <div className="card-body">
                <div className="row align-items-center no-gutters">
                  <div className="col mr-2">
                    <div className="text-uppercase font-weight-bold text-xs mb-1">
                      <span
                        style={
                          ({ fontFamily: " Lexend, sans-serif" },
                          { color: "rgb(167,48,40)" })
                        }
                      >
                        Meta
                      </span>
                    </div>
                    <div className="text-dark font-weight-bold h5 mb-0">
                      <span style={{ fontFamily: "Lexend, sans-serif" }}>
                        ${data.consultaDonacionIndividual.meta}
                      </span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fa fa-flag-checkered fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mb-4">
            <div className="card shadow border-left-success py-2 card-dashboard">
              <div className="card-body">
                <div className="row align-items-center no-gutters">
                  <div className="col mr-2">
                    <div className="text-uppercase font-weight-bold text-xs mb-1">
                      <span
                        style={
                          ({ fontFamily: "Lexend, sans-serif" },
                          { color: "rgb(73,40,167)" })
                        }
                      >
                        Porcentaje
                      </span>
                    </div>
                    <div className="row">
                      <div className="col d-flex justify-content-xl-start align-items-xl-center col-porcentaje">
                        <span style={{ fontFamily: "Lexend, sans-serif" }}>
                          %
                          {Math.round(
                            (data.consultaDonacionIndividual.total /
                              data.consultaDonacionIndividual.meta) *
                              100
                          )}
                        </span>
                        <div className="progress d-xl-flex col-progress">
                          <div
                            className="progress-bar bg-info progress-bar-animated"
                            style={{
                              width:
                                (data.consultaDonacionIndividual.total /
                                  data.consultaDonacionIndividual.meta) *
                                  100 +
                                "%",
                            }}
                          >
                            <span className="sr-only">50%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7 col-xl-8">
            <div
              className="card shadow mb-4"
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6
                  className="text-primary font-weight-bold m-0"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  Gráfica donaciones
                </h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <Grafica
                    datos={data.consultaDonacionIndividual.donacionusuarios}
                  ></Grafica>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-xl-4">
            <div
              className="card shadow mb-4"
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6
                  className="text-primary font-weight-bold m-0"
                  style={{ fonFamily: "Lexend, sans-serif" }}
                >
                  Genero donantes
                </h6>
              </div>
              <div className="card-body">
                <div className="chart-area" style={{ height: "260px" }}>
                  <Dona
                    datos={data.consultaDonacionIndividual.donacionusuarios}
                  ></Dona>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="tituloRegDash">Registro</h3>
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-sm tabla-dash">
                <thead>
                  <tr>
                    <th>Nombre Completo</th>
                    <th>Correo</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {data.consultaDonacionIndividual.donacionusuarios.map(
                    (donacionusuarios) => (
                      <tr key={donacionusuarios.id}>
                        <td>
                          {donacionusuarios.usuario.nombre}{" "}
                          {donacionusuarios.usuario.apellidop}{" "}
                          {donacionusuarios.usuario.apellidom}
                        </td>
                        <td>{donacionusuarios.usuario.correo}</td>
                        <td>{donacionusuarios.monto}</td>
                        <td>{donacionusuarios.fechasubida}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function Grafica(props) {
  let sumaMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var datos = props.datos;
  for (var i = 0; i < datos.length; i++) {
    if (datos[i].fechasubida !== null) {
      if (datos[i].fechasubida.slice(5, -3) === "01") {
        sumaMes[0] = sumaMes[0] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "02") {
        sumaMes[1] = sumaMes[1] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "03") {
        sumaMes[2] = sumaMes[2] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "04") {
        sumaMes[3] = sumaMes[3] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "05") {
        sumaMes[4] = sumaMes[4] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "06") {
        sumaMes[5] = sumaMes[5] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "07") {
        sumaMes[6] = sumaMes[6] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "08") {
        sumaMes[7] = sumaMes[7] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "09") {
        sumaMes[8] = sumaMes[8] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "10") {
        sumaMes[9] = sumaMes[9] + datos[i].monto;
      } else if (datos[i].fechasubida.slice(5, -3) === "11") {
        sumaMes[10] = sumaMes[10] + datos[i].monto;
      }
    }
  }

  const state = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Donaciones",
        fill: true,
        backgroundColor: "rgba(78,115,223,0.4)",
        borderColor: "rgba(78,115,223)",
        borderWidth: 2,
        data: [
          sumaMes[0],
          sumaMes[1],
          sumaMes[2],
          sumaMes[3],
          sumaMes[4],
          sumaMes[5],
          sumaMes[6],
          sumaMes[7],
          sumaMes[8],
          sumaMes[9],
          sumaMes[10],
          sumaMes[11],
        ],
      },
    ],
  };
  return <Bar data={state} />;
}
function Dona(props) {
  var sumaH = 0;
  var sumaM = 0;
  var datos = props.datos;
  for (var i = 0; i < datos.length; i++) {
    if (datos[i].usuario.genero === "masculino") {
      sumaH = sumaH + 1;
    }
    if (datos[i].usuario.genero === "femenino") {
      sumaM = sumaM + 1;
    }
  }
  var porH = Math.round((sumaH / datos.length) * 100);
  var porM = Math.round((sumaM / datos.length) * 100);

  const state = {
    labels: ["Hombre", "Mujer"],
    datasets: [
      {
        label: "Genero Donantes",
        backgroundColor: ["rgba(255,143,243,0.29)", "rgb(95,111,255)"],
        data: [porH, porM],
      },
    ],
  };
  return <Doughnut data={state} />;
}
export default DashboardDonacion;
