import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./App.css";
import ImageDisplay from "./ImageDisplay";
import Resizer from "react-image-file-resizer";
import axios from "axios";

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
            },
            "file"
        );
    });

const fileTypes = ["jpg", "jpeg", "png", "gif"]; // Update file types

function DragDrop() {
    const [file, setFile] = useState(null);
    const [dropMessage, setDropMessage] = useState(
        "Drag and Drop your images here or click to browse. Only JPEG/PNG/GIF files are allowed."
    );
    const [progress, setUploadProgress] = useState(0);

    const handleGeneration = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        console.log(file)
        formData.append('file', file);

        try {
            console.log("FormData:", formData); // Log FormData for debugging
            const response = await axios.post('https://localhost:2000/api/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                    console.log(progress)
                },
            });
            console.log('File uploaded successfully:', response.data);
            // Handle response as needed
        } catch (error) {
            console.error('Error uploading file:', error);
            console.log("Request FormData:", error.config.data); // Log request FormData for debugging
            // Handle error as needed
        }
    };
    const handleChange = async (file) => {
        try {
            const resizedFile = await resizeFile(file);
            setFile(resizedFile);
        } catch (err) {
            console.error("Error resizing image:", err);
        }
    };

    const handleDrop = () => {
        setDropMessage(`Uploaded File`);
    };
    const customDropMessageStyle = {
        backgroundColor: "#f8f8f8",
        border: "2px dashed #007BFF",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
    };

    return (
        <center>
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
                    <div className="drag_drop">
                        <p>{dropMessage}</p>
                    </div>
                </FileUploader>
                <button className="gen_button" onClick={handleGeneration}>
                    Submit to generate caption
                </button>
            </div>
        </center>
    );
}

export default DragDrop;
