//import './assets/bootstrap/css/bootstrap.min.css';
import logo from './assets/img/petbounds_blanco.png';
import React, {Component} from 'react';
import boy from './assets/img/guy-walking-with-dog-in-the-park-2127165-2127165.svg'
import EarthBoundlogo from './assets/img/earthlogoblanco.png';
import './assets/css/Features-Clean.css'
import './assets/css/Login-Form-Dark-1.css';
import './assets/css/Login-Form-Dark.css';
import './assets/css/Registration-Form-with-Photo.css';
import './assets/css/styles.css';
import './assets/css/Team-Boxed.css'
import './index.css';
import './assets/fonts/font-awesome.min.css';
import {Link} from 'react-router-dom'


class PaginaInicio extends Component{
    render(){
        return (
            <div className = "app-petbounds">
             <header className="header-blue">
        <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
            <div className="container-fluid"><a className="navbar-brand divLogo"><img className="imagenLogo" src={logo}/></a>
                    <form className="form-inline mr-auto" target="_self"></form><span className="navbar-text spanNavBarText"> <Link to="/IniciaSesion" className="login">Log In</Link></span><Link to="/Registrarse" className="btn btn-light action-button Registrate" role="button">Sign Up</Link>
            </div>
        </nav>
        <div className="container hero">
            <div className="row">
                <div className="col-12 col-lg-6 col-xl-5 offset-xl-1 infoPetbounds">
                    <h1>Salva. Adopta. Cuida</h1>
                    <p>En Petbounds, organizaciones que rescatan animales en condiciones de calle ponen a disposición de los usuarios la oportunidad de adoptar una mascota</p><Link to="/Registrarse" className="btn btn-light btn-lg action-button registrateMain" type="button">Regístrate aquí</Link>
                </div>
                <div className="col-md-12 col-lg-5 offset-lg-1 offset-xl-0 phone-holder divPerrito">
                    <div className="phone-mockup divPerrito"><img className="device" id="device-ini" src={boy}/>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section className="features-clean main-features">
                <div className="container">
                    <div className="intro">
                        <h2 className="text-center">¿Qué puedo hacer en Petbounds?</h2>
                    </div>
                    <div className="row features">
                        <div className="col-sm-6 col-lg-4 item"><i className="fa fa-tags icon"></i>
                            <h3 className="name">Ve mascotas</h3>
                            <p className="description">Está a tu disposición un amplio y selectivo catálogo de mascotas donde podrás filtrar según tus intereses y guardar las que más te gusten.</p>
                        </div>
                        <div class="col-sm-6 col-lg-4 item"><i className="fa fa-comment-o icon"></i>
                            <h3 className="name">Chatea</h3>
                            <p className="description">Una vez hecha tu solicitud de adopción se abrirá un chat para que te comuniques con la organización que tiene a la mascota que te interesa.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 item"><i className="fa fa-credit-card icon"></i>
                            <h3 className="name">Dona</h3>
                            <p className="description">Apoya las metas de las organizaciones donando de una forma confiable y segura.</p>
                        </div>
                        <div class="col-sm-6 col-lg-4 item"><i className="fa fa-tablet icon"></i>
                            <h3 class="name">Ingresa desde cualquier dispositivo</h3>
                            <p class="description" >Petbounds es una aplicación con un diseño full responsive, por lo que podrás ingresar desde cualquier dispositivo.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 item"><i className="fa fa-cut icon"></i>
                            <h3 className="name">Shortcuts</h3>
                            <p className="description">El chat tiene shortcuts para enviar tu información como tu comprobante y tu identificación, solo teclea *iden* o *compro*.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 item"><i class="fa fa-clock-o icon"></i>
                            <h3 className="name">No importa la hora</h3>
                            <p className="description">Podrás ingresar, ver mascotas, donar, adoptar y todo lo que quieras sin importar donde estes ni que hora sea</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="team-boxed">
                <div className="container">
                    <div className="intro">
                        <h2 className="text-center">EarthBound Tech</h2>
                        <p className="text-center">Estudiantes de programación de la up amantes de lo animales que buscan usar sus conocimientos para aportar a la sociedad (;</p>
                    </div>
                    <div className="row people">
                        <div className="col-md-6 col-lg-4 item">
                            <div className="box">
                                <h3 className="name">Jyarü Hernández</h3>
                                <p className="title">front end DEVELOPER</p>
                                <p className="description">Fan de star wars, la programación y michilucas</p>
                                <div className="social"><a href="https://www.facebook.com/"><i className="fa fa-facebook-official"></i></a><a href="https://twitter.com/"><i className="fa fa-twitter"></i></a><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 item">
                            <div className="box">
                                <h3 className="name">Carlos Lecona</h3>
                                <p className="title"><strong>back end developer</strong></p>
                                <p className="description">Síndrome del crujito<br/>Síntomas:<br/>-Crujito</p>
                                <div className="social"><a href="https://www.facebook.com"><i className="fa fa-facebook-official"></i></a><a href="https://twitter.com/"><i className="fa fa-twitter"></i></a><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 item">
                            <div className="box">
                                <h3 className="name">Helena Giesemann</h3>
                                <p className="title">backend developer</p>
                                <p className="description"></p>
                                <div className="social"><a href="https://www.facebook.com/"><i className="fa fa-facebook-official"></i></a><a href="#"><i className="fa fa-twitter"></i></a><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 item">
                            <div className="box" id='anseliuts'>
                                <h3 className="name">Kenia Flores</h3>
                                <p className="title"><strong>front end developer</strong></p>
                                <p className="description"> </p>
                                <div className="social"><a href="https://www.facebook.com/"><i className="fa fa-facebook-official"></i></a><a href="#"><i className="fa fa-twitter"></i></a><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="d-xl-flex justify-content-center align-items-center" style={{background: 'rgb(50,50,50)'}}>
                <div className="container d-xl-flex justify-content-center align-items-center container-footer"><img className="img-fluid" width="50" src={EarthBoundlogo}/><h5>Contact us soporte@petbounds.tech</h5></div>
            </footer>
            </div>
          );
    }
}
export default PaginaInicio;
