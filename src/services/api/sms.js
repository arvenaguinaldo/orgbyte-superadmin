import api from './api';

export const fetchSmss = () => {
  return api.callGet('/sms');
};

export const fetchSms = (params) => {
  return api.callGet('/sms/' + params);
};

export const createSms = (params) => {
  return api.callPost('/sms', params);
};
