import api from './api';

export const fetchOrganizations = () => {
  return api.callGet('/organizations');
};

export const addOrganization = (params) => {
  return api.callPost('/organizations', params);
};

export const addUsers = (params) => {
  return api.callPost('/users', params);
};
