import {RENEWAL} from 'constants/actions/renewal';

export const setRenewal = params => ({
  type: RENEWAL.SET_RENEWAL,
  params
});

export const setRenewalSuccess = response => ({
  type: RENEWAL.SET_RENEWAL_SUCCESS,
  response
});
