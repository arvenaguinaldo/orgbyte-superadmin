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

export const addOrganization = params => ({
  type: ORGANIZATIONS.ADD_ORGANIZATION,
  params
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

export const setCurrentOrganization = response => ({
  type: ORGANIZATIONS.SET_CURRENT_ORGANIZATION,
  response
});
