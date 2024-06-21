import { faBars, faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { auth } from "../confgSDK/SDK";
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function MenuBrowserRouter() {

    const LinkMenuBrowser = [
        {
            name: "",
            name2: "",
            href: "/"
        },
        {
            name: "Contenido",
            name2: "Contenido",
            href: "/mainHomen"
        },
        {
            name: "Anuncio",
            name2: "Anuncio",
            href: "/anuncioBiblicos"
        },
        {
            name: "Curriculum",
            name2: "Curriculum",
            href: "/curriculum"
        },
        {
            name: "Información",
            name2: "Información",
            href: "/informacioFundacion"
        },
        {
            name: "Publicación",
            href: "/zonadePublicacion",
            clienteEspecial: true
        },
        {
            name: "Galeria",
            name2: "Galeria",
            href: "/galeria"
        },
        {
            name: "Chat",
            name2: "Chat",
            href: "/chat"
        },
        {
            name: "Donación",
            name2: "Donación",
            href: "Donacion"
        }
    ]

    const AuthorizeUserUid = ['UQxvX9IejVW8OOjF2KMek9Jti7M2', '7WIvYvqLUMVLYhkw0CBZaXvDH012', 'WsbosRG1AbR29dj3zPjlQ1HDEtG2'];


    const [popUpMenuBurge, setPopUpMenuBurge] = useState(false);
    const [cambiarMenuPorEquis, setCambiarMenuPorEquis] = useState(false);
    const [userPhotoURL, setUserPhotoURL] = useState(null);
    const [userName, setUserName] = useState(null);
    const [verticalPopUpSesionClose, setVerticalPopUpSesionClose] = useState(false);


    const handlePopUpMenuBurger = () => {
        setPopUpMenuBurge(!popUpMenuBurge);
        setCambiarMenuPorEquis(!cambiarMenuPorEquis);
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserPhotoURL(user.photoURL);
                setUserName(user.displayName);
            } else {
                setUserPhotoURL(null)
                setUserName(null);
            }
        })
        return unsubcribe;
    }, [])


    const handlePopVerticalSesionClose = () => {
        setVerticalPopUpSesionClose(!verticalPopUpSesionClose);
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            window.location.href = '/'
        } catch (error) {
            console.error("Error al cerrar Sesion", error);
        }
    }

    return (
        <div className="MenuBrowserRouter">
            <div onClick={handlePopUpMenuBurger}>
                {cambiarMenuPorEquis ? (<FontAwesomeIcon className="equisBurger" icon={faXmark} />) : (<FontAwesomeIcon className="menuBurger" icon={faBars} />)}
            </div>
            <div className="planBMenu">
                {popUpMenuBurge && (
                    <div className="popUpMenuBurger">
                        <div className="cajadeUsuario">
                            <div className="usuarioMenu">
                                {userPhotoURL && (
                                    <div className="dataUser">
                                        <img src={userPhotoURL} alt="" />
                                        {userName && (<h5 className="userName">{userName}</h5>)}
                                        <div className="faEllipsisVertical" onClick={handlePopVerticalSesionClose}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </div>
                                    </div>
                                )}
                                {verticalPopUpSesionClose && (
                                    <div className="sesionCloseOCambiar">
                                        <button onClick={handleSignOut}>Cerrar Sesion</button>
                                    </div>
                                )}
                            </div>
                            <div className="ReactRouterDom">
                                {
                                    LinkMenuBrowser.map((sacar, index) => (
                                        <div key={index} className="LinkMenuSacar">
                                            {(sacar.clienteEspecial && auth.currentUser && AuthorizeUserUid.includes(auth.currentUser.uid)) || !sacar.clienteEspecial ? (
                                                <Link to={sacar.href}>
                                                    <h5>{sacar.name}</h5>
                                                </Link>
                                            ) : (
                                                <Link to={sacar.href}>
                                                    <h5>{sacar.name2}</h5>
                                                </Link>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}