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
import { gql, useMutation, useQuery } from "@apollo/client";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import Error from "./Error";

const MOD_MAS = gql`
  mutation Mutation(
    $modificacionMascotaId: String!
    $modificacionMascotaEstado: Int
  ) {
    modificacionMascota(
      id: $modificacionMascotaId
      estado: $modificacionMascotaEstado
    ) {
      success
      message
    }
  }
`;
const MOD_SOL = gql`
  mutation Mutation(
    $modificacionSolicitudId: ID!
    $modificacionSolicitudFlag: Boolean!
  ) {
    modificacionSolicitud(
      id: $modificacionSolicitudId
      flag: $modificacionSolicitudFlag
    ) {
      success
      message
    }
  }
`;
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
const SOLICITUD = gql`
  query ($solicitudesSeleccionadaId: ID!) {
    solicitudesSeleccionada(id: $solicitudesSeleccionadaId) {
      id
      flag
      usuario {
        nickname
        foto
        identificacion
        comprobante
      }
      mascota {
        id
        foto
        nombre
        organizacion {
          direccion
        }
      }
    }
  }
`;
const SUB = gql`
  subscription Subscription($mensajeEnviadoId: ID!) {
    mensajeEnviado(id: $mensajeEnviadoId) {
      solicitudId
      msj
      usuarioflag
    }
  }
`;
const MENSAJES = gql`
  query ($consultaMensajesSolicitudId: ID!) {
    consultaMensajes(solicitudId: $consultaMensajesSolicitudId) {
      msj
      usuarioflag
      solicitudId
      _id
    }
  }
`;
const HACER_MENSAJE = gql`
  mutation (
    $registroMensajeSolicitudId: ID!
    $registroMensajeMsj: String!
    $registroMensajeUsuarioflag: Boolean!
  ) {
    registroMensaje(
      solicitudId: $registroMensajeSolicitudId
      msj: $registroMensajeMsj
      usuarioflag: $registroMensajeUsuarioflag
    ) {
      success
      message
    }
  }
`;
const ELIMINAR_SOLICITUD = gql`
  mutation ($borrarSolicitudId: ID!) {
    borrarSolicitud(id: $borrarSolicitudId) {
      success
    }
  }
`;
var rutaPerfil = "/PerfilOrg";
var rutaHome = "/HomeOrg";
var rutaAdopciones = "/AdopcionesOrg";
var rutaDonaciones = "/DonacionesOrg";
var rutaMisMascotas = "/MisMascotasOrg";
function ChatOrg(props) {
  if (localStorage.getItem("flagOrg")) {
    return (
      <div>
        <Header></Header>
        <Cuerpo idSol={props.match.params.idSol}></Cuerpo>
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
        <Chat idSol={props.idSol} />
      </div>
    </div>
  );
}
function Chat(props) {
  const goBack = () => {
    window.history.back();
  };
  const [estados, setEstados] = useState({
    estadoEliminar: false,
    estadoCompletado: false,
  });
  const eliminar = () => {
    setEstados({
      estadoEliminar: !estados.estadoEliminar,
      estadoCompletado: false,
    });
  };
  const completar = () => {
    setEstados({
      estadoCompletado: !estados.estadoCompletado,
      estadoEliminar: false,
    });
  };
  const [modMas] = useMutation(MOD_MAS, {
    variables: {
      modificacionMascotaId: localStorage.getItem("mascotaCompletada"),
      modificacionMascotaEstado: 1,
    },
  });
  const [modSol] = useMutation(MOD_SOL, {
    variables: {
      modificacionSolicitudId: props.idSol,
      modificacionSolicitudFlag: true,
    },
    onCompleted({ modificacionSolicitud }) {
      if (modificacionSolicitud.success) {
        window.location.reload();
      }
    },
  });
  const handleCompletar = () => {
    modMas();
    modSol();
  };
  const [mensaje, setMensaje] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mensaje !== "" && mensaje !== " ") {
      enviarMensaje();
      document.getElementById("input-msj").value = "";
    }
  };
  const [eliminarSolicitud] = useMutation(ELIMINAR_SOLICITUD, {
    variables: {
      borrarSolicitudId: props.idSol,
    },
    onCompleted({ borrarSolicitud }) {
      if (borrarSolicitud.success) {
        window.history.back();
      }
    },
  });
  const [enviarMensaje] = useMutation(HACER_MENSAJE, {
    variables: {
      registroMensajeSolicitudId: props.idSol,
      registroMensajeMsj: mensaje,
      registroMensajeUsuarioflag: false,
    },
    onCompleted({ registroMensaje }) {
      if (registroMensaje.success) {
        setMensaje("");
      }
    },
  });
  const { loading, error, data } = useQuery(SOLICITUD, {
    variables: {
      solicitudesSeleccionadaId: props.idSol,
    },
  });
  if (loading) return null;
  if (error) {
    return <Error></Error>;
  } else {
    localStorage.setItem(
      "mascotaCompletada",
      data.solicitudesSeleccionada.mascota.id
    );
    localStorage.setItem(
      "idenUs",
      data.solicitudesSeleccionada.usuario.identificacion
    );
    localStorage.setItem(
      "comproUs",
      data.solicitudesSeleccionada.usuario.comprobante
    );
    return (
      <div className="col-md-8 col-lg-8 col-xl-8 offset-md-0 d-flex d-md-flex flex-column justify-content-between justify-content-md-center main-chat">
        {estados.estadoEliminar !== false ? (
          <div className="eliminar-solicitud">
            <h4 className="d-xl-flex" style={{ fontFamily: "Lexend" }}>
              ¿Estás seguro de eliminar tu solicitud?
            </h4>
            <div className="d-xl-flex justify-content-xl-center" role="group">
              <button className="btn boton-cancelar" onClick={eliminar}>
                No, continuar
              </button>
              <button
                className="btn btn-primary boton-eliminar"
                type="button"
                onClick={eliminarSolicitud}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        ) : null}
        {estados.estadoCompletado !== false ? (
          <div className="eliminar-solicitud">
            <h5 className="d-xl-flex" style={{ fontFamily: "Lexend" }}>
              ¿Deseas marcar como completada esta adopción?
            </h5>
            <div className="d-xl-flex justify-content-xl-center" role="group">
              <button className="btn boton-cancelar" onClick={completar}>
                No, continuar
              </button>
              <button
                className="btn btn-primary boton-eliminar"
                type="button"
                onClick={handleCompletar}
              >
                Sí, ya se completó
              </button>
            </div>
          </div>
        ) : null}
        <div className="d-flex d-xl-flex justify-content-around align-items-center align-items-sm-center align-items-xl-center header-chat">
          <button
            className="btn"
            onClick={goBack}
            style={{ background: "transparent" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-arrow-left"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              ></path>
            </svg>
          </button>
          <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex align-items-center align-items-xl-center">
            <img
              className="rounded-circle foto-perfil-chat"
              src={data.solicitudesSeleccionada.usuario.foto}
            />
            <h2 style={({ fontFamily: "Lexend" }, { fontSize: "25px" })}>
              {data.solicitudesSeleccionada.usuario.nickname}
            </h2>
          </div>
          <button
            className="btn"
            onClick={eliminar}
            style={({ background: "transparent" }, { color: "white" })}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-x"
              style={({ fontSize: "30px" }, { marginLeft: "0px" })}
            >
              <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              ></path>
            </svg>
          </button>
          {data.solicitudesSeleccionada.flag !== true ? (
            <button
              className="btn"
              onClick={completar}
              style={({ background: "transparent" }, { color: "white" })}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.8em"
                height="0.9em"
                fill="currentColor"
                class="bi bi-check2"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </button>
          ) : null}
        </div>
        <BodyChat
          id={props.idSol}
          dir={data.solicitudesSeleccionada.mascota.organizacion.direccion}
          fotoMas={data.solicitudesSeleccionada.mascota.foto}
          desc={data.solicitudesSeleccionada.mascota.nombre}
        ></BodyChat>
        <form onSubmit={handleSubmit}>
          <div className="form-group d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center footer-chat">
            <input
              id="input-msj"
              onChange={(e) => {
                setMensaje(e.target.value);
              }}
              placeholder="Escribe un mensaje..."
              type="text"
            />
            <button
              style={{ background: "transparent!important" }}
              className="btn d-flex d-sm-flex d-md-flex d-xl-flex align-items-center align-items-sm-center align-items-md-center align-items-xl-center"
              type="submit"
            >
              <i style={{ color: "white" }} className="material-icons">
                send
              </i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function BodyChat(props) {
  const { subscribeToMore, loading, error, data } = useQuery(MENSAJES, {
    variables: {
      consultaMensajesSolicitudId: props.id,
    },
  });
  if (error) return null;
  if (loading) return null;
  else {
    return (
      <Mensaje
        data={data}
        subscribeNewMesssage={() =>
          subscribeToMore({
            document: SUB,
            variables: { mensajeEnviadoId: props.id },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.mensajeEnviado;
              return Object.assign({}, prev, {
                consultaMensajes: [newMessage, ...prev.consultaMensajes],
              });
            },
          })
        }
        dir={props.dir}
        fotoMas={props.fotoMas}
        desc={props.desc}
      ></Mensaje>
    );
  }
}
function Mensaje(props) {
  const srcG =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyBbaR5A5CwT_QMBI9vd9_VWO_ZXRhXRw6c&q=" +
    props.dir +
    "&zoom=11";
  useEffect(() => {
    props.subscribeNewMesssage();
    var objDiv = document.getElementById("body-chat");
    objDiv.scrollTop = objDiv.scrollHeight;
  });
  return (
    <div className="body-chat" id="body-chat">
      <div
        className="d-inline-flex d-xl-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-center justify-content-xl-center align-items-xl-center"
        style={{ width: "100%" }}
      >
        <img
          src={props.fotoMas}
          style={{ marginTop: "15px" }}
          className="rounded-circle imagen-perfil-menu"
        />
        <h4>{props.desc}</h4>
      </div>
      {props.data.consultaMensajes.map((consultaMensajes) => (
        <div key={consultaMensajes.id}>
          {consultaMensajes.usuarioflag === false ? (
            <Propio msj={consultaMensajes.msj} src={srcG}></Propio>
          ) : (
            <Otro msj={consultaMensajes.msj}></Otro>
          )}
        </div>
      ))}
    </div>
  );
}
function Propio(props) {
  if (props.msj === "*ubicacion*") {
    return (
      <div className="d-inline-flex d-xl-flex flex-column flex-grow-0 align-items-end align-items-sm-end align-items-md-end align-items-lg-end justify-content-xl-center align-items-xl-end div-msj">
        <span className="d-md-flex d-xl-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start msj-propio">
          <iframe
            className="d-flex d-xl-flex justify-content-sm-start"
            allowFullScreen=""
            frameBorder="0"
            loading="lazy"
            src={props.src}
            width="100%"
            height="400"
          ></iframe>
        </span>
      </div>
    );
  } else {
    return (
      <div className="d-inline-flex d-xl-flex flex-column flex-grow-0 align-items-end align-items-sm-end align-items-md-end align-items-lg-end justify-content-xl-center align-items-xl-end div-msj">
        <span className="d-md-flex d-xl-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start msj-propio">
          {props.msj}
        </span>
      </div>
    );
  }
}
function Otro(props) {
  if (props.msj === "*iden*") {
    return (
      <div className="d-flex d-sm-flex d-md-flex d-xl-flex justify-content-start justify-content-sm-start justify-content-md-start justify-content-xl-start">
        <a href={localStorage.getItem("idenUs")} className="msj-otro">
          {localStorage.getItem("idenUs")}
        </a>
      </div>
    );
  } else if (props.msj === "*compro*") {
    return (
      <div className="d-flex d-sm-flex d-md-flex d-xl-flex justify-content-start justify-content-sm-start justify-content-md-start justify-content-xl-start">
        <a href={localStorage.getItem("comproUs")} className="msj-otro">
          {localStorage.getItem("comproUs")}
        </a>
      </div>
    );
  } else {
    return (
      <div className="d-flex d-sm-flex d-md-flex d-xl-flex justify-content-start justify-content-sm-start justify-content-md-start justify-content-xl-start">
        <span className="msj-otro">{props.msj}</span>
      </div>
    );
  }
}
export default ChatOrg;
