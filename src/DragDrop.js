import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
// import Resizer from "react-image-file-resizer";
import "./App.css";
import ImageDisplay from "./ImageDisplay";
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            299,
            299,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            }
        );
    });
const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
    const [file, setFile] = useState(null);
    const [dropMessage, setDropMessage] = useState("Drag and Drop your images here or click to browse. Only JPEG/PNG/GIF files are allowed.");

    const handleChange = async (file) => {
        try {
            const resizedFile = await resizeFile(file)
            setFile(resizedFile);
        } catch (err) {
            console.error("Error resizing image:", err);
        }
    };

    const handleDrop = () => {
        setDropMessage(`Uploaded File`);
    };
    const handleGeneration = (file) => {

    }
    const customDropMessageStyle = {
        backgroundColor: "#f8f8f8",
        border: "2px dashed #007BFF",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
    };

    return (
        <div>
            <ImageDisplay file={file} />
            <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                onDrop={handleDrop}
                hoverTitle="Drop your image"
                dropMessageStyle={customDropMessageStyle}
                label="Drag and drop your files here or click to browse."
                required={true}
                disabled={false}
                onSizeError={(file) => console.log("Size error:", file)}
            >
                <div className="drag_drop centered">
                    <p>{dropMessage}</p>
                </div>
            </FileUploader>
            <button className="gen_button centered" onClick={handleGeneration}>
                Submit to generate caption
            </button>
        </div>
    );
}

export default DragDrop;
