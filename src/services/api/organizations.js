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

export const addOrganizationUser = (params) => {
  return api.callPost('/users', params);
};

export const addOrgToUser = (params) => {
  return api.callPut('/users/' + params.user_id, {organizations_id: params.organizations_id});
};

export const addUserToOrg = (params) => {
  return api.callPut('/organizations/' + params.organizations_id, {user_id: params.user_id});
};

