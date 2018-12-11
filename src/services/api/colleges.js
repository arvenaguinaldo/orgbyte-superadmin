import api from './api';

export const fetchColleges = () => {
  return api.callGet('/colleges');
};

export const addCollege = (params) => {
  return api.callPost('/colleges', params);
};
