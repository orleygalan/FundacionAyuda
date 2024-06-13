import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../confgSDK/SDK";
<<<<<<< HEAD
// import familiaFundacion from "../img/familiaFundacion.png"
// import videoPresentacion from "../img/WhatsApp Video 2024-05-23 at 11.21.50 PM.mp4"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logoFundacion from '../img/logoFundacion1.png';
import SesionDirecto from "../reutilizarPartes/SesionDirecto"
// import Informacion from "../Routes/InformacionFundacion"
import { useNavigate } from "react-router";
=======
import familiaFundacion from "../img/familiaFundacion.png"
import videoPresentacion from "../img/WhatsApp Video 2024-05-23 at 11.21.50 PM.mp4"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logoFundacion from '../img/logoFundacion1.png';
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a


export default function RevisionUsuario() {

    const [logedIn, setLogedIn] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);
<<<<<<< HEAD
    const [uneteANostros, setUneteANosotros] = useState(false);
    const [informacionFundacion, setInformacionFundacion] = useState(false);
=======
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, user => {
            if (user) {
                setLogedIn(true);
            } else {
                setLogedIn(false);
            }
        })
        return unsubcribe;
    }, [])

    const mostrarLogoCompleto = () => {
        setImgLogoMostrarCompleto(true);
    };

    const cerrarVistaLogoCompleto = () => {
        setImgLogoMostrarCompleto(false);
    };

<<<<<<< HEAD
    const handleClickUnete = () =>{
        setUneteANosotros(true);
    }
    const handleClickInformacionFunda = () =>{
     masInformacion('/informacioFundacion')
    }

    const masInformacion = useNavigate();

