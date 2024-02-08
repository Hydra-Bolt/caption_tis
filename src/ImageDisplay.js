import './App.css';

function ImageDisplay({ file }) {
  const handleFile = (file) => {
    console.log(file)
  }
  handleFile(file)
  return (
    <div className="image_display centered">
      {file == null && <p>Image Dropped will be displayed here</p>}
      {file != null && <img src={file} alt="" />}
    </div>
  );
}

export default ImageDisplay;
