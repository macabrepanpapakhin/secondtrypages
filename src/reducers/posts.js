import * as CONST from "../constant/actionType";
export default (posts = [], action) => {
  switch (action.type) {
    case CONST.FETCH_ALL:
      return action.payload;
    case CONST.CREATE: {
      console.log("creating in reducer");
      console.log(posts);
      console.log(action.payload);
      return [...posts, action.payload];
    }
    case CONST.UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CONST.DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case CONST.LIKE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};
