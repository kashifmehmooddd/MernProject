import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { postApi } from "../components/api/API";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
  SET_PROFILE,
  CREATE_EDUCATION,
} from "./types";
import store from "../store";

const URL = "http://localhost:3001/api/";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const user = await axios.get(`${URL}auth/`);

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user.data.user,
        loading: true,
      },
    });

    axios
      .get(`${URL}profile/me`)
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: {
            profile: res.data,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_LOADED,
          payload: {
            user: user.data.user,
          },
        });
      });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const response = await postApi({
      endpoint: "users",
      data,
    });
    if (response.status === 200) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: response.data.token,
          user: response.data.user,
        },
      });
      dispatch(setAlert("Login Successful!", "success"));
    } else {
      dispatch(setAlert(response.data.msg, "danger"));
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const response = await postApi({
      endpoint: "users/login",
      data,
    });
    if (response.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: response.data.token,
          user: response.data.user,
        },
      });

      setAuthToken(response.data.token);

      axios
        .get(`${URL}profile/me`)
        .then((res) => {
          dispatch({
            type: USER_LOADED,
            payload: {
              profile: res.data,
            },
          });
        })
        .catch((err) => {
          console.log("profile not found!");
        });
    } else {
      dispatch(setAlert(response.data.msg, "danger"));
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};

export const createProfile = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/profile",
      data
    );
    dispatch({
      type: SET_PROFILE,
      payload: {
        profile: response.data,
      },
    });
    store.dispatch(setAlert("Your profile has been updated!", "success"));
  } catch (err) {
    alert(err.message);
  }
};

export const createEducation = (data) => async (dispatch) => {
  try {
    const response = await axios.put(
      "http://localhost:3001/api/profile/education",
      data
    );

    dispatch({
      type: CREATE_EDUCATION,
      payload: {
        profile: response.data,
      },
    });
  } catch (error) {
    console.log(error.response);
  }
};
