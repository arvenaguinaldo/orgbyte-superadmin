import api from './api';

export const fetchLogs = () => {
  return api.callGet('/logs');
};

