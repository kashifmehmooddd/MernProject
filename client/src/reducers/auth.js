import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SET_PROFILE,
  CREATE_EDUCATION,
} from "../actions/types";

const intitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  profile: null,
  loading: true,
};

export default function (state = intitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_EDUCATION:
    case SET_PROFILE:
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        ...payload,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        profile: null,
      };
    default:
      return state;
  }
}
