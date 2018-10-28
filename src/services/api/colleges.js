import api from './api';

export const fetchColleges = () => {
  return api.callGet('/colleges');
};
