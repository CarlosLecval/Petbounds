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
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import phone from "./assets/img/phone.svg";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";

const MASCOTA = gql`
  query ($mascotaSelecId: ID!) {
    mascotaSelec(id: $mascotaSelecId) {
      id
      raza
      edad
      historia
      nombre
      foto
      tamano
      sexo
      estado
      organizacion {
        foto
        nombre
      }
    }
  }
`;

function ConfirmacionSolicitud(props) {
  const handleOnLoad = () => {
    if (localStorage.getItem("confirmacionReload") === "false") {
      localStorage.setItem("confirmacionReload", "true");
      window.location.reload();
    }
  };
  const { loading, error, data } = useQuery(MASCOTA, {
    variables: {
      mascotaSelecId: props.match.params.idMas,
    },
  });
  if (error) return null;
  if (loading) {
    return null;
  } else {
    var ruta = "/HomeUs";
    return (
      <section
        className="highlight-phone"
        style={{ background: "#222222" }}
        onLoad={handleOnLoad}
      >
        <div className="container" style={{ height: "440.547px" }}>
          <div className="row">
            <div className="col-md-8">
              <div className="intro">
                <h2
                  style={
                    ({ color: "var(--white)!important" },
                    { fontFamily: " Lexend" })
                  }
                >
                  ¡Muchas gracias!
                </h2>
                <p
                  style={
                    ({ color: "rgb(255,255,255)!important" },
                    { fontFamily: "Lexend" })
                  }
                >
                  Tu solicitud de adopción para {data.mascotaSelec.nombre} ha
                  sido exitosamente enviada, espera la respuesta de la
                  organización en unos días.
                </p>
                <p
                  style={
                    ({ color: "rgb(255,255,255)!important" },
                    { fontFamily: "Lexend" })
                  }
                >
                  Puedes ver tu solicitud en <em>Mis adopciones</em>
                </p>
                <Link
                  to={ruta}
                  className="btn btn-primary d-inline-flex align-items-center"
                  role="button"
                  style={({ paddingLeft: "10px" }, { paddingRight: "-10px" })}
                >
                  <i
                    className="fa fa-arrow-left"
                    style={({ fontSize: "26px" }, { marginRight: "10px" })}
                  ></i>
                  Volver al catálogo de mascotas
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="d-none d-md-block phone-mockup">
                <img className="device" src={phone} />
                <div className="screen" id="screen-con"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default ConfirmacionSolicitud;
