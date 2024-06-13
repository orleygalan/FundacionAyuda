import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { handleGoogleLogin } from "../Authentications/AuthenticationGoogle";
import { handleFacebookLogin } from "../Authentications/AuthenticationFacebook";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "../confgSDK/SDK";
import logoFunda from '../img/logoFundacion1.png';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function InicioDeSesion() {
    const [popUpSesion, setPopUpSesion] = useState(false);
    const [logedIn, setLogedIn] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);

    const openPopUp = () => {
        setPopUpSesion(!popUpSesion);
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, user => {
            if (user) {
                setLogedIn(true);
            } else {
                setLogedIn(false);
            }
        });

        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    console.log("Auth result after redirect:", result);
                }
            } catch (error) {
                console.error("Error handling redirect result:", error);
            }
        };

        checkRedirectResult();

        return unsubcribe;
    }, []);

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    }

    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    }

    return (
        <>
            <div className="">
                {logedIn ? (
                    <div className="contentRegistroLogo">
                        <div onClick={mostrarLogoCompleto} className="resgistradoLogoFundaMostrar">
                            <img src={logoFunda} />
                        </div>
                        {imgLogoMostrarCompleto && (
                            <div className="contentRegistroMostrarCompletoLogo">
                                <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                                <div className="RegistroBarraFundaLogo">
                                    <img src={logoFunda} alt="" />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className="inicioSesion">
                            <button onClick={openPopUp}><h5>Iniciar Sesión</h5></button>
                        </div>
                        {popUpSesion && (
                            <div className="popUpsesion">
                                <button className="btnclose" onClick={openPopUp}>X</button>
                                <div className="card2" onClick={handleFacebookLogin}>
                                    <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                                </div>
                                <div className="card1" onClick={handleGoogleLogin}>
                                    <FontAwesomeIcon className="faGoogle" style={{ color: "#B197FC", }} icon={faGoogle} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
