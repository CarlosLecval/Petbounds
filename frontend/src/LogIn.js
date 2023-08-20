import React, {useState} from 'react';
import reportWebVitals from './reportWebVitals';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/Login-Form-Dark-1.css';
import './assets/css/Login-Form-Dark.css';
import './assets/css/Registration-Form-with-Photo.css';
import './assets/css/styles.css';
import './assets/css/Team-Boxed.css'
import './index.css';
import './assets/fonts/font-awesome.min.css';
import logo from './assets/img/petbounds_blanco.png';
import {Link} from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';


const INICIO_SESION = gql `
    mutation inicioSesion($inicioSesionCorreo: String!, $inicioSesionContra: String!) {
    inicioSesion(correo: $inicioSesionCorreo, contra: $inicioSesionContra) {
      id
      flag
      cuenta
      validacion
    }
  }
`;
function LogIn (props){
    const[values,setValues]=useState({
            correo:'',
            contra:''
    });
    const[inicioSesion]=useMutation(INICIO_SESION,{
            onCompleted({inicioSesion}){
                    var rutaUs = '/HomeUs';
                    var rutaOrg = '/HomeOrg';
                    
                    if(inicioSesion.flag){
                        switch(inicioSesion.cuenta){
                            case 'usuario':
                                props.history.push(rutaUs);
                                localStorage.setItem('idUsuario',inicioSesion.id)
                                localStorage.setItem('flagUsuario','true')
                                break; 
                            case 'org':
                                props.history.push(rutaOrg);
                                localStorage.setItem('idOrg',inicioSesion.id)
                                localStorage.setItem('flagOrg','true')
                                break
                        }
                    }
                    else{
                        switch(inicioSesion.cuenta){
                            case 'existe':
                                document.getElementById('errorCorreo').innerHTML='La cuenta no está registrada';
                                break;
                            case 'contra':
                                document.getElementById('errorContra').innerHTML='La contraseña es incorrecta';
                        }
                    }
            },
            variables:{
                "inicioSesionCorreo": values.correo,
                "inicioSesionContra": values.contra,
            }
    });
    const handleCampos = (event) => {
        setValues(
            {...values,[event.target.name]: event.target.value});  
    };

    
    const handleSubmit = (event)=>{
        event.preventDefault();
        inicioSesion();
    };
    return(
        <div>
            <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-dark" id="mainNav" style={{color: 'var(--gray-dark)'}}>
                <div className="container">
                    <Link to = "/"><a style={{cursor:'pointer'}}>
                        <img className="img-fluid d-lg-flex justify-content-lg-center" src={logo} width="500" style={{textAlign:'center'}}/>
                    </a></Link>
                </div>
            </nav>
            <div style={{color:'var(--gray-dark)'}}>
                <section className="login-dark" style={{color: 'var(--gray-dark)'}}>
                    <form onSubmit={handleSubmit} validate style={{paddingTop:'0px'},{marginTop:'-166px'}}>
                        <div className="illustration"><i className="fa fa-paw" id="paw-login" style={{color:'var(--white)'}}></i></div>
                        <div className="form-group"><input type="text" className="form-control" id='correo' name="correo" autoComplete='email' value={values.correo} onChange={handleCampos} required placeholder="Correo" style={{fontFamily:'Lexend'}}/></div>
                        <div className="form-group"><p className='errorCo' id='errorCorreo'></p></div>
                        <div className="form-group"><input className="form-control" id='contra' type="password" name="contra" value={values.contra} onChange={handleCampos} required placeholder="Contraseña" style={{fontFamily:'Lexend'}}/></div>
                        <div className="form-group"><p className='errorCo' id='errorContra'></p></div>
                        <div className="form-group"><input className="btn btn-primary btn-block" type="submit" value="Iniciar Sesión"></input></div>
                        <Link to="/Registrarse"><a className="forgot" style={{fontFamily: 'Lexend'}}>Regístrate en Petbounds</a></Link>
                    </form>
                </section>
            </div>
        </div>
    );
}
reportWebVitals();
export default LogIn;
