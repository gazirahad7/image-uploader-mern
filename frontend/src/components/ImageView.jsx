import React from "react";

const ImageView = ({ imageUrls }) => {
  return (
    <div className="image-view-container">
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ))}
    </div>
  );
};

export default ImageView;
