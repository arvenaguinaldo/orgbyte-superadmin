import api from './api';

export const login = (data) => {
  return api.callPost('/sessions', data);
};

export const fetchUsers = () => {
  return api.callGet('/users');
};
