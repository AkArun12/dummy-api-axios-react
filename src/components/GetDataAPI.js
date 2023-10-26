import React, { useState, useEffect } from "react";

import { getPost, createPost, updatePost, deletePost } from "./LocalApi";

const GetDataAPI = () => {
  const [post, setPost] = useState([]);

  const [message, setMessage] = useState("")

  // for creating
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });




  // Get request

  useEffect(() => {
    getPost()
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log("Fetching posts ", error);
      });
  }, []);

  //   Create post

  const handleCreatePost = () => {
    createPost(newPost).then((response) => {
      setPost([...post, response.data]);
      setNewPost({ title: "", body: "" });

      setMessage("Post created successfully");
      alert(message);
    })
    .catch((error) => {
      console.log("Couldn't create post ", error);

    });
  }

  // Update post
  const handleUpdatePost = (postId, updatedData) => {
    updatePost(postId, updatedData)
      .then((response) => {
        const updatePosts = post.map((post) =>
          post.id === postId ? response.data : post
        );

        setPost(updatePosts);
        console.log(updatePosts);
      })
      .catch((error) => {
        console.log("Unable to update post ", error);
      });
  };
  //   delete post

  const handleDeletePost = (postId) => {
    deletePost(postId)
      .then(() => {
        const deleteAndUpdatedPosts = post.filter((post) => post.id !== postId);

        setPost(deleteAndUpdatedPosts);
      })
      .catch((error) => {
        console.log("post unable to delete", error);
      });
  };

  return (
    <>
      <h2>Api related to Posts</h2>

      <div>
        <h2>Create new posts</h2>

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newPost.title}
          onChange={(e) => {
            setNewPost({ ...newPost, title: e.target.value });

          }}
          
        />
        <input
          type="text"
          placeholder="body"
          name="body"
          value={newPost.body}
          onChange={(e) => {
            setNewPost({ ...newPost, body: e.target.value });
          }}
        />

        <button onClick={handleCreatePost}>Create</button>
      </div>

      <ul>
        {post.map((value) => (
          <li key={value.id}>
            <h2>ID:{value.id}</h2>
            <p>Title:{value.title}</p>
            <p>Body:{value.body}</p>

            <button
              onClick={() =>
                handleUpdatePost(value.id, {
                  title: "Updated Title",
                  body: "Updated Body",
                })
              }
            >
              Update
            </button>

            <button onClick={() => handleDeletePost(value.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <hr />
      <br />
      <br />
    </>
  );
};

export default GetDataAPI;
