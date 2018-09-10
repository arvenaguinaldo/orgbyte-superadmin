import api from './api';

export const fetchUsers = () => {
  return api.callGet('/users');
};

export const fetchPresidents = () => {
  return api.callGet('/users/presidents');
};

export const addMember = (params) => {
  return api.callPost('/users/add_member', params);
};

export const fetchMembers = () => {
  return api.callGet('/users/members');
};
