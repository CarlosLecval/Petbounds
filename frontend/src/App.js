import React from "react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import PaginaInicio from "./PaginaInicio";
import LogIn from "./LogIn";
import MenuRegistro from "./MenuRegistro";
import CrearUsuario from "./CrearUsuario";
import CrearNegocio from "./CrearNegocios";
import CrearOrg from "./CrearOrg";
import HomeUs from "./HomeUs";
import DetallesMascota from "./DetallesMascota";
import ConfirmacionSolicitud from "./ConfirmacionSolicitud";
import PerfilUs from "./PerfilUs";
import MisLikesUs from "./MisLikesUs";
import EditarPerfilUs from "./EditarPerfilUs";
import MisAdopcionesUs from "./MisAdopcionesUs";
import HomeOrg from "./HomeOrg";
import Validacion from "./Validacion";
import AdopcionesOrg from "./AdopcionesOrg";
import MisMascotasOrg from "./MisMascotasOrg";
import EditarMascota from "./EditarMascota";
import PerfilOrg from "./PerfilOrg";
import EditarPerfilOrg from "./EditarPerfilOrg";
import ChatUs from "./ChatUs";
import ChatOrg from "./ChatOrg";
import DonacionesOrg from "./DonacionesOrg";
import DonacionesUs from "./DonacionesUs";
import DashboardDonacion from "./DashboardDonacion";
import ServiciosUs from "./ServiciosUs";

function App() {
  
  return (
    <HashRouter>
      <Route exact path="/" component={PaginaInicio} />
      <Route exact path="/IniciaSesion" component={LogIn} />
      <Route exact path="/Registrarse" component={MenuRegistro} />
      <Route exact path="/CrearUsuario" component={CrearUsuario} />
      <Route exact path="/CrearNegocio" component={CrearNegocio} />
      <Route exact path="/CrearOrg" component={CrearOrg} />
      <Route exact path="/HomeUs" component={HomeUs} />
      <Route exact path="/PerfilUs" component={PerfilUs} />
      <Route exact path="/ServiciosUs" component={ServiciosUs}/>
      <Route exact path="/Detalles/:idUs/:idMas" component={DetallesMascota} />
      <Route
        exact
        path="/ConfirmacionSolicitud/:idUs/:idMas"
        component={ConfirmacionSolicitud}
      />
      <Route exact path="/MisLikesUs" component={MisLikesUs} />
      <Route exact path="/EditarPerfilUs" component={EditarPerfilUs} />
      <Route exact path="/MisAdopcionesUs" component={MisAdopcionesUs} />
      <Route exact path="/HomeOrg" component={HomeOrg} />
      <Route exact path="/Validacion/:id" component={Validacion} />
      <Route exact path="/AdopcionesOrg" component={AdopcionesOrg} />
      <Route exact path="/MisMascotasOrg" component={MisMascotasOrg} />
      <Route exact path="/EditarMascota/:idMas" component={EditarMascota} />
      <Route exact path="/PerfilOrg" component={PerfilOrg} />
      <Route exact path="/EditarPerfilOrg" component={EditarPerfilOrg} />
      <Route exact path="/DonacionesOrg" component={DonacionesOrg} />
      <Route exact path="/DonacionesUs" component={DonacionesUs} />
      <Route exact path="/ChatUs/:idSol" component={ChatUs} />
      <Route exact path="/ChatOrg/:idSol" component={ChatOrg} />
      <Route
        exact
        path="/DashboardDonacion/:idDon"
        component={DashboardDonacion}
      />
    </HashRouter>
  );
}
export default App;
