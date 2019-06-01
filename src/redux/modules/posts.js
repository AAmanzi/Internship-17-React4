import * as postUtils from "./../../utils";
import * as errorActions from "./error";

// action types
const LOAD_POSTS = "LOAD_POSTS";
const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
const LOAD_POSTS_FAIL = "LOAD_POSTS_FAIL";
const CREATE_POST = "CREATE_POST";
const CREATE_POST_FAIL = "CREATE_POST_FAIL";
const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
const EDIT_POST = "EDIT_POST";
const EDIT_POST_FAIL = "EDIT_POST_FAIL";
const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";

// initial state
const initialState = {
  loading: false,
  items: [],
  error: null
};

// action creators
export const loadPosts = () => dispatch => {
  dispatch({
    type: LOAD_POSTS
  });

  return postUtils
    .fetchPosts()
    .then(posts => dispatch({ type: LOAD_POSTS_SUCCESS, posts }))
    .catch(error => {
      dispatch(errorActions.showError("Error fetching posts"));
      return dispatch({ type: LOAD_POSTS_FAIL, error });
    });
};

export const createPost = post => dispatch => {
  dispatch({
    type: CREATE_POST
  });

  return postUtils
    .savePost(post)
    .then(response => dispatch({ type: CREATE_POST_SUCCESS, id: response.id }))
    .catch(error => {
      dispatch(errorActions.showError("Error creating post"));
      return dispatch({ type: CREATE_POST_FAIL, error });
    });
};

export const editPost = post => dispatch => {
  dispatch({
    type: EDIT_POST
  });

  return postUtils
    .updatePost(post)
    .then(response => dispatch({ type: EDIT_POST_SUCCESS }))
    .catch(error => {
      dispatch(errorActions.showError("Error editing post"));
      return Promise.reject(dispatch({ type: EDIT_POST_FAIL, error }));
    });
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.posts
      };
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case CREATE_POST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case EDIT_POST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case EDIT_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
