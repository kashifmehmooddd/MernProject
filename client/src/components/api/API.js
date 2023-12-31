import axios from 'axios';

const URL = 'http://localhost:3001/api/';

export const postApi = async ({ endpoint, data, options = {} }) => {
  try {
    const response = await axios.post(`${URL}${endpoint}`, data, options);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const putApi = async ({ endpoint, data, options = {} }) => {
  try {
    const response = await axios.put(`${URL}${endpoint}`, data, options);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const deleteApi = async ({ endpoint }) => {
  try {
    const response = await axios.delete(`${URL}${endpoint}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getApi = async ({ endpoint, options = {} }) => {
  try {
    const response = await axios.get(`${URL}${endpoint}`, options);
    return response;
  } catch (err) {
    return err.response;
  }
};
