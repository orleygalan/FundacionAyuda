import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, storage, db } from "../confgSDK/SDK";
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import logoFundacion from '../img/logoFundacion1.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilePdf, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

export default function Curriculum() {
    const [logedIn, setLogedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
    const [file, setFile] = useState(null);
    const [pdfs, setPdfs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [comment, setComment] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [commentSent, setCommentSent] = useState(false);
    const [popUpBasuraPDF, setPopUpBasuraPDF] = useState(null);

    const ID_ADMIN = ['UQxvX9IejVW8OOjF2KMek9Jti7M2', '7WIvYvqLUMVLYhkw0CBZaXvDH012', 'WsbosRG1AbR29dj3zPjlQ1HDEtG2'];
    
    //Manejar las Estado de logeo de los usuarios
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setLogedIn(true);
                if (ID_ADMIN.includes(user.uid)) {
                    setIsAdmin(true);
                }
            } else {
                setLogedIn(false);
                setIsAdmin(false);
            }
        });
        return unsubscribe;
    }, []);

    //Recuperamos todos los archivos PDF ue estan almacenados en Storage y sus comentarios 
    //asociados en Firestore.
    useEffect(() => {
        const fetchPDFs = async () => {
            const storageRef = ref(storage, 'pdfs/');
            const result = await listAll(storageRef);
            const urls = await Promise.all(result.items.map(async item => {
                const url = await getDownloadURL(item);
                const pdfDocRef = doc(db, 'pdfs', item.name);
                const pdfDocSnap = await getDoc(pdfDocRef);
                const comentario = pdfDocSnap.exists() ? pdfDocSnap.data().comment : '';
                return { name: item.name, url, comentario };
            }));
            setPdfs(urls);
        };

        fetchPDFs();
    }, []);

    //cargar los archivos y verificar si son pdf
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file.type === 'application/pdf') {
            setFile(file);
            setShowPopup(true);
        } else {
            alert('Solo se permiten archivos PDF.');
        }
    };

    //Subimos el archivo pdf al storage y guardamos su url junto  con el comentario obligatorio en firestore y lo gestionamos mediante un progreso de carga
    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const uniqueFileName = `${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, `pdfs/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.error('Upload failed:', error);
                setUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                await setDoc(doc(db, 'pdfs', uniqueFileName), {
                    name: uniqueFileName,
                    url: downloadURL,
                    comment: comment
                });
                setPdfs(prevPdfs => [...prevPdfs, { name: uniqueFileName, url: downloadURL, comentario: comment }]);
                setFile(null);
                setProgress(0);
                setUploading(false);
                setComment('');
                setShowPopup(false);
                setCommentSent(false);
            }
        );
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

    //Eliminacion de archivo pdf del storage junto con el documento de firestore
    const handleDelete = async (name) => {
        const fileRef = ref(storage, `pdfs/${name}`);
        await deleteObject(fileRef);
        await deleteDoc(doc(db, 'pdfs', name));
        setPdfs(pdfs.filter(pdf => pdf.name !== name));
        setPopUpBasuraPDF(false);
    };

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };

    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };
    const mostrarPopUpBasura = (index) => {
        setPopUpBasuraPDF(index);
    }
    const ocultarPopUpBasura = () => {
        setPopUpBasuraPDF(false);
    }

    return (
        <div className="contentCurriculum content">
            {logedIn ? (
                <div>
                    <header className="encabezado">
                        <div className="namePage">
                        <h3>FUNDACION CENTRO DE INFLUENCIA MISIONERO EMPRESARIAL</h3>
                        <h4>MANOS QUE AYUDAN</h4>
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
                    <div className="contentCurriculumPublicidad navegacionUsuarioAdm">
                        {isAdmin && (
                            <div className="subirPublicacionCurrilum">
                                <div {...getRootProps()} className="SubirPDFMOstrar">
                                    <input {...getInputProps()} />
                                    <button disabled={file || uploading}>Subir Curriculum</button>
                                </div>
                                {file && showPopup && (
                                    <div className="subirPDFCurriculumBtn">
                                        <div className="comentContentPubli">
                                            <textarea
                                                placeholder="Escribe un comentario sobre este PDF (máximo 20 caracteres)"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                maxLength="20"
                                            />
                                        </div>
                                        <FontAwesomeIcon className="pdfPopUPComment" icon={faFilePdf} />
                                        <button onClick={handleUpload} disabled={!comment || uploading}>Publicar</button>
                                    </div>
                                )}
                                {uploading && (
                                    <progress className="cargadorSeñal" value={progress} max="100" />
                                )}
                            </div>
                        )}
                        <div className="ContentpdfcuRRiculum">
                            <h3 className="tituloCurriculum">Curriculums</h3>
                            {pdfs.map(({ name, url, comentario }, index) => (
                                <div className="pdfCard" key={index}>
                                    <h6 className="tipoDeTrabajo">{comentario}</h6>
                                    <div className="pdfIcon">
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon style={{color:'black'}} icon={faFilePdf} size="3x" />
                                            <div style={{color:'black'}}><FontAwesomeIcon style={{color:'black'}} icon={faStar} /> Calificar Trabajo</div>
                                        </a>
                                    </div>

                                    <div className="pdfActions">
                                        {isAdmin && (
                                            <div>
                                                <div className="linealSeparador"></div>
                                                <FontAwesomeIcon style={{color:'red'}} icon={faTrash} onClick={() => mostrarPopUpBasura(index)} />
                                            </div>
                                        )}
                                        {popUpBasuraPDF === index && (
                                            <div className="popUpBasura">
                                                <p>¿Estás seguro de que quieres eliminar este archivo?</p>
                                                <div className="siNoBasura">
                                                    <button className="btnNo" onClick={ocultarPopUpBasura}>No</button>
                                                    <button className="btnSi" onClick={() => handleDelete(name)} >Sí</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="curriculumInicioDeSesion">
                    <SesionDirecto />
                </div>
            )}
        </div>
    );
}
