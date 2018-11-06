import api from './api';

export const fetchAnnouncements = () => {
  return api.callGet('/announcements');
};

export const fetchAnnouncement = (params) => {
  return api.callGet('/announcements/' + params);
};

export const createAnnouncement = (params) => {
  return api.callPost('/announcements', params);
};
