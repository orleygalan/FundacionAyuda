import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../confgSDK/SDK";
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, setDoc, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref } from "firebase/storage";
import logoFundacion from '../img/logoFundacion1.png';

export default function MainHomen() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
    const [imgSubidaAdmFundaMostrarCompleta, setImgSubidaAdmFundaMostrarCompleta] = useState(false);
    const [mostrarFotoPublicacionCompleta, setMostrarFotoPublicacionCompleta] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setLoggedIn(true);
                fetchUserLikes(user.uid);
            } else {
                setLoggedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    // Obtener todos los me gusta de un usuario desde Firestore
    const fetchUserLikes = async (userId) => {
        try {
            const userLikesRef = doc(db, "userLikes", userId);
            const userLikesDoc = await getDoc(userLikesRef);
            if (userLikesDoc.exists()) {
                setUserLikes(userLikesDoc.data().photos || []);
            } else {
                setUserLikes([]);
            }
        } catch (error) {
            console.error("Error al obtener los Me gusta del usuario:", error);
        }
    };

    // Obtener todas las URLs de las imágenes desde Firestore
    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "copyOfTheUuidLibraryUrl"), orderBy("timestamp", "desc")));
                const imageDataPromises = querySnapshot.docs.map(async (doc) => {
                    const imageUrl = doc.data().url;
                    const imageRef = ref(storage, imageUrl);
                    const url = await getDownloadURL(imageRef);
                    const comment = doc.data().metadatoComment;
                    const likesCount = doc.data().likesCount;
                    const type = doc.data().type || '';
                    return { id: doc.id, url, comment, likesCount, type };
                });
                const imageDataArray = await Promise.all(imageDataPromises);
                console.log("Archivos obtenidos:", imageDataArray);
                setImageUrls(imageDataArray);
            } catch (error) {
                console.error("Error al obtener las URLs de las imágenes desde Firestore:", error);
            }
        };
        fetchImageUrls();
    }, []);

    useEffect(() => {
        const unsubscribes = [];

        imageUrls.forEach(image => {
            const docRef = doc(db, "copyOfTheUuidLibraryUrl", image.id);
            const unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    setImageUrls(prevImageUrls => prevImageUrls.map(img =>
                        img.id === doc.id ? { ...img, likesCount: doc.data().likesCount } : img
                    ));
                }
            });
            unsubscribes.push(unsubscribe);
        });

        return () => {
            unsubscribes.forEach(unsubscribe => unsubscribe());
        };
    }, [imageUrls]);

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };
    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };
    const abrirlogoPersonaRegistradamotrarCompleto = () => {
        setImgSubidaAdmFundaMostrarCompleta(true);
    };
    const cerrarlogoPersonaRegistradamotrarCompleto = () => {
        setImgSubidaAdmFundaMostrarCompleta(false);
    };

    // Manejar el clic en el botón me gusta de una imagen
    const handleLikeClick = async (imageId, imageUrl, userId) => {
        try {
            const userLikesRef = doc(db, "userLikes", userId);
            const userLikesDoc = await getDoc(userLikesRef);

            if (userLikesDoc.exists()) {
                const likedPhotos = userLikesDoc.data().photos || [];
                if (likedPhotos.includes(imageUrl)) {
                    await updateDoc(userLikesRef, {
                        photos: arrayRemove(imageUrl)
                    });
                    await updateDoc(doc(db, "copyOfTheUuidLibraryUrl", imageId), {
                        likesCount: increment(-1)
                    });
                    setUserLikes(prevLikes => prevLikes.filter(photo => photo !== imageUrl));
                } else {
                    await updateDoc(userLikesRef, {
                        photos: arrayUnion(imageUrl)
                    });
                    await updateDoc(doc(db, "copyOfTheUuidLibraryUrl", imageId), {
                        likesCount: increment(1)
                    });
                    setUserLikes(prevLikes => [...prevLikes, imageUrl]);
                }
            } else {
                await setDoc(userLikesRef, { photos: [imageUrl] });
                await updateDoc(doc(db, "copyOfTheUuidLibraryUrl", imageId), {
                    likesCount: increment(1)
                });
                setUserLikes([imageUrl]);
            }
        } catch (error) {
            console.error("Error al actualizar el contador de Me gusta en Firestore:", error);
        }
    };

    // Manejar el clic en una imagen mostrando la imagen completa
    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setMostrarFotoPublicacionCompleta(true);
    };

    // Cerrar la vista de la imagen completa
    const handleCloseFullImage = () => {
        setMostrarFotoPublicacionCompleta(false);
    };

    // Función para renderizar el contenido según el tipo (imagen o video)
    const renderContent = (sacar) => {
        if (sacar.type && sacar.type.startsWith('video/')) {
            return (
                <video className="videosContenidoPublicado" controls>
                    <source src={sacar.url} type={sacar.type} />
                </video>
            );
        } else {
            return (
                <img src={sacar.url} alt={`Imagen`} />
            );
        }
    };

    return (
        <div className="contentMainHome">
            {loggedIn ? (
                <div className="definicionContent">
                    <header className="encabezado">
                        <div className="namePage">
                            <h3>FUNDACION CENTRO DE INFLUENCIA MISIONERO EMPRESARIAL</h3>
                            <h4>MANOS QUE AYUDAN</h4>
                        </div>
                        <div onClick={abrirlogoPersonaRegistradamotrarCompleto} className="resgistradoLogoFundaMostrar">
                            <img src={logoFundacion} alt="Logo Fundación" />
                        </div>
                        {imgSubidaAdmFundaMostrarCompleta && (
                            <div className="contentRegistroMostrarCompletoLogo">
                                <FontAwesomeIcon onClick={cerrarlogoPersonaRegistradamotrarCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                                <div className="RegistroBarraFundaLogo">
                                    <img src={logoFundacion} alt="Logo Fundación" />
                                </div>
                            </div>
                        )}
                    </header>
                    <div className="navegacionUsuarioAdm">
                        <div className="cartasContenExterior">
                            {imgLogoMostrarCompleto && (
                                <div className="mostrarLogoCompleto">
                                    <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="closeFotoCompleta" icon={faXmark} />
                                    <div className="mostrarImgLogoConEfectoGrande">
                                        <img src={logoFundacion} alt="Logo Fundación" />
                                    </div>
                                </div>
                            )}
                            {imageUrls.map((sacar, index) => (
                                <div key={index} className="gestionamientoCarta">
                                    <div className="cajaContenSubidaAdmin">
                                        <div className="adminSubePublicacionFoto">
                                            <img onClick={mostrarLogoCompleto} src={logoFundacion} alt="Logo Fundación" />
                                        </div>
                                        <h5 className="adminFundaAyudaSubeFotoNombre">FUNDACION CENTRO DE INFLUENCIA MISIONERO EMPRESARIAL MANOS QUE AYUDAN</h5>
                                    </div>
                                    <div className="carruselDeCards">
                                        <div className="commentPubliAdmin">
                                            <p>{sacar.comment}</p>
                                        </div>
                                        <div className="cartasPublicaciones" onClick={() => handleImageClick(index)}>
                                            {renderContent(sacar)}
                                        </div>
                                        <div className="reacciones">
                                            <div
                                                className="heartReaccion"
                                                onClick={() => handleLikeClick(sacar.id, sacar.url, auth.currentUser.uid)}
                                                style={{ color: userLikes.includes(sacar.url) ? 'red' : 'white' }}
                                            >
                                                <FontAwesomeIcon icon={faHeart} />
                                                <h6 className="cantidadMeGustas">{sacar.likesCount}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {mostrarFotoPublicacionCompleta && (
                                <div className="mostrarCompletaFotoGaleria">
                                    <FontAwesomeIcon onClick={handleCloseFullImage} className="closeIcon" icon={faXmark} />
                                    {renderContent(imageUrls[currentImageIndex])}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mainHomeInicioDeSesion">
                    <SesionDirecto />
                </div>
            )}
        </div>
    );
}
