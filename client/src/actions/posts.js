import { getApi } from "../components/api/API"
import setAuthToken from "../utils/setAuthToken"
import { SET_POSTS, SET_PROFILES } from "./types"

export const getPosts = () => async dispatch => {
  try {
    const response = await getApi({ endpoint: 'posts' })
    dispatch({
      type: SET_POSTS,
      payload: response.data
    })
  } catch (error) {
    console.log(error);
  }
}
