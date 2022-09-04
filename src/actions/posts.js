import axios from "axios";
import * as api from "../api";
import * as CONST from "../constant/actionType";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: CONST.START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log(data);
    console.log("page data");
    dispatch({ type: CONST.FETCH_ALL, payload: data });
    dispatch({ type: CONST.END_LOADDING });
  } catch (error) {
    dispatch({ type: CONST.END_LOADDING });
    console.log(error.message);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONST.START_LOADING });
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: CONST.FETCH_POST, payload: data });
    dispatch({ type: CONST.END_LOADDING });
  } catch (error) {
    dispatch({ type: CONST.END_LOADDING });
    console.log(error.message);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: CONST.START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: CONST.FETCH_BY_SEARCH, payload: data });
    dispatch({ type: CONST.END_LOADDING });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: CONST.START_LOADING });
    const { data } = await api.createPost(post);
    history({ pathname: `/posts/${data._id}` });
    dispatch({ type: CONST.CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: CONST.UPDATE, payload: data });
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: CONST.UPDATE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: CONST.LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: CONST.COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
