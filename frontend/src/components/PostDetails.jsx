import React from "react";

import { useUploadContext } from "../hooks/useUploadContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ImageView from "./ImageView";

export default function PostDetails({ post }) {
  const { dispatch } = useUploadContext();

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/uploads/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };
  return (
    <div className="post-container">
      <span className="del" onClick={handleDelete}>
        X
      </span>
      <div className="post-details">
        <div>
          <h4>{post.title}</h4>
          <p>
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>

        <div>
          <ImageView imageUrls={post.images} />
        </div>
      </div>
    </div>
  );
}
