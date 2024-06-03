import { onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../confgSDK/SDK";
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faXmark } from "@fortawesome/free-solid-svg-icons";
import logoFundacion from '../img/logoFundacion1.png';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


const libraries = ['places', 'marker'];

const locationAddress = "Carrera 18D No. 24-02 Barrio Primero de Mayo";

export default function InformacioFundacion() {
    const [logedIn, setlogedIn] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, user => {
            if (user) {
                setlogedIn(true);
            } else {
                setlogedIn(false);
            }
        });
        return unsubcribe;
    }, []);

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };

    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };

    const containerStyle = {
        width: '90%',
        height: '50vh',
        marginTop: '2%'
    };

    const center = {
        lat: 10.462589,
        lng: -73.253869
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAKM8zrLucC9kAtMVv8Gv1vkyAgDfa-MoY",
        libraries
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    return (
        <div className="contentInformacionFundacion content">
            {logedIn ? (
                <div>
                    <header className="encabezado">
                        <div className="namePage">
                            <h3>FUNDACION CENTRO MISIONERO EMPRESARIAL</h3>
                            <p>Manos que Ayudan</p>
                        </div>
                        <div onClick={mostrarLogoCompleto} className="resgistradoLogoFundaMostrar">
                            <img src={logoFundacion} alt="Logo Fundación" />
                        </div>
                        {imgLogoMostrarCompleto && (
                            <div className="contentRegistroMostrarCompletoLogo">
                                <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                                <div className="RegistroBarraFundaLogo">
                                    <img src={logoFundacion} alt="Logo Fundación Completo" />
                                </div>
                            </div>
                        )}
                    </header>
                    <div className="contentInnformacionFundaPublicidad">
                        <div className="contactosInformacionFundacion">
                            <h5 className="subtitulosDeInfor">Contactanos a los teléfonos :</h5>
                            <div className="numero1">
                                <FontAwesomeIcon className="iconWhatsappInfor" icon={faWhatsapp} />
                                <h5>3134965775</h5>
                            </div>
                            <div className="numero2">
                                <FontAwesomeIcon className="iconWhatsappInfor" icon={faWhatsapp} />
                                <h5>3104192453</h5>
                            </div>
                            <h5 className="subtitulosDeInfor">Correo Electrónico</h5>
                            <div className="correoElectronico">
                                <FontAwesomeIcon className="fatAtIconInforCorreo" icon={faAt} />
                                <h5>marcosangarita09@gmail.com</h5>
                            </div>
                            <div className="nit">
                                <b className="NITInfor">NIT</b>
                                <h5>901.812.496-2</h5>
                            </div>
                            <div className="fundadores">
                                <h5 className="subtitulosDeInfor">Fundadores :</h5>
                                <ul className="cantidadFundadores">
                                    <li> <b>1.</b> Marcos Angarita Pereira</li>
                                    <li> <b>2.</b> Orley Galan Vergel</li>
                                    <li> <b>3.</b> Harold Fernando Gonzales Garcia</li>
                                    <li> <b>4.</b> Claribel Galan Vergel</li>
                                    <li> <b>5.</b> Omar Yeisith Jaime Reyes</li>
                                    <li> <b>6.</b> Luis Alejandro Rozo Sandoval</li>
                                    <li> <b>7.</b> Imer A. Ariel Galan</li>
                                </ul>
                            </div>
                            <div className="googleMap">
                                <h5 className="subtitulosDeInfor">Nos encontramos ubicados en la {locationAddress}</h5>
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={18}
                                        onLoad={onLoad}
                                        onUnmount={onUnmount}
                                    >
                                        <Marker position={center} />
                                        
                                    </GoogleMap>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="inforFundaInicioDeSesion">
                    <SesionDirecto />
                </div>
            )}
        </div>
    );
}
