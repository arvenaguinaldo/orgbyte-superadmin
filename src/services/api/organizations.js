import api from './api';

export const fetchOrganizations = () => {
  return api.callGet('/organizations');
};

export const addOrganization = (params) => {
  return api.callPost('/organizations', params);
};

export const addOrganizationUser = (params) => {
  return api.callPost('/users', params);
};

export const addUser = (params) => {
  return api.callPut('/users/' + params.user_id, {organizations_id: params.organizations_id});
};

