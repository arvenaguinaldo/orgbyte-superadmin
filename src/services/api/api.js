import axios from 'axios';
import config from 'config';
import * as authenticate from 'utils/AuthService';

axios.defaults.baseURL = config.apiUrl;

const getAuthenticationHeaders = () => {
  return {
    Authorization: `token ${authenticate.getToken()}`
  };
};

const getConfig = (params, options = {}) => {
  const headers = getAuthenticationHeaders();

  if (headers) {
    return {
      params,
      headers,
      ...options
    };
  }

  return {
    params,
    ...options
  };
};

const getResponse = request => (
  request
    .then(response => response)
    .catch(error => error.response.data)
);

const callGetWithResponseHeaders = (path, params, options) => (
  axios.get(path, getConfig(params, options))
    .then(response => ([response.headers, response.data]))
    .catch(() => null)
);

const callGet = (path, params, options) => (
  getResponse(axios.get(path, getConfig(params, options)))
);

const callPut = (path, data, params, options) => (
  getResponse(axios.put(path, data, getConfig(params, options)))
);

const callPost = (path, data, options) => (
  getResponse(axios.post(path, data, getConfig(options)))
);

const callDelete = (path, options) => (
  getResponse(axios.delete(path, getConfig(options)))
);

export default {
  getAuthenticationHeaders,
  callGetWithResponseHeaders,
  callGet,
  callPut,
  callPost,
  callDelete
};
