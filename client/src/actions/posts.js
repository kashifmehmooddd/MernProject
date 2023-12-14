import { getApi, postApi } from '../components/api/API';
import setAuthToken from '../utils/setAuthToken';
import { SET_POSTS, SET_PROFILES, CREATE_POST } from './types';
import store from '../store';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await getApi({ endpoint: 'posts' });
    dispatch({
      type: SET_POSTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (data) => async (dispatch) => {
  try {
    const response = await postApi({ endpoint: 'posts', data });
    dispatch({
      type: CREATE_POST,
      payload: response.data,
    });
    store.dispatch(setAlert('Post has been shared', 'success'));
  } catch (error) {
    console.log(error);
  }
};
