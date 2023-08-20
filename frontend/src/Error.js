import perritoRisas from "./assets/img/Perrito_obrero.png";
import { Link } from "react-router-dom";

function Error(props) {
  return (
    <div className="erro" style={{ textAlign: "center" },{marginTop:'100px'}}>
      <h2>GUAU GUAU</h2>
      <h4>
        [Vaya, parece que hubo un error, nada que un par de patitas no puedan
        arreglar]
      </h4>
      <img style={{ width: "500px" }} src={perritoRisas} />
      <Link to="/Registrarse" className="LinkError">
        <h4>Registrate aquí (;</h4>
      </Link>
    </div>
  );
}
export default Error;
