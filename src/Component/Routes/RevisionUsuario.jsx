import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../confgSDK/SDK";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logoFundacion from '../img/logoFundacion1.png';
import { useNavigate } from "react-router";


export default function RevisionUsuario() {

    const [logedIn, setLogedIn] = useState(false);
    const [imgLogoMostrarCompleto, setImgLogoMostrarCompleto] = useState(false);

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

    const handleClicUnete = () =>{
        uneteNosotros('/mainHomen');
    }
    const handleClickInformacionFunda = () =>{
        masInformacion('/informacioFundacion')
    }
    
    const uneteNosotros = useNavigate();
    const masInformacion = useNavigate();
    
    return (
        <div className='mainContent'>
            <header className="encabezado">
                <div className="namePage">
                    <h3>FUNDACION CENTRO MISIONERO EMPRESARIAL</h3>
                    <p>Manos que Ayudan</p>
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
            <div className="contenedorVistaPrevia">
                <div className="forma1">
                    <div className="forma1Texto1">
                        <h1>Transformando Vidas a través de la ayuda y el servicio</h1>
                        <p >La Fundación Centro Misionero Empresarial Manos que ayudan se dedica a brindar apoyo y oportunidades de crear espacios recreativos.</p>
                        <div className="btnsInfor">
                        <button className="btnUno" onClick={handleClickInformacionFunda} >Más Información</button>
                           {logedIn ? (<></>):( <button className="btnDos" onClick={handleClicUnete}>Unete a Nosotros</button>)}
                        </div>
                    </div>
                </div>
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
                </div>
            </div>
        </div>

    )
}