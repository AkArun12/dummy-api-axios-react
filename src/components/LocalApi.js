// api 

import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

// Get request 
export const getPost=()=>{


    return axiosInstance.get("/posts")

}

// post request

export const createPost=(postData)=>{

    return axiosInstance.post("/posts", postData)

};

// put request/ update

export const updatePost=(postId, updateData)=>{

    return axiosInstance.put(`/posts/${postId}`, updateData)

};

// Delete request

export const deletePost=(postId)=>{

    return axiosInstance.delete(`/posts/${postId}`)

};