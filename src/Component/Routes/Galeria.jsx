import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../confgSDK/SDK";
import { collection, getDocs } from "firebase/firestore";
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import logoFundacion from '../img/logoFundacion1.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Galeria() {
    const [logedIn, setLogedIn] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [mostrarCompletaFotoGaleria, setMostrarCompletaFotoGaleria] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // estado de autenticación del usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setLogedIn(true);
            } else {
                setLogedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    //btener todas las imágenes de la base de datos Firestore
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const collectionRef = collection(db, "copyOfTheUuidLibraryUrl");
                const snapshot = await getDocs(collectionRef);
                const urls = snapshot.docs.map(doc => doc.data().url);
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };

        fetchImages();
    }, []);

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };

    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setMostrarCompletaFotoGaleria(true);
    };

    const handleCloseFullImage = () => {
        setMostrarCompletaFotoGaleria(false);
    };

    //Mostrar la imagen anterior en la galería
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };

    //mostrar la imagen siguiente en la galería
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    return (
        <div className="contentGaleria content">
            {logedIn ? (
                <div>
                    <header className="encabezado">
                        <div className="namePage">
                            <h3>FUNDACION CENTRO MISIONERO EMPRESARIAL</h3>
                            {/* <p>Manos que Ayudan</p> */}
                        </div>
                        <div onClick={mostrarLogoCompleto} className="resgistradoLogoFundaMostrar">
                            <img src={logoFundacion} alt="Logo Fundacion" />
                        </div>
                        {imgLogoMostrarCompleto && (
                            <div className="contentRegistroMostrarCompletoLogo">
                                <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                                <div className="RegistroBarraFundaLogo">
                                    <img src={logoFundacion} alt="Logo Completo" />
                                </div>
                            </div>
                        )}
                    </header>
                    <div className="contentGaleriaPublicidad">
                        <div className="galeriaGrid">
                            {imageUrls.map((url, index) => (
                                <div className="galeriaItem" key={index} onClick={() => handleImageClick(index)}>
                                    <img src={url} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {mostrarCompletaFotoGaleria && (
                        <div className="mostrarCompletaFotoGaleria">
                            <FontAwesomeIcon onClick={handleCloseFullImage} className="closeIcon" icon={faXmark} />
                            <FontAwesomeIcon onClick={handlePrevImage} className="prevIcon" icon={faChevronLeft} />
                            <img src={imageUrls[currentImageIndex]} className="fullImage" />
                            <FontAwesomeIcon onClick={handleNextImage} className="nextIcon" icon={faChevronRight} />
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
