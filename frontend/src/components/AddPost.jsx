import React, { useState } from "react";
import { useUploadContext } from "../hooks/useUploadContext";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const { dispatch } = useUploadContext();
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = React.useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("images", event.target.files[i]);
    }

    try {
      const response = await fetch(
        "https://nodeapp.envyfy.com/api/v1/imguploads",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }
      const data = await response.json();
      const { images } = data;
      let imageURLArr = [];
      for (let i = 0; i < images.length; i++) {
        imageURLArr.push(images[i]?.orginalImageUrl);
      }
      if (imageURLArr.length > 0) {
        setImages(imageURLArr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadInfo = { title, images };

    if (!title) {
      setError("Please fill in all fields");
      return;
    }
    if (images.length <= 0) {
      setError("Image is required");
      return;
    }

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: JSON.stringify(uploadInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setImages({});
      setEmptyFields([]);
      // dispatch({ type: "ADD_POST", payload: json });
      navigate("/");
    }
  };

  return (
    <div className="add-post">
      <form>
        <h3>Add A New Post</h3>

        <input
          name="images"
          type="file"
          multiple
          onChange={handleFileUpload}
          className={emptyFields.includes("images") ? "error" : ""}
        />
        <label>Title:</label>
        <input
          type="text"
          className={emptyFields.includes("title") ? "error" : ""}
          name="title"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <button type="submit" onClick={handleSubmit}>
          Add Post
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
