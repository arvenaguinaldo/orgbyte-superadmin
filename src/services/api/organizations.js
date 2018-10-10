import api from './api';

export const fetchOrganizations = () => {
  return api.callGet('/organizations/all');
};

export const fetchOrganization = (params) => {
  return api.callGet('/organizations/' + params);
};

export const fetchCurrentOrganization = () => {
  return api.callGet('/organizations/currentorg');
};

export const addOrganization = (params) => {
  return api.callPost('/organizations', params);
};
