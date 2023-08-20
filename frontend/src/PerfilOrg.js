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
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import { useHistory } from "react-router-dom";
import Error from "./Error"


const ORGANIZACION = gql`
query ($organizacionId: ID!) {
    organizacion(id: $organizacionId) {
      id
      nombre
      foto
      telefono
      pagina
      direccion
      validacion
      stripeid
    }
  }
`;
const MOD_ORG = gql`
mutation ($modificacionOrgId: String!, $modificacionOrgStripeid: String) {
  modificacionOrg(id: $modificacionOrgId, stripeid: $modificacionOrgStripeid) {
    success
    message
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
 var rutaPerfil = "/PerfilOrg";
 var rutaHome = "/HomeOrg";
 var rutaAdopciones = "/AdopcionesOrg";
 var rutaDonaciones = "/DonacionesOrg";
 var rutaMisMascotas = "/MisMascotasOrg";
 var rutaEditarPerfil = "/EditarPerfilOrg";
function PerfilOrg(props) {
if(localStorage.getItem('flagOrg')==='true'){
    return (
      <div>
        <Header></Header>
        <Cuerpo></Cuerpo>
      </div>
    );
}else{
  return (<Error></Error>)
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
            <img className="rounded-circle" src={localStorage.getItem('fotoOrga')} />
          </Link>
          <Link to={rutaHome} className="icon-menu-org">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </Link>
          <Link to={rutaDonaciones} className="icon-menu-org">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
            </svg>
          </Link>
          <Link to={rutaAdopciones} className="icon-menu-org">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16">
            <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/>
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
          </svg>
          </Link>
          <Link to={rutaMisMascotas} className="icon-menu-org">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
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
  let history=useHistory()
    const [estado,setEstado] = useState(true)
    const link=(id)=>{
      fetch("http://52.43.69.219:4000/api/pago?id="+id,{ method: 'GET'}).then(res=>res.json()).then(data=>{
        window.location.href=data.enlace.url
      }).catch(e => {
        console.log(e);
        return e;
      });
    }
    const [modOrg] = useMutation(MOD_ORG,{
      variables:{
        "modificacionOrgId":localStorage.getItem('idOrg'),
        "modificacionOrgStripeid":localStorage.getItem("idConfigurarPagoLink")
      },
      onCompleted({modificacionOrg}){
        if(modificacionOrg.success){
          link(localStorage.getItem("idConfigurarPagoLink"))
        }else{
        }
      }
    })
    const configurar = () =>{
      fetch("http://52.43.69.219:4000/api/pago",{ method: 'POST'}).then(res=>res.json()).then(data=>{
        localStorage.setItem('idConfigurarPagoLink',data.id)
        modOrg()
        
      }).catch(e => {
        console.log(e);
        return e;
      });
    }
    const eliminar = () => {
      setEstado(!estado)
    }
    const [eliminarCuenta] = useMutation(BORRAR_ORG,{
        variables:{
            "borrarOrgId":localStorage.getItem('idOrg')
        },
        onCompleted({borrarOrg}){
            if(borrarOrg.success){
                history.push("/")
            }
        }
    }
    );
  const { loading, error, data } = useQuery(ORGANIZACION, {
    variables: {
      "organizacionId": localStorage.getItem('idOrg')
    },
  });
  if (loading) return null;
  if (error) <Error></Error>;
  else {
    return (
      <div className="container contenedor-main">
          {estado === false ? (<div className="eliminar-cuenta-adv">
        <h3 className="d-xl-flex" style={{fontFamily:'Lexend'}}>¿Estás seguro de eliminar tu cuenta?</h3>
        <div className="d-xl-flex justify-content-xl-center" role="group"><button className="btn boton-cancelar" onClick={eliminar}>No, continuar</button><button className="btn btn-primary boton-eliminar" type="button" onClick={eliminarCuenta}>Sí, eliminar</button></div>
    </div>):(null)}
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
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
                <strong>Añadir mascota</strong>
              </span>
            </Link>
            <Link to={rutaDonaciones} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
              </svg>
                <strong>Donaciones</strong>
              </span>
            </Link>
            <Link to={rutaAdopciones} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16">
                <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
              </svg>
                <strong>Adopciones</strong>
              </span>
            </Link>
            <Link to={rutaMisMascotas} className="link-menu-lateral">
              <span className="text-left texto-menu-lateral">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
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
                style={
                  {bordeRight: '.3em none!important'}
                }
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
                <Link to={rutaEditarPerfil} className="dropdown-item d-md-flex align-items-md-center editar-eliminar">
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
                <button className="dropdown-item d-md-flex align-items-md-center editar-eliminar" onClick={eliminar}>
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
              src={data.organizacion.foto}
            />
            <h4 className="nick-name-perfil">
              <strong>{data.organizacion.nombre}</strong>
            </h4>
            {data.organizacion.stripeid===null?(<button className="btn btn-primary configura" onClick={configurar}>Configura tus pagos</button>)
            :
            (null)}
            <div className="align-self-start">
              <h6 className="title-nombre">Número de teléfono:</h6>
              <h5 className="nombre-perfil-perfil">
                <strong>
                  {data.organizacion.telefono}
                </strong>
              </h5>
            </div>
            <div className="align-self-start">
              <h6 className="title-nombre">Página web:</h6>
              <h5 className="nombre-perfil-perfil">
                <strong>{data.organizacion.pagina}</strong>
              </h5>
            </div>
            <div className="align-self-start">
              <h6 className="title-nombre">Dirección:</h6>
              <h5 className="nombre-perfil-perfil">
                <strong>{data.organizacion.direccion}</strong>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
}
}
export default PerfilOrg;
