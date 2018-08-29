import {ORGANIZATIONS} from 'constants/actions/organizations';

export const fetchOrganizations = params => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATIONS,
  params
});

export const fetchOrganizationsSuccess = response => ({
  type: ORGANIZATIONS.FETCH_ORGANIZATIONS_SUCCESS,
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
