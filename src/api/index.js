import axios from "axios";
const API = axios.create({
  baseURL: "https://sailaminoakisthebest.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    } ${JSON.parse(localStorage.getItem("fromGoogle"))}`;
  }
  return req;
});
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};
export const signIn = (FormData) => API.post("/user/signin", FormData);
export const signUp = (FormData) => API.post("/user/signup", FormData);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
