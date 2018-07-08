import api from './api';

export const fetchEvents = () => {
  return api.callGet('/events');
};
