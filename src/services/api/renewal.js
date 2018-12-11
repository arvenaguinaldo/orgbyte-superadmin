import api from './api';

export const setRenewal = (params) => {
  return api.callPost('/renewals', params);
};

export const getRenewal = (params) => {
  return api.callGet('/renewals', params);
};
