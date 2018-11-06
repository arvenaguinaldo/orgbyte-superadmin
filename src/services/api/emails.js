import api from './api';

export const fetchEmails = () => {
  return api.callGet('/emails');
};

export const fetchEmail = (params) => {
  return api.callGet('/emails/' + params);
};

export const createEmail = (params) => {
  return api.callPost('/emails', params);
};
