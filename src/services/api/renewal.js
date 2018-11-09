import api from './api';

export const setRenewal = (params) => {
  return api.callPost('/renewals', params);
};
