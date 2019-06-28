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

export const fetchOrganizationToUserSide = (params) => {
  return api.callGet('/organizations/fetch_organization_to_user_side/' + params);
};

export const fetchOrganizationToUserSideInfo = (params) => {
  return api.callGet('/organizations/fetch_organization_to_user_side_info/' + params);
};

export const renewOrganization = (params) => {
  return api.callPost('/organizations/renew_organization', params);
};

export const fetchSuspendedOrganizations = () => {
  return api.callGet('/organizations/fetch_suspended_organizations');
};
