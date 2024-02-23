import React, { useEffect } from 'react';
import './App.css';

function ImageDisplay({ file }) {
  useEffect(() => {
    handleFile(file);
  }, [file]);

  const handleFile = (file) => {
    if (file instanceof File) {
      // If it's a File object (after resizing), create a URL for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById('image-preview').src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else if (typeof file === 'string') {
      // If it's already a URL, directly set it as the source of the image
      document.getElementById('image-preview').src = file;
    }
  };

  return (
    <div className="image_display">
      {file == null && <p>Image Dropped will be displayed here</p>}
      <center><img id="image-preview" alt="Preview" onError={() => { alert("The provided link is not valid."); }} /></center>
    </div>
  );
}

export default ImageDisplay;
