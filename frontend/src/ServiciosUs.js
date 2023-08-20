import perritoRisas from "./assets/img/Perrito_obrero.png";
import { Link } from "react-router-dom";

function ServiciosUs(props) {
  return (
    <div className="erro" style={{ textAlign: "center" },{marginTop:'100px'}}>
      <h2>GUAU GUAU</h2>
      <h4>
        [En construccion]
      </h4>
      <img style={{ width: "500px" }} src={perritoRisas} />
      <Link to="/HomeUs" className="LinkError">
        <h4>Regresar a Home (;</h4>
      </Link>
    </div>
  );
}
export default ServiciosUs;
