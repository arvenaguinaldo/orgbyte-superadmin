import {createSelector} from 'reselect';

export const selectOrganizations = state => state.organizations;


export const makeSelectOrganizations = () => createSelector(
  selectOrganizations,
  organizations => organizations.toJS()
);

export const makeSelectOrganizationsList = () => createSelector(
  makeSelectOrganizations(),
  organizations => organizations.list
);

export const makeSelectCurrentOrganization = () => createSelector(
  makeSelectOrganizations(),
  organizations => organizations.currentOrg
);

export const makeSelectOrganizationSelectedOrg = () => createSelector(
  makeSelectOrganizations(),
  organizations => organizations.selectedOrg
);

export const makeSelectOrganizationsMeta = () => createSelector(
  makeSelectOrganizations(),
  organizations => organizations.meta
);

export const makeSelectOrganizationToUserSide = () => createSelector(
  makeSelectOrganizations(),
  organizations => organizations.organization_user_side
);
