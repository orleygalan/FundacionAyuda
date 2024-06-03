import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClipboardList, faList, faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../confgSDK/SDK";
import { onAuthStateChanged } from "firebase/auth";
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import logoFundacion from '../img/logoFundacion1.png';
import AnuncioAdmin from "../reutilizarPartes/anunciosPublicidad";

export default function ZonadePublicacion() {
    const [comment, setComment] = useState('');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [publicacion, setPublicacion] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
    const [anunciosPublicidadColor, setAnunciosPublicidadColor] = useState(false);
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [popUpCuadroFromBox, setPopUpCuadroFromBox] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setLoggedIn(!!user);
        });
        return unsubscribe;
    }, []);

    // manejar la subida de archivos
    useEffect(() => {
        const q = query(collection(db, "donations"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationsData = [];
            querySnapshot.forEach((doc) => {
                donationsData.push({ ...doc.data(), id: doc.id });
            });
            setDonations(donationsData);
        });

        return () => unsubscribe();
    }, []);

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length > 1) {
            alert('Solo se pueden subir un máximo de 1 imágen.');
        } else {
            setFiles(acceptedFiles);
        }
    };

    //manejar toda la subida de imágenes al almacenamiento
    const handleUpload = async () => {
        setUploading(true);
        const storage = getStorage();

        try {
            const uploadedImageInfo = await Promise.all(files.map(async (file) => {
                const imageName = v4();
                const storageRef = ref(storage, `zonaPublicacion/${imageName}`);
                await uploadBytes(storageRef, file, { customMetadata: { comment } });
                const downloadURL = await getDownloadURL(storageRef);
                await addDoc(collection(db, 'copyOfTheUuidLibraryUrl'), {
                    name: imageName,
                    url: downloadURL,
                    metadatoComment: comment,
                    timestamp: serverTimestamp()
                });
                return { name: imageName, url: downloadURL };
            }));

            const uploadedImageNames = uploadedImageInfo.map(info => info.name);
            console.log('Imágenes subidas correctamente:', uploadedImageNames);
            console.log('Información de las imágenes subidas:', uploadedImageInfo);
        } catch (error) {
            console.error('Error al subir las imagenes:', error);
        } finally {
            setUploading(false);
            setFiles([]);
            setComment('');
        }
    };

    //manejar la subida de archivos
    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    const closePopUp = () => {
        setFiles([]);
        setPublicacion(false);
    };

    const quieresSalir = () => {
        setPublicacion(!publicacion);
    };

    const NOquieroSalir = () => {
        setPublicacion(false);
    };

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };

    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };

    const mostrarPopUpAnuncioColor = () => {
        setAnunciosPublicidadColor(true);
    };

    const handleClickListFormuDonacion = (donation) => {
        setSelectedDonation(donation);
    };

    const closePopupFormuDonacion = () => {
        setSelectedDonation(null);
    };

    const handleSeePopUpBoxForm = () => {
        setPopUpCuadroFromBox(true);
    };

    const closePopUpBoxForm = () => {
        setPopUpCuadroFromBox(false);
    };

    return (
        <>
            <div className="contentZonaPublicacion content">
                {loggedIn ? (
                    <div className="contentUsuarioRegistradoMostrarServicio">
                        <header className="encabezado">
                            <div className="namePage">
                                <h3>FUNDACION CENTRO MISIONERO EMPRESARIAL</h3>
                                <p>Manos que Ayudan</p>
                            </div>
                            <div onClick={mostrarLogoCompleto} className="resgistradoLogoFundaMostrar">
                                <img src={logoFundacion} />
                            </div>
                            {imgLogoMostrarCompleto && (
                                <div className="contentRegistroMostrarCompletoLogo">
                                    <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                                    <div className="RegistroBarraFundaLogo">
                                        <img src={logoFundacion} alt="" />
                                    </div>
                                </div>
                            )}
                        </header>
                        <div className="navegacionAdmDeZonaPublicacion">
                            <div className="contentRutasExpancioComunicado">
                                <div {...getRootProps()} className="SubirFotosVideos publicidad">
                                    <input {...getInputProps()} accept="image/*, video/*" capture="environment" />
                                    <FontAwesomeIcon className="iconPublicatio" icon={faPhotoFilm} />
                                    <h5>Subir fotos/Video</h5>
                                </div>
                                <div className="CrearPublicacion publicidad" onClick={mostrarPopUpAnuncioColor}>
                                    <FontAwesomeIcon className="iconPublicatio" icon={faNewspaper} />
                                    <h5>Crear Publicación</h5>
                                </div>
                                <div className="listaFormulario publicidad" onClick={handleSeePopUpBoxForm}>
                                    <FontAwesomeIcon className="iconPublicatio" icon={faClipboardList} />
                                    <h5>Lista de los  Datos del Formulario de Donación</h5>
                                </div>
                                <div className="popUpCompletoInforFrom">
                                    {popUpCuadroFromBox && (
                                        <div className="popUpCuadroFromBox">
                                            <FontAwesomeIcon onClick={closePopUpBoxForm} className="iconSalirfaArrowLeft" icon={faArrowLeft} />
                                            <div className="contentScrollFromBox" >
                                                {donations.map((donation) => (
                                                    <div key={donation.id} className="donationItem" onClick={() => handleClickListFormuDonacion(donation)}>
                                                        <FontAwesomeIcon icon={faList} className="listIcon" />
                                                        <p>{donation.nombre} {donation.apellidos}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {selectedDonation && (
                                    <div className="popup">
                                        <div className="popupContent">
                                            <FontAwesomeIcon onClick={closePopupFormuDonacion} className="popupCloseIcon" icon={faXmark} />
                                            <h4>Detalles de la Donación</h4>
                                            <p><strong>Nombre:</strong> {selectedDonation.nombre}</p>
                                            <p><strong>Apellidos:</strong> {selectedDonation.apellidos}</p>
                                            <p><strong>Email:</strong> {selectedDonation.email}</p>
                                            <p><strong>Teléfono:</strong> {selectedDonation.telefono}</p>
                                            <p><strong>Dirección:</strong> {selectedDonation.direccion}</p>
                                            <p><strong>Ciudad:</strong> {selectedDonation.ciudad}</p>
                                            <p><strong>País:</strong> {selectedDonation.pais}</p>
                                            <p><strong>Cantidad:</strong> {selectedDonation.cantidad} COP</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {files.length > 0 && (
                                <div className="popUpSubirFhotoAndVideo">
                                    <div className="contenscrollSubirFhotoAndVideo">
                                        <header className="menuDeImmagenaSubir">
                                            <div className="cajaSubirFotoyVideos">
                                                <FontAwesomeIcon className="salirDeSubirFoto" onClick={quieresSalir} icon={faXmark} />
                                                <h5>Subir Fotos y videos</h5>
                                            </div>
                                            <button className="publicarFotoBtn" onClick={handleUpload} disabled={!files || uploading}> <h5>Publicar</h5> </button>
                                        </header>
                                        <textarea className="escribirUnComentarioAlPublicarFoto" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escribe un comentario..." />
                                        <div className="imagenaSubir">
                                            {files.map((file, index) => (
                                                <div className="manejarImagenSubir" key={index}>
                                                    <img src={URL.createObjectURL(file)} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {publicacion && (
                                <div className="closePublicacion">
                                    <h5>¿ Seguro Que Quieres Salir ?</h5>
                                    <div className="closePublicacionBtnCentrado">
                                        <button onClick={closePopUp}>sí</button>
                                        <button onClick={NOquieroSalir}>No</button>
                                    </div>
                                </div>
                            )}
                            {anunciosPublicidadColor && (
                                <div className="contentAnunciosPublicidadColor">
                                    <h5 className="subirAnuncio">subir Anuncio</h5>
                                    <AnuncioAdmin
                                        setAnunciosPublicidadColor={setAnunciosPublicidadColor}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <SesionDirecto />
                )}
            </div>
        </>
    );
}
