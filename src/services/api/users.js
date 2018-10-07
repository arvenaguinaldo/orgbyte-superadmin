import api from './api';

export const fetchUsers = () => {
  return api.callGet('/users');
};

export const fetchPresidents = () => {
  return api.callGet('/users/presidents');
};

export const addMember = (params) => {
  return api.callPost('/members', params);
};

export const fetchMembers = () => {
  return api.callGet('/members');
};

export const addUser = (params) => {
  return api.callPost('/users', params);
};
