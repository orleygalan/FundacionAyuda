import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import logoFundacion from '../img/logoFundacion1.png';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../confgSDK/SDK";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";


export default function AnuncioBiblicos() {

      // Verificacion de inicio de Sesion
      const [loggedIn, setLoggedIn] = useState(false);
      const [imgSubidaAdmFundaMostrarCompleta, setImgSubidaAdmFundaMostrarCompleta] = useState(false);
      // Almacenar los anuncios
      const [anuncios, setAnuncios] = useState([]);
      const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
      const [popupAnuncio, setPopupAnuncio] = useState(null);
      const [mostrarPopup, setMostrarPopup] = useState(false);
  
      // Manejar la autenticación de los usuarios
      useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, user => {
              if (user) {
                  setLoggedIn(true);
              } else {
                  setLoggedIn(false);
              }
          });
          return unsubscribe;
      }, []);
  
      // Obtener los anuncios desde Firestore
      useEffect(() => {
          const fetchAnuncios = async () => {
              try {
                  const anunciosSnapshot = await getDocs(collection(db, "announcements"));
                  const anunciosData = anunciosSnapshot.docs.map(doc => ({
                      id: doc.id,
                      text: doc.data().text,
                      color: doc.data().color,
                      timestamp: doc.data().timestamp.toDate()
                  }));
                  // Ordenar todos los anuncios por fecha
                  setAnuncios(anunciosData.sort((a, b) => b.timestamp - a.timestamp));
              } catch (error) {
                  console.error("Error al obtener los anuncios:", error);
              }
          };
          fetchAnuncios();
      }, []);
  
      // Abrir el logo de la persona registrada y mostrarlo completo
      const abrirlogoPersonaRegistradamotrarCompleto = () => {
          setImgSubidaAdmFundaMostrarCompleta(true);
      };
  
      // Cerrar la vista completa del logo de la persona registrada
      const cerrarlogoPersonaRegistradamotrarCompleto = () => {
          setImgSubidaAdmFundaMostrarCompleta(false);
      };
  
      // Mostrar el logo completo
      const mostrarLogoCompleto = () => {
          setImgLogoMostrarCompleto(true);
          setMostrarPopup(true);
      };
  
      // Cerrar la vista completa del logo
      const cerrarVistaLogoCompleto = () => {
          setImgLogoMostrarCompleto(false);
          setMostrarPopup(false);
      };
  
      // Cerrar el popup del anuncio
      const cerrarPopupAnuncio = () => {
          setPopupAnuncio(null);
          setMostrarPopup(false);
      };
  
      // Mostrar el popup del anuncio
      const mostrarPopupAnuncio = (anuncio) => {
          setPopupAnuncio(anuncio);
          setMostrarPopup(true);
      };
  

    return (
        <div className="contentAnuncioBiblicos">
            {loggedIn ? (
                <div className="definicionContent">
                    <header className="encabezado">
                        <div className="namePage">
                            <h3>FUNDACION CENTRO MISIONERO EMPRESARIAL</h3>
                            <p>Manos que Ayudan</p>
                        </div>
                        <div onClick={abrirlogoPersonaRegistradamotrarCompleto} className="resgistradoLogoFundaMostrar">
                            <img src={logoFundacion} />
                        </div>
                        {imgSubidaAdmFundaMostrarCompleta && (
                            <div className="contentRegistroMostrarCompletoLogo">
                                <FontAwesomeIcon onClick={cerrarlogoPersonaRegistradamotrarCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                                <div className="RegistroBarraFundaLogo">
                                    <img src={logoFundacion} alt="" />
                                </div>
                            </div>
                        )}
                    </header>
                    <div className="navegacionUsuarioAdmAnuncio">
                        {imgLogoMostrarCompleto && (
                            <div className="mostrarLogoCompleto">
                                <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="closeFotoCompleta" icon={faXmark} />
                                <div className="mostrarImgLogoConEfectoGrande">
                                    <img src={logoFundacion} alt="" />
                                </div>
                            </div>
                        )}
                        <div className="contentCardExterior">
                            {anuncios.map(anuncio => (
                                <div key={anuncio.id} onClick={() => mostrarPopupAnuncio(anuncio)} className="anuncio">
                                    <div className="cajaContenSubidaAdminAnuncioBiblicos">
                                        <div className="adminSubePublicacionFotoAnuncioBiblicos">
                                            <img onClick={mostrarLogoCompleto} src={logoFundacion} alt="" />
                                        </div>
                                        <h5 className="adminFundaAyudaSubeFotoNombre">FUNDACION CENTRO MISIONERO EMPRESARIAL</h5>
                                    </div>
                                    <div className="anuncioBiblicoFrase" style={{ backgroundColor: anuncio.color }}>
                                        <div className="apoyoScrollDerrame">
                                            <p className="fraseAnuncioBriblicosVer">{anuncio.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {mostrarPopup && (
                        <div className="popupAnuncio">
                            <div className="popupContent" style={{ backgroundColor: popupAnuncio.color }}>
                                <FontAwesomeIcon onClick={cerrarPopupAnuncio} className="popupCloseIcon" icon={faXmark} />
                                <div>
                                    <h4 className="textAnuncioPopUp">{popupAnuncio.text}</h4>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="mainHomeInicioDeSesion">
                    <SesionDirecto />
                </div>
            )}
        </div>
    )
}
