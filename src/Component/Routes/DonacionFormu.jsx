import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../confgSDK/SDK";
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import logoFundacion from '../img/logoFundacion1.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function DonacionFormu() {
    const [logedIn, setlogedIn] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        pais: "",
        cantidad: "",
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [confirmAccepted, setConfirmAccepted] = useState(false);
    const [aceptarTerminos, setAceptarTerminos] = useState(false);
    const [nombreDonante, setNombreDonante] = useState(false);

    // Manejar la autenticación de los usuarios
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, user => {
            if (user) {
                setlogedIn(true);
                setNombreDonante(user.displayName);
            } else {
                setlogedIn(false);
                setNombreDonante(false);
            }
        });
        return unsubcribe;
    }, []);

    //Actualiza todos los valores ingresados en el formulario input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //aceptar terminos y condiciones , y mostrar el popUp de confirmacion
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (termsAccepted && formData.cantidad <= 1000000) {
            try {
                await addDoc(collection(db, "donations"), {
                    ...formData,
                    timestamp: serverTimestamp()
                });
                setShowPopup(true);
            } catch (error) {
                console.error("Error al enviar la donación:", error);
            }
        } else {
            alert("Debe aceptar los términos y condiciones y la cantidad no debe exceder 1,000,000 COP");
        }
    };

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };

    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };

    //reinicioar o vaciar los input y los terminos y condiciones
    const handlePopupAccept = () => {
            setShowPopup(false);

            setFormData({
                nombre: "",
                apellidos: "",
                email: "",
                telefono: "",
                direccion: "",
                ciudad: "",
                pais: "",
                cantidad: "",
            });
            setTermsAccepted(false);
            setConfirmAccepted(false);
    };

    //verificacion de rastreo para no exceder el limite de lacanntidad de plata
    const handleMontoChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value <= 1000000) {
            setFormData({
                ...formData,
                cantidad: value
            });
        } else {
            alert("El monto máximo permitido es de un millón de pesos colombianos.");
        }
    };

    const leerTerminosCondiciones = () => {
        setAceptarTerminos(!aceptarTerminos);
    }

    return (
        <div className="contentDonacionFormu">
            {logedIn ? (
                <div>
                    <header className="encabezado">
                        <div className="namePage">
                            <h3>FUNDACION CENTRO DE INFLUENCIA MISIONERO EMPRESARIAL</h3>
                            <h4>MANOS QUE AYUDAN</h4>
                        </div>
                        <div onClick={mostrarLogoCompleto} className="resgistradoLogoFundaMostrar">
                            <img src={logoFundacion} alt="logoFundacion" />
                        </div>
                        {imgLogoMostrarCompleto && (
                            <div className="contentRegistroMostrarCompletoLogo">
                                <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                                <div className="RegistroBarraFundaLogo">
                                    <img src={logoFundacion} alt="logoFundacionCompleto" />
                                </div>
                            </div>
                        )}
                    </header>
                    <div className="contentDonacionScroll">
                        <p className="aviso">Tenga cuidado de no enviar un número de más. El administrador no podrá regresar el dinero en caso de error.</p>
                        <div className="donationSection">
                            <form className="formularioDonacion" onSubmit={handleSubmit}>
                                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                                <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
                                <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
                                <input type="tel" name="telefono" placeholder="Número de Teléfono" value={formData.telefono} onChange={handleChange} required />
                                <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
                                <input type="text" name="ciudad" list="ciudades" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
                                <datalist id="ciudades">
                                    <option value="Valledupar" />
                                    <option value="Bogotá" />
                                    <option value="Medellín" />
                                    <option value="Cali" />
                                </datalist>
                                <input type="text" name="pais" list="paises" placeholder="País" value={formData.pais} onChange={handleChange} required />
                                <datalist id="paises">
                                    <option value="Colombia" />
                                    <option value="Estados Unidos" />
                                    <option value="México" />
                                    <option value="España" />
                                </datalist>
                                <input type="number" name="cantidad" placeholder="Cantidad (COP)" value={formData.cantidad} onChange={handleMontoChange} required />
                                <p className="LimiteMaxDona">Límite máximo: 1,000,000 COP</p>
                                <div className="terminosCOndicionesFormuDona">
                                    <b>A Continuación Leer los Terminos y Condiciones Para Continuar</b>
                                    <div>⬇</div>
                                    <a href="#" style={{ color: "black", textDecorationLine: "underline", marginTop: "5%", marginBottom: "5%" }} onClick={leerTerminosCondiciones}>Terminos y Condiciones</a>
                                    {aceptarTerminos && (
                                        <>
                                            <ol className="todosLosTerminos">
                                                Términos y Condiciones de la Fundación Centro de Influencia Misionero Empresarial Manos que Ayudan


                                                <li>
                                                    . Donaciones
                                                    - Al realizar una donación a nuestra fundación, estás contribuyendo directamente a apoyar a las comunidades más vulnerables. Todas las donaciones son voluntarias y no reembolsables.
                                                    - Nos comprometemos a utilizar los fondos de manera transparente y eficiente, garantizando que lleguen a quienes más los necesitan.
                                                </li>
                                                <li>
                                                    . Privacidad
                                                    - Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Utilizaremos la información proporcionada únicamente con el propósito de procesar tu donación y mantenerte informado sobre nuestro trabajo.
                                                </li>
                                                <li>
                                                    . Seguridad
                                                    - Nuestra página web cuenta con medidas de seguridad para proteger tus datos durante el proceso de donación. Sin embargo, no podemos garantizar la seguridad absoluta en internet, por lo que te recomendamos tomar precauciones adicionales al realizar tu donación.
                                                </li>
                                                <li>
                                                    . Responsabilidad
                                                    - La Fundación Centro de Influencia Misionero Empresarial Manos que Ayudan no se hace responsable por el uso indebido de los fondos donados por terceros. Nos comprometemos a utilizar los recursos de manera responsable y transparente.
                                                </li>
                                                <li>
                                                    . Cambios en los Términos y Condiciones
                                                    - Nos reservamos el derecho de realizar cambios en estos términos y condiciones en cualquier momento, sin previo aviso. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier actualización.
                                                </li>
                                                <li>
                                                    . Contacto
                                                    - Si tienes alguna pregunta o inquietud sobre nuestros términos y condiciones, no dudes en ponerte en contacto con nosotros a través de nuestro formulario de contacto en la página web.
                                                </li>
                                                Al realizar una donación a la Fundación Centro de Influencia Misionero Empresarial Manos que Ayudan, aceptas automáticamente estos términos y condiciones. Agradecemos tu generosidad y apoyo a nuestra causa.

                                                <p>¡Gracias por ser parte de nuestra misión de ayudar a quienes más lo necesitan!</p>
                                            </ol>
                                            <div>
                                                <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
                                                <label htmlFor="terms" className="TerminosCondicionAcepto">Acepto los términos y condiciones</label>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <button type="submit" style={{ color: "black" }} disabled={!termsAccepted || formData.cantidad > 1000000}>Enviar</button>
                            </form>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup">
                            <div className="popupContent">
                                <FontAwesomeIcon onClick={() => setShowPopup(false)} className="popupCloseIcon" icon={faXmark} />
                                <h4>Llamanos Primero al siguiente numero Para otorgarte el permiso necesario para que nos consignes:</h4>
                                <b>+57 3104192453</b>
                                <p>Esperamos Tu llamada Anciosamente {nombreDonante} ..</p>

                                <button className="btnAceptar" onClick={handlePopupAccept} disabled={confirmAccepted} >Aceptar</button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="galeriaInicioDeSesion">
                    <SesionDirecto />
                </div>
            )}
        </div>
    );
}
