import {ORGANIZATIONS} from 'constants/actions/organizations';

export const fetchOrganizations = params => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATIONS,
  params
});

export const fetchOrganizationsSuccess = response => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATIONS_SUCCESS,
  response
});

export const fetchOrganization = params => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATION,
  params
});

export const fetchOrganizationSuccess = response => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATION_SUCCESS,
  response
});

export const fetchCurrentOrganization = params => ({
  type: ORGANIZATIONS.FETCH_CURRENT_ORGANIZATION,
  params
});

export const fetchCurrentOrganizationSuccess = response => ({
  type: ORGANIZATIONS.FETCH_CURRENT_ORGANIZATION_SUCCESS,
  response
});

export const addOrganization = (params, callback) => ({
  type: ORGANIZATIONS.ADD_ORGANIZATION,
  params,
  callback
});

export const addOrganizationSuccess = response => ({
  type: ORGANIZATIONS.ADD_ORGANIZATION_SUCCESS,
  response
});

export const addOrganizationUser = params => ({
  type: ORGANIZATIONS.ADD_ORGANIZATION_USER,
  params
});

export const addOrganizationUserSuccess = response => ({
  type: ORGANIZATIONS.ADD_ORGANIZATION_USER_SUCCESS,
  response
});

export const fetchOrganizationToUserSide = params => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATION_TO_USER_SIDE,
  params
});

export const fetchOrganizationToUserSideSuccess = response => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATION_TO_USER_SIDE_SUCCESS,
  response
});

export const renewOrganization = params => ({
  type: ORGANIZATIONS.RENEW_ORGANIZATION,
  params
});

export const renewOrganizationSuccess = response => ({
  type: ORGANIZATIONS.RENEW_ORGANIZATION_SUCCESS,
  response
});

export const fetchSuspendedOrganizations = params => ({
  type: ORGANIZATIONS.FETCH_SUSPENDED_ORGANIZATIONS,
  params
});

export const fetchSuspendedOrganizationsSuccess = response => ({
  type: ORGANIZATIONS.FETCH_SUSPENDED_ORGANIZATIONS_SUCCESS,
  response
});
