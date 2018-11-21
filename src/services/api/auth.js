import api from './api';

export const login = (data) => {
  return api.callPost('/sessions', data);
};

export const fetchUsers = () => {
  return api.callGet('/users');
};

export const getUser = (params) => {
  return api.callGet('/users/' + params);
};
