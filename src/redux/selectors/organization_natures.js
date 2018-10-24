import {createSelector} from 'reselect';

export const selectOrganizationNatures = state => state.organizationNatures;

export const makeSelectOrganizationNatures = () => createSelector(
  selectOrganizationNatures,
  organizationNatures => organizationNatures.toJS()
);

export const makeSelectOrganizationNaturesList = () => createSelector(
  makeSelectOrganizationNatures(),
  organizationNatures => organizationNatures.list
);

export const makeSelectOrganizationNaturesMeta = () => createSelector(
  makeSelectOrganizationNatures(),
  organizationNatures => organizationNatures.meta
);
