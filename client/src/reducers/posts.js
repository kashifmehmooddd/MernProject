import {
  ADD_COMMENT,
  CREATE_POST,
  REMOVE_COMMENT,
  SET_POSTS,
} from '../actions/types';

const intitialState = [];

export default function (state = intitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:
      return [...payload];
    case CREATE_POST:
      return [...state, payload];
    case REMOVE_COMMENT:
    case ADD_COMMENT:
      return state.map((obj) => (obj._id === payload._id ? payload : obj));
    default:
      return state;
  }
}
