import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import {
  postApi
} from "../components/api/API";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER
} from "./types";

const URL = 'http://localhost:3001/api/'

export const loadUser = () => async dispatch => {

    if (localStorage.token)
    {
      setAuthToken(localStorage.token)
    }
  try {
    const response = await axios.get(`${URL}auth/`)
    dispatch({
      type: USER_LOADED,
      payload: {
        user: response.data.user
      }
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const register = (data) => async dispatch => {
  try {
    const response = await postApi({
      endpoint: 'users',
      data
    })
    if (response.status === 200) {
      dispatch(setAlert("Login Successful!", 'success'));
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: response.data.token,
        }
      })
    } else {
      dispatch(setAlert(response.data.msg, 'danger'));
      dispatch({
        type: REGISTER_FAIL
      })
    }
  } catch (error) {
    alert(error.message);
  }
}

export const login = (data) => async dispatch => {
  try {
    const response = await postApi({
      endpoint: 'users/login',
      data
    })
    if (response.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: response.data.token,
        }
      })
    } else {
      dispatch(setAlert(response.data.msg, 'danger'));
      dispatch({
        type: LOGIN_FAIL
      })
    }
  } catch (error) {
    alert(error.message);
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  })
}


