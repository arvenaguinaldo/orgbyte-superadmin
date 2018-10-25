import {ORGANIZATION_NATURES} from 'constants/actions/organization_natures';

export const fetchOrganizationNatures = params => ({
  type: ORGANIZATION_NATURES.FETCH_ORGANIZATION_NATURES,
  params
});

export const fetchOrganizationNaturesSuccess = response => ({
  type: ORGANIZATION_NATURES.FETCH_ORGANIZATION_NATURES_SUCCESS,
  response
});
