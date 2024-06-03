import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleGoogleLogin } from "../Authentications/AuthenticationGoogle";
import { handleFacebookLogin } from "../Authentications/AuthenticationFacebook";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";


export default function SesionDirecto() {

    return (
        <>
            <div className="popUpsesion">
                <h4 className="letraIniciodeSesion">Iniciar Sesion</h4>
                <div className="card2" onClick={handleFacebookLogin}>
                    <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                <h3 className="esteOEste">o</h3>
                </div>
                <div className="card1" onClick={handleGoogleLogin}>
                    <FontAwesomeIcon className="faGoogle" style={{ color: "#B197FC", }} icon={faGoogle} />
                </div>
            </div>
        </>
    )
}