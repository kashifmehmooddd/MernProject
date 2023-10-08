import { getApi } from "../components/api/API"
import { SET_PROFILES } from "./types"

export const getProfiles = () => async dispatch => {
  try {
    const response = await getApi({endpoint: 'profile'})
    dispatch({
      type: SET_PROFILES,
      payload: response.data
    })
  } catch (error) {
    console.log(error.response);
  }
}
