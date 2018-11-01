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

export const verifyMember = (params) => {
  return api.callGet('/members/verify_member/' + params);
};

export const addMembers = (params) => {
  return api.callPost('/members/add_members', params);
};
