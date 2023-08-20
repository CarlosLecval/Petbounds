import React, { useState, useEffect } from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/font-awesome.min.css";
import "./assets/fonts/material-icons.min.css";
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
const SUB = gql`
  subscription Subscription($mensajeEnviadoId: ID!) {
    mensajeEnviado(id: $mensajeEnviadoId) {
      solicitudId
      msj
      usuarioflag
    }
  }
`;
const SOLICITUDES = gql`
  query ($solicitudesUsuarioId: ID!) {
    solicitudesUsuario(id: $solicitudesUsuarioId) {
      id
      mascota {
        raza
        edad
        tamano
        sexo
        nombre
        organizacion {
          foto
          nombre
        }
      }
    }
  }
`;
const SOLICITUD = gql`
  query ($solicitudesSeleccionadaId: ID!) {
    solicitudesSeleccionada(id: $solicitudesSeleccionadaId) {
      id
      usuario {
        id
        identificacion
        comprobante
      }
      mascota {
        id
        foto
        nombre
        organizacion {
          nombre
          foto
          direccion
        }
      }
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
const rutaPerfil = "/PerfilUs";
const rutaHome = "/HomeUs";
const rutaServicios = "/ServiciosUs";
const rutaDonaciones = "/DonacionesUs";
const rutaMisAdopciones = "/MisAdopcionesUs";
const rutaMisLikes = "/MisLikesUs";
const rutaAyuda = "";
function ChatUs(props) {
  if (localStorage.getItem("flagUsuario") === "true") {
    return (
      <div>
        <Header />
        <Cuerpo idSol={props.match.params.idSol} />
      </div>
    );
  } else {
    return <Error></Error>;
  }
}
function Header(props) {
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
          <Link
            to="/"
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
          </Link>
        </div>
      )}
    </div>
  );
}
function Cuerpo(props) {
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
          <Link to="/" className="link-menu-lateral">
            <span className="text-left texto-menu-lateral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="bi bi-box-arrow-left"
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
              <strong>Salir</strong>
            </span>
          </Link>
        </div>
        <Chat idSol={props.idSol} idUs={localStorage.getItem("idUsuario")} />
      </div>
    </div>
  );
}
function Chat(props) {
  const goBack = () => {
    window.history.back();
  };
  const [estado, setEstado] = useState(true);
  const eliminar = () => {
    setEstado(!estado);
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
    update(proxy) {
      const dato = proxy.readQuery({
        query: SOLICITUDES,
        variables: {
          solicitudesUsuarioId: props.idUs,
        },
      });
      if (dato != null) {
        const date = dato.solicitudesUsuario.filter(
          (solicitudesUsuario) => solicitudesUsuario.id !== props.idSol
        );
        proxy.writeQuery({
          query: SOLICITUDES,
          variables: { solicitudesUsuarioId: props.idUs },
          data: {
            solicitudesUsuario: { date },
          },
        });
        window.history.back();
      }
    },
  });
  const [enviarMensaje] = useMutation(HACER_MENSAJE, {
    variables: {
      registroMensajeSolicitudId: props.idSol,
      registroMensajeMsj: mensaje,
      registroMensajeUsuarioflag: true,
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
  if (error) return null;
  else {
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
        {estado === false ? (
          <div className="eliminar-solicitud">
            <h3 className="d-xl-flex" style={{ fontFamily: "Lexend" }}>
              ¿Estás seguro de eliminar tu solicitud?
            </h3>
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
              src={data.solicitudesSeleccionada.mascota.organizacion.foto}
            />
            <h2 style={({ fontFamily: "Lexend" }, { fontSize: "25px" })}>
              {data.solicitudesSeleccionada.mascota.organizacion.nombre}
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
        <div key={consultaMensajes._id}>
          {consultaMensajes.usuarioflag === true ? (
            <Propio msj={consultaMensajes.msj}></Propio>
          ) : (
            <Otro msj={consultaMensajes.msj} src={srcG}></Otro>
          )}
        </div>
      ))}
    </div>
  );
}
function Propio(props) {
  if (props.msj === "*iden*") {
    return (
      <div className="d-inline-flex d-xl-flex flex-column flex-grow-0 align-items-end align-items-sm-end align-items-md-end align-items-lg-end justify-content-xl-center align-items-xl-end div-msj">
        <a
          href={localStorage.getItem("idenUs")}
          className="d-md-flex d-xl-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start msj-propio"
        >
          {localStorage.getItem("idenUs")}
        </a>
      </div>
    );
  } else if (props.msj === "*compro*") {
    return (
      <div className="d-inline-flex d-xl-flex flex-column flex-grow-0 align-items-end align-items-sm-end align-items-md-end align-items-lg-end justify-content-xl-center align-items-xl-end div-msj">
        <a
          href={localStorage.getItem("comproUs")}
          className="d-md-flex d-xl-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start msj-propio"
        >
          {localStorage.getItem("comproUs")}
        </a>
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
  if (props.msj !== "*ubicacion*") {
    return (
      <div className="d-flex d-sm-flex d-md-flex d-xl-flex justify-content-start justify-content-sm-start justify-content-md-start justify-content-xl-start">
        <span className="msj-otro">{props.msj}</span>
      </div>
    );
  } else {
    return (
      <div className="d-flex d-sm-flex d-md-flex d-lg-flex justify-content-start justify-content-sm-start justify-content-md-start justify-content-lg-start justify-content-xl-start">
        <span className="d-xl-flex justify-content-xl-start msj-otro">
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
  }
}
export default ChatUs;
