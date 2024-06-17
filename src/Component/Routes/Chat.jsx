import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../confgSDK/SDK";
import SesionDirecto from "../reutilizarPartes/SesionDirecto";
import { faArrowLeft, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoFundacion from '../img/logoFundacion1.png';
import { collection, doc, addDoc, onSnapshot, serverTimestamp, query, where, orderBy, setDoc } from 'firebase/firestore';

const ADMIN_ID = 'UQxvX9IejVW8OOjF2KMek9Jti7M2';

export default function Chat() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [popChatDelAdmin, setPopChatDelAdmin] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userDisplayName, setUserDisplayName] = useState(null);

    // Estado de autenticacion y datos de los usuario logeados
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setLoggedIn(true);
                setUserId(user.uid);
                setUserEmail(user.email);
                setUserDisplayName(user.displayName);
                if (user.uid !== ADMIN_ID) {
                    fetchUserChats(user.uid);
                } else {
                    fetchAllChats();
                }
            } else {
                setLoggedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log('Chats:', chats);
    }, [chats]);

    // Obtener los chats del usuario
    const fetchUserChats = (userId) => {
        const q = query(collection(db, 'chats'), where('clientes', 'array-contains', userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedChats = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setChats(fetchedChats);
        });
        return unsubscribe;
    };

    // Obtener todos los chats para el administrador
    const fetchAllChats = () => {
        const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
            const fetchedChats = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setChats(fetchedChats);
        });
        return unsubscribe;
    };

    // Manejar la entrada a un chat
    const handleEntrada = (chatId) => {
        const chat = chats.find(c => c.id === chatId);
        setSelectedChatId(chatId);
        setSelectedChat(chat);
        setPopChatDelAdmin(true);
        fetchMessages(chatId);
    };

    // Manejar la salida de un chat
    const handleSalida = () => {
        setPopChatDelAdmin(false);
        setMessages([]);
    };

    // Mostrar el logo completo
    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };

    // Cerrar la vista del logo completo
    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };

    // Obtener los mensajes de los chat específico
    const fetchMessages = (chatId) => {
        const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetchedMessages);
        });
        return () => unsubscribe();
    };

    // Enviar un nuevo mensaje
    const enviarMensaje = async () => {
        if (!newMessage.trim()) return;
        await addDoc(collection(db, 'chats', selectedChatId, 'messages'), {
            contenido: newMessage,
            remitente: userId,
            timestamp: serverTimestamp()
        });
        setNewMessage('');
    };

    // Iniciar un nuevo chat de parte del usuario
    const iniciarNuevoChat = async () => {
        const user = auth.currentUser;
        const nuevoChatRef = doc(collection(db, 'chats'));
        await setDoc(nuevoChatRef, {
            clientes: [userId, ADMIN_ID],
            userName: userDisplayName,
            userPhotoUrl: user.photoURL
        });
        handleEntrada(nuevoChatRef.id);
    };

    return (
        <div className="contentChat content">
            {loggedIn ? (
                <div className="definicionContentChat">
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
                                    <img src={logoFundacion || 'defaultPhotoURL'} alt="Logo Fundación Completo" />
                                </div>
                            </div>
                        )}
                    </header>
                    <div className="contentChatPublicidad">
                        {chats.map(chat => (
                            <div key={chat.id} onClick={() => handleEntrada(chat.id)} className="chatDelAdministrador">
                                {userId === ADMIN_ID && (
                                    <div className="datosChatUsuario">
                                        <div className="fotoDelAbministrador">
                                            <img src={chat.userPhotoUrl} alt="" />
                                        </div>
                                        <h5>{chat.userName}</h5>
                                    </div>
                                )}
                                {userId !== ADMIN_ID && (
                                    <div className="dataAdminChat">
                                        <div className="fotoDelosUsuarios">
                                            <img src={logoFundacion} alt="" />
                                        </div>
                                        <h5>Manos que Ayudan</h5>
                                    </div>
                                )}
                            </div>
                        ))}
                        {userId !== ADMIN_ID && chats.length === 0 && (
                            <button className="iniciarNuevoChat" onClick={iniciarNuevoChat}>Iniciar Nuevo Chat</button>
                        )}
                    </div>
                    <div className="popChatDelAdmin">
                        {popChatDelAdmin && selectedChat && (
                            <div className="conversacionCliente">
                                <div className="barraChat">
                                    <FontAwesomeIcon onClick={handleSalida} className="salirDePopUpChat" icon={faArrowLeft} />
                                    {userId === ADMIN_ID ? (
                                        <div className="fotoDelosUsuarios">
                                            <img src={selectedChat.userPhotoUrl} alt={selectedChat.userName} />
                                        </div>
                                    ) : (
                                        <div className="fotoDelosUsuarios">
                                            <img src={logoFundacion} alt="Logo Fundación" />
                                        </div>
                                    )}
                                    <h5 className="nameClienteHablar">{userId === ADMIN_ID ? selectedChat.userName : "Manos que Ayudan"}</h5>
                                </div>
                                <div className="clienteReflejadoEnScroll">
                                    <div className="scrollChatearCoversation">
                                        {messages.map(msg => (
                                            <div key={msg.id} className={msg.remitente === userId ? "mensajeEnviado" : "mensajeRecibido"}>
                                                <div className="escritor">{msg.contenido}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="contentChatear">
                                    <div className="chatear">
                                        <input
                                            className="newMessage"
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Preguntame lo que Gustes..."
                                        />
                                        <FontAwesomeIcon className="Enviar" onClick={enviarMensaje} icon={faPaperPlane} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="chatInicioSesion">
                    <SesionDirecto />
                </div>
            )}
        </div>
    );
}
