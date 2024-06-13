import { useState } from "react";
import { db } from "../confgSDK/SDK";
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc } from "firebase/firestore";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fffffc", "#d4f0f0"];

export default function AnuncioAdmin(props) {
    const [text, setText] = useState('');
    const [color, setColor] = useState(colors[0]);
    const [fontSize, setFontSize] = useState(16);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);

        const textArea = e.target;
        const maxHeight = 50 * parseFloat(getComputedStyle(textArea).fontSize);
        const textHeight = textArea.scrollHeight;
<<<<<<< HEAD

=======
        
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a
        if (textHeight > maxHeight) {
            setFontSize((prevFontSize) => prevFontSize - 0.5);
        }
    };

    const handleColorChange = (color) => {
        setColor(color);
    };

    const handlePublish = async () => {
        if (!text.trim()) return;
        const uniqueId = uuidv4();
        await setDoc(doc(db, 'announcements', uniqueId), {
            text,
            color,
            timestamp: new Date()
        });
        setText('');
        setFontSize(16);
        props.setAnunciosPublicidadColor(false)
    };
    const ocultarPopUpPublicidadColor = () => {
        props.setAnunciosPublicidadColor(false);
    }

    return (
        <div className="anuncioAdmin">
            <textarea
                style={{ backgroundColor: color, color: "black", fontSize: `${fontSize}px` }}
                value={text}
                onChange={handleTextChange}
                placeholder="Escribe tu anuncio aquí..."
                className="anuncioImportanteColorFavorit"
            />
            <div className="colorPicker">
                {colors.map((c, index) => (
                    <button
<<<<<<< HEAD
                        className="btnColorPicker"
=======
                    className="btnColorPicker"
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a
                        key={index}
                        style={{ backgroundColor: c, border: c === color ? '2px solid black' : 'none' }}
                        onClick={() => handleColorChange(c)}
                    />
                ))}
            </div>
<<<<<<< HEAD
            <div className="contentSalirPopupColor">
                <FontAwesomeIcon className="iconSalirPublicadorColor" onClick={ocultarPopUpPublicidadColor} icon={faArrowLeft} />
                <h5 className="subirAnuncio">subir Anuncio</h5>
                <button className="btnPublicarAnuncioColor" onClick={handlePublish} disabled={!text.trim()}>Publicar</button>
            </div>
=======
            <FontAwesomeIcon className="iconSalirPublicadorColor" onClick={ocultarPopUpPublicidadColor} icon={faArrowLeft} />
            <button className="btnPublicarAnuncioColor" onClick={handlePublish} disabled={!text.trim()}>Publicar</button>
>>>>>>> 7871276d71fdc7adb73963344f7f29ef56fc835a
        </div>
    );
}
