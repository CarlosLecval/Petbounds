import { gql, useMutation} from "@apollo/client";
import logo from './assets/img/petbounds_blanco.png'
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/font-awesome.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import "./assets/css/styles.css";
import "./assets/css/Article-Clean.css";
import "./assets/css/Highlight-Phone.css";
import "./assets/css/Navigation-Clean.css";
import "./assets/css/Navigation-with-Search.css";
import "./index.css";
import Error from './Error'

const VALIDAR = gql `
mutation ($regValidacionId: ID!) {
    regValidacion(id: $regValidacionId) {
      success
    }
  }
  
`;

function Validacion(props){
    const [validarCorreo,{error}] = useMutation(VALIDAR,{
        variables:{
            "regValidacionId":props.match.params.id
        },
        onCompleted({regValidacion}){
            if(regValidacion.success){
                props.history.push("/IniciaSesion")
            }
        }
    });
    if (error) return(
        <Error></Error>
    );
    const onClick = () => {
        validarCorreo();
    }
    return(
        <div className="erro" style={{textAlign:"center"}}>
            <img style={{marginBottom:"35px"}} src={logo} width="300"/>
            <h4 style={{marginBottom:"35px"}}>Solo un paso más, confirma tu correo y únete a Petbounds!</h4>
            <button className="btn btn-primary" style={{fontFamily:"Lexend"}} onClick={onClick} >Confirmar</button>
        </div>
    );
}
export default Validacion;