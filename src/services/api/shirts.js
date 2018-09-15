import api from './api';

export const fetchShirts = () => {
  return api.callGet('/shirts');
};

export const verifyMember = (params) => {
  return api.callGet('/members/verify_member/' + params);
};
