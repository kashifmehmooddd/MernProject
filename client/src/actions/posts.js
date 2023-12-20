import { deleteApi, getApi, postApi, putApi } from '../components/api/API';
import setAuthToken from '../utils/setAuthToken';
import {
  SET_POSTS,
  SET_PROFILES,
  CREATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';
import store from '../store';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await getApi({
      endpoint: 'posts',
    });
    dispatch({
      type: SET_POSTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (data) => async (dispatch) => {
  const response = await postApi({
    endpoint: 'posts',
    data,
  });
  if (response.status === 200) {
    dispatch({
      type: CREATE_POST,
      payload: response.data,
    });
    store.dispatch(setAlert('Post has been shared', 'success'));
    return true;
  } else {
    let errors = response.data.errors.map((hash) => hash.msg).join(', ');
    store.dispatch(setAlert(errors, 'danger'));
    return false;
  }
};

export const addComment =
  ({ id, text }) =>
  async (dispatch) => {
    const response = await putApi({
      endpoint: `posts/${id}/comment`,
      data: {
        text,
      },
    });

    if (response.status === 200) {
      dispatch({
        type: ADD_COMMENT,
        payload: response.data,
      });
      store.dispatch(setAlert('Added Comment!', 'success'));
    } else {
      store.dispatch(setAlert('Error!', 'danger'));
    }
  };

export const removeComment =
  ({ postId, commentId }) =>
  async (dispatch) => {
    const response = await deleteApi({
      endpoint: `posts/${postId}/comment/${commentId}`,
    });

    if (response.status === 200) {
      dispatch({
        type: REMOVE_COMMENT,
        payload: response.data,
      });
      store.dispatch(setAlert('Removed your comment!', 'success'));
    } else {
      store.dispatch(setAlert('Error!', 'danger'));
    }
  };
