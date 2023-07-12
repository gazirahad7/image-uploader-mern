import React, { useEffect } from "react";
import PostDetails from "../components/PostDetails";

import AddPost from "../components/AddPost";

import { useUploadContext } from "../hooks/useUploadContext";
export default function Home() {
  const { postList, dispatch } = useUploadContext();

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch("/api/uploads");
      const json = await response.json();
      // console.log(json);

      if (response.ok) {
        dispatch({ type: "GET_POST", payload: json });
      }
    };
    fetchContacts();
  }, [dispatch]);
  return (
    <div>
      <div className="home">
        <div className="posts">
          {postList &&
            postList.map((post) => <PostDetails key={post._id} post={post} />)}
        </div>
        <AddPost />
      </div>
    </div>
  );
}
