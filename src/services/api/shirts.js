import api from './api';

export const fetchShirts = () => {
  return api.callGet('/shirts');
};

export const verifyMember = (params) => {
  return api.callGet('/members/verify_member/' + params);
};

export const addOrgShirt = (params) => {
  return api.callPost('/shirts', params);
};

export const addOrgShirtSizes = (params) => {
  return api.callPost('/shirt_sizes', params);
};

export const addOrgShirtSizestoShirt = (params) => {
  return api.callPut('/shirts/' + params.shirt_id, {shirt_sizes_id: params.shirt_sizes_id});
};

export const fetchSizes = () => {
  return api.callGet('/shirt_sizes');
};

export const purchaseShirt = (params) => {
  return api.callPost('/purchased_shirts', params);
};
