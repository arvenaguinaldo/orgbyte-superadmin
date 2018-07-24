import api from './api';

export const fetchUsers = (data) => {
  return api.callPost('/sessions', data);
};
