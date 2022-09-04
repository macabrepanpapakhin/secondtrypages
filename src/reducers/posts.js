import * as CONST from "../constant/actionType";
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case CONST.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CONST.FETCH_POST:
      return { ...state, post: action.payload };
    case CONST.FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case CONST.CREATE: {
      return { ...state, posts: [...state.posts, action.payload] };
    }
    case CONST.UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CONST.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case CONST.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CONST.START_LOADING:
      return { ...state, isLoading: true };
    case CONST.END_LOADDING:
      return { ...state, isLoading: false };
    case CONST.COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
          //return all the other posts normally
        }),
      };
    default:
      return state;
  }
};
