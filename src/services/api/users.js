import api from './api';

export const fetchUsers = () => {
  return api.callGet('/users');
};

export const fetchPresidents = () => {
  return api.callGet('/users/presidents');
};
