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

    // Manejar la autenticación de los usuarios
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

    //mostrar un mensaje de agradecimiento y reinicioar o vaciar los input y los terminos y condiciones
    const handlePopupAccept = () => {
        if (confirmAccepted) {
            setShowPopup(false);
            alert("¡Gracias por su donación!");
            
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
        }
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

    return (
        <div className="contentDonacionFormu">
            {logedIn ? (
                <div>
                    <header className="encabezado">
                        <div className="namePage">
                            <h3>FUNDACION CENTRO MISIONERO EMPRESARIAL</h3>
                            {/* <p>Manos que Ayudan</p> */}
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
                                <p>Límite máximo: 1,000,000 COP</p>
                                <div>
                                    <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
                                    <label htmlFor="terms" className="TerminosCondicionAcepto">Acepto los términos y condiciones</label>
                                </div>
                                <button type="submit" disabled={!termsAccepted || formData.cantidad > 1000000}>Enviar</button>
                            </form>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup">
                            <div className="popupContent">
                                <FontAwesomeIcon onClick={() => setShowPopup(false)} className="popupCloseIcon" icon={faXmark} />
                                <h4>Mande al siguiente número de cuenta la cantidad especificada:</h4>
                                <b>52400010832</b>
                                <p>Tenga cuidado de no enviar un número de más. El administrador no podrá regresar el dinero en caso de error.</p>
                                <div>
                                    <input type="checkbox" id="confirm" checked={confirmAccepted} onChange={(e) => setConfirmAccepted(e.target.checked)} />
                                    <label className="entiendoAceptoTrans" htmlFor="confirm">He entendido y acepto</label>
                                </div>
                                <button className="btnAceptar" onClick={handlePopupAccept} disabled={!confirmAccepted}>Aceptar</button>
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
