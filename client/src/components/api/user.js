import { postApi } from "./API"


export const login = async (data) => {
  try {
    const response = await postApi({ endpoint: 'users/login', data })
    return response
  }
  catch (err) {
    return err.response
  }
}

export const register = async (data) => {
  try {
    const response = await postApi({ endpoint: 'users/', data })
    return response
  }
  catch (err) {
    return err.response
  }
}

