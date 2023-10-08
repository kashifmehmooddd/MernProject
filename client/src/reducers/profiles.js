import { SET_PROFILES } from "../actions/types";

const intitialState = [];

export default function (state = intitialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_PROFILES:
      return [...payload]
    default:
      return state;
  }
}
