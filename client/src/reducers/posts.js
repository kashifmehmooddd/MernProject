import { SET_POSTS } from "../actions/types";

const intitialState = [];

export default function (state = intitialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_POSTS:
      return [...payload]
    default:
      return state;
  }
}
