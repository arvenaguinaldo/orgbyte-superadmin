import api from './api';

export const fetchEvents = () => {
  return api.callGet('/events');
};

export const createEvent = (params) => {
  return api.callPost('/events', params);
};
