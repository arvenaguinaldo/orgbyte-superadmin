import {RENEWAL} from 'constants/actions/renewal';

export const setRenewal = params => ({
  type: RENEWAL.SET_RENEWAL,
  params
});

export const setRenewalSuccess = response => ({
  type: RENEWAL.SET_RENEWAL_SUCCESS,
  response
});

export const getRenewal = params => ({
  type: RENEWAL.GET_RENEWAL,
  params
});

export const getRenewalSuccess = response => ({
  type: RENEWAL.GET_RENEWAL_SUCCESS,
  response
});