=======
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a
    return (
        <div className='mainContent'>
            <header className="encabezado">
                <div className="namePage">
                    <h3>FUNDACION CENTRO MISIONERO EMPRESARIAL</h3>
<<<<<<< HEAD
                    {/* <p>Manos que Ayudan</p> */}
=======
                    <p>Manos que Ayudan</p>
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a
                </div>
                {logedIn && (
                    <div onClick={mostrarLogoCompleto} className="resgistradoLogoFundaMostrar">
                        <img src={logoFundacion} alt="Logo Fundación" />
                    </div>
                )}
                {imgLogoMostrarCompleto && (
                    <div className="contentRegistroMostrarCompletoLogo">
                        <FontAwesomeIcon onClick={cerrarVistaLogoCompleto} className="RegisterCerrarFundacloseFotoCompleta" icon={faXmark} />
                        <div className="RegistroBarraFundaLogo">
                            <img src={logoFundacion} alt="Logo Fundación Completo" />
                        </div>
                    </div>
                )}
            </header>
<<<<<<< HEAD
            <div className="contenedorVistaPrevia">
                <div className="forma1">
                    <div className="forma1Texto1">
                        <h1>Transformando Vidas a través de la ayuda y el servicio</h1>
                        <p >La Fundación Centro Misionero Empresarial Manos que ayudan se dedica a brindar apoyo y oportunidades de crear espacios recreativos.</p>
                        <div className="btnsInfor">
                        <button className="btnUno" onClick={handleClickInformacionFunda} >Más Información</button>
                           {logedIn ? (<></>):( <button className="btnDos" onClick={handleClickUnete}>Unete a Nosotros</button>)}
                        </div>
                    </div>
                </div>
                {/* {informacionFundacion && (
                    <Informacion />
                )} */}
                {uneteANostros && (
                    <SesionDirecto />
                )}
                <div className="forma2">
                    <div className="forma2Sector1">
                        <h1>Sobre Nosotros</h1>
                        <p>
                            La Fundación Centro Misionero Empresarial Manos que Ayudan
                            es una organización sin fines de lucro dedicada a generar
                            oportunidades para la comunidad en general, a través de programas
                            de desarrollo sostenible educación .
                        </p>
                    </div>
                    <div className="forma2Sector2">
                        <div className="cuadroObjetivo">
                            <h3>OBJETVO</h3>
                            <p>
                                Como entidad sin ánimo de lucro la fundación,
                                como objeto tendrá la de generar espacios y oportunidades
                                para la comunidad en general, haciendo énfasis en el cuidado,
                                prevención y conservación de la salud física, mental y espiritual,
                                aprendizaje y formación de los valores y principios fundamentales
                                empresariales en la transformación de las personas, inculcando tanto
                                la excelencia, así como el servicio abnegado, altruista a Dios y a sus
                                semejantes.
                            </p>
                        </div>
                        <div className="cuadroVision">
                            <h3>VISIÓN</h3>
                            <p>
                                La Visión es ser un espacio de crecimiento para sus participantes acompañándolos
                                durante su desarrollo intelectual, social, empresarial y espiritual, preparándolos
                                para ser agentes de esperanza donde les toque desempeñar su tarea profesional. Que,
                                habiéndose insertado en el mercado laboral, puedan ofrecer a las personas con las
                                que les toque trabajar una atención profesional de excelencia y además cuenten con
                                el valor agregado de brindar esperanza en todos los aspectos de la vida.
                            </p>
                        </div>
                        <div className="cuadroMision">
                            <h3>MISIÓN</h3>
                            <p>
                                La Misión es la de generar oportunidades para los jóvenes con el objeto de que aprendan
                                y crezcan en la formación de los valores y principios fundamentales en la transformación
                                de las personas, inculcando tanto la excelencia, así como el servicio abnegado, altruista
                                a Dios y a sus semejantes, basados en Mateo 9:35 y Santiago 1:27, 1 de Timoteo 4: 11 al 16,
                                teniendo como modelo máximo a Jesucristo y sus enseñanzas.
                            </p>
                        </div>
                        <div className="cuadroPrincipios">
                            <h3>DIEZ PRINCIPIOS</h3>
                            <ul>
                                <li>No despertar prejuicios</li>
                                <li>Encuentre a la gente donde está</li>
                                <li>Movilícese lenta y cuidadosamente</li>
                                <li>Adapte el mensaje a la audiencia</li>
                                <li>Use una variedad de métodos</li>
                                <li>Viva el mensaje</li>
                                <li>Trate a las personas con respeto y bondad</li>
                                <li>No critique</li>
                                <li>Trabaje personalmente en grupos pequeños y con las familias</li>
                                <li>Siga el método de Cristo. </li>
                            </ul>
                        </div>
                        <div className="cuadroGeneral">
                            <h3>OBJETIVOS GENERALES</h3>
                            <ul>
                                <li>talleres teórico-prácticos sobre alimentación saludable.</li>
                                <li>talleres de idioma</li>
                                <li>consejería</li>
                                <li>psicológica</li>
                                <li>arte.</li>
                                <li>Clases de instrumentos musicales </li>
                                <li>evangelismo online por redes sociales.</li>
                                <li>Impulsar el Ministerio de la Música. (Todo joven debe estar bien conectado con Dios para desarrollar un buen trabajo musical en su iglesia)</li>
                                <li>Incentivar a los jóvenes para crear coros utilizando instrumentos como la guitarra, triple, arpa entre otros. (dar serenatas). La buena música ahuyenta al espíritu maligno. 1 Samuel 16:23.</li>
                                <li>Seminarios, charlas y talleres didácticos sobre manejo de conflictos familiares y ayuda frente al flagelo del alcoholismo y la drogadicción.</li>
                                <li>Conseguir fondos que apoyen el movimiento misionero </li>
                                <li>Fomentar y desarrollar competencia de liderazgo en los miembros del C.F.M.E. para desarrollarse como futuros líderes en el mismo y en cualquier ámbito donde sean llamados. </li>
                                <li>Trabajar en la preparación de materiales y en el ofrecimiento de seminarios y cursos de capacitación y promoción que respondan a los proyectos misioneros-Empresariales locales y globales. </li>
                                <li>Centros de vida saludable</li>
                                <li>Entre otras actividades empresariales. </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="forma3">
                    <div className="forma3Sector1">
                        <h1>Contáctanos</h1>
                        <p>
                            Si tienes alguna pregunta comentario o deseas obtener más información sobre nuestros
                            programas no dudes en comunicarte con nosotros.
                        </p>
                    </div>
                    <div className="forma3Sector2">
                        <div className="direccion">
                            <h5>Dirección</h5>
                            <p>Carrera 18D No. 24-02 Barrio Primero de Mayo</p>
                        </div>
                        <div className="telefono">
                            <h5>Teléfonos</h5>
                            <p>+57 3134965775</p>
                            <p>+57 3104192453</p>
                        </div>
                        <div className="correo">
                            <h5>Correo Electronico</h5>
                            <p>marcosangarita09@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="forma4">
                    <div className="forma4Sesion1">
                        <b>
                            En la Fundación Centro Misionero Empresarial Manos que Ayudan,
                            buscamos conformar un sistema de evangelización como medio para grandes ciudades.
                        </b>
                    </div>
                </div>
                <div className="forma5">
                    <b> Fundación Centro Misionero Empresarial Manos que Ayudan </b>
                    <div className="PoliticaSercicio">
                        <b> Politica de privacidad y Términos de servicio </b>
                    </div>
=======
            <div className="vision">
                <h3 className="visionAneloH5">OBJETIVO</h3>
                <div className="contenVision">
                    <p>
                        Como entidad sin ánimo de lucro la fundación,
                        como objeto tendrá la de generar espacios y oportunidades
                        para la comunidad en general, haciendo énfasis en el cuidado,
                        prevención y conservación de la salud física, mental y espiritual,
                        aprendizaje y formación de los valores y principios fundamentales
                        empresariales en la transformación de las personas, inculcando tanto
                        la excelencia, así como el servicio abnegado, altruista a Dios y a sus
                        semejantes.
                    </p>
                </div>
            </div>
            <div className="sesion1_1">
                <h3>VISIÓN</h3>
                <div className="contentVisionReal">
                    <p>
                        La Visión es ser un espacio de crecimiento
                        para sus participantes acompañándolos durante su
                        desarrollo intelectual, social, empresarial y espiritual,
                        preparándolos para ser agentes de esperanza donde les toque desempeñar
                        su tarea profesional. Que, habiéndose insertado en el mercado laboral,
                        puedan ofrecer a las personas con las que les toque trabajar una atención profesional
                        de excelencia y además cuenten con el valor agregado de brindar esperanza en todos los
                        aspectos de la vida.
                    </p>
                </div>
            </div>
            <div className="sesion1_2">
                <h3>MISIÓN</h3>
                <div className="contentMisionReal">
                    <p>
                        La Misión
                        es la de generar oportunidades para los jóvenes con el objeto de que aprendan
                        y crezcan en la formación de los valores y principios fundamentales en la transformación
                        de las personas, inculcando tanto la excelencia, así como el servicio abnegado, altruista
                        a Dios y a sus semejantes, basados en Mateo 9:35 y Santiago 1:27, 1 de Timoteo 4: 11 al 16,
                        teniendo como modelo máximo a Jesucristo y sus enseñanzas.
                    </p>
                </div>
            </div>
            <div className="sesion1_3">
                <h3 className="diezPrincipios">DIEZ PRINCIPIOS </h3>
                <div className="contentPrincipioReal">
                    <ol>
                        <li>No despertar prejuicios</li>
                        <li>Encuentre a la gente donde está</li>
                        <li>Movilícese lenta y cuidadosamente</li>
                        <li>Adapte el mensaje a la audiencia</li>
                        <li>Use una variedad de métodos</li>
                        <li>Viva el mensaje</li>
                        <li>Trate a las personas con respeto y bondad</li>
                        <li>No critique</li>
                        <li>Trabaje personalmente en grupos pequeños y con las familias</li>
                        <li>Siga el método de Cristo.</li>
                    </ol>
                </div>
            </div>
            <div className="sesion1_4">
                <h3>OBJETIVOS GENERALES</h3>
                <div className="contentObjetivoGeneral">
                    <ol>
                        <li>talleres teórico-prácticos sobre alimentación saludable.</li>
                        <li>talleres de idioma</li>
                        <li>consejería</li>
                        <li>psicológica </li>
                        <li>arte</li>
                        <li>Clases de instrumentos musicales</li>
                        <li>evangelismo online por redes sociales.</li>
                        <li>
                            Impulsar el Ministerio de la Música. (Todo joven debe estar bien
                            conectado con Dios para desarrollar un buen trabajo musical en su iglesia)
                        </li>
                        <li>
                            Incentivar a los jóvenes para crear coros utilizando instrumentos como la
                            guitarra, triple, arpa entre otros. (dar serenatas). La buena música
                            ahuyenta al espíritu maligno. 1 Samuel 16:23.
                        </li>
                        <li>
                            Seminarios, charlas y talleres didácticos sobre manejo de conflictos familiares
                            y ayuda frente al flagelo del alcoholismo y la drogadicción.
                        </li>
                        <li>Conseguir fondos que apoyen el movimiento misionero </li>
                        <li>
                            Fomentar y desarrollar competencia de liderazgo en los miembros del C.F.M.E. para desarrollarse
                            como futuros líderes en el mismo y en cualquier ámbito donde sean llamados.
                        </li>
                        <li>
                            Trabajar en la preparación de materiales y en el ofrecimiento de seminarios y cursos de
                            capacitación y promoción que respondan a los proyectos misioneros-Empresariales locales y globales.
                        </li>
                        <li>Centros de vida saludable </li>
                        <li>Entre otras actividades empresariales.</li>
                    </ol>
                </div>
            </div>
            <div className="sesion3">
                <div className="videoPresentacion">
                    <video className="videoPresentacionPrincipal" width="560" height="315" controls>
                        <source src={videoPresentacion} type="video/mp4" />
                    </video>
                </div>
                <div className="versiculo2">
                    <p>
                        Por tanto, id, y haced discípulos a todas las naciones,
                        bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo;
                        enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy
                        con vosotros todos los días, hasta el fin del mundo. Amén.
                    </p>
                </div>
                <div className="quieroAyudar">
                    <h5>"Dad, y se os dará; medida buena, apretada, remecida
                        y rebosando darán en vuestro regazo; porque con la misma
                        medida con que medís, os volverán a medir."</h5>
                    <button><h4>Lucas, capítulo 6, versículos 38</h4></button>
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a
                </div>
            </div>
        </div>

    )
}