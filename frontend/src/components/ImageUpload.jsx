import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
const ImageUpload = ({ files, onUpload, multiple, note }) => {
  const [fileList, setFileList] = useState(files || []);
  const allowedTypes = ["image/jpeg", "image/png"];
  const [fileError, setFileError] = useState("");

  const handleFileUpload = (e) => {
    const newFiles = [...e.target.files];

    if (newFiles && allowedTypes.includes(newFiles[0].type)) {
      setFileList([...fileList, ...newFiles]);
      onUpload([...fileList, ...newFiles]);
      setFileError("");
    } else {
      setFileList([]);
      onUpload([]);
      setFileError("Please upload a JPG or PNG file.");
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...fileList];
    updatedFiles.splice(index, 1);
    setFileList(updatedFiles);
    onUpload(updatedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...e.dataTransfer.files];

    if (newFiles && allowedTypes.includes(newFiles[0]?.type)) {
      setFileList([...fileList, ...newFiles]);
      onUpload([...fileList, ...newFiles]);
      setFileError("");
    } else {
      setFileList([]);
      setFileError("Please upload a JPG or PNG file.");
    }
  };

  const renderFileList = () => {
    return fileList.map((file, index) => (
      <div key={index} className="file-upload-item shadow-lg">
        <div className="file-upload-item-info">
          <img
            className="file-upload-item-preview"
            src={URL.createObjectURL(file)}
            alt={`Preview of ${file.name}`}
            width="100px"
          />
          <div className="file-upload-item-details">
            <div className="file-upload-item-name">{file.name}</div>
            <div className="file-upload-item-size">
              {Math.round((file.size / 1024) * 100) / 100} KB
            </div>
          </div>
        </div>
        <div className="file-upload-item-actions">
          <button onClick={() => handleRemoveFile(index)}>
            <MdOutlineDeleteOutline size={24} />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="file-upload-container animated-border "
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <AiOutlineCloudUpload size={50} className="text-primary" />
      <p className="fs-5 my-2 mb-3  text-primary">Drag & Drop</p>
      <p className="fs-4 my-2  text-warning ">Or</p>
      <div className="file-upload__input-container">
        <input
          className="file-upload__input"
          type="file"
          multiple={multiple}
          onChange={handleFileUpload}
        />
        <div className="file-upload__input-label border-primary btn text-secondary">
          Choose files
        </div>
      </div>
      <p className="text-sm text-warning my-2">Note: {note}</p>

      <div className="file-upload-list">{renderFileList()}</div>

      {fileError && <p className="text-danger mt-2 ">{fileError}</p>}
    </div>
  );
};

ImageUpload.propTypes = {
  files: PropTypes.array,
  onUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
