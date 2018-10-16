import api from './api';

export const fetchEvents = () => {
  return api.callGet('/events');
};

export const fetchEvent = (params) => {
  return api.callGet('/events' + params);
};

export const createEvent = (params) => {
  return api.callPost('/events', params);
};
