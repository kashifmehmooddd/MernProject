import { CREATE_POST, SET_POSTS } from '../actions/types';

const intitialState = [];

export default function (state = intitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:
      return [...payload];
    case CREATE_POST:
      return [...state, payload];
    default:
      return state;
  }
}
