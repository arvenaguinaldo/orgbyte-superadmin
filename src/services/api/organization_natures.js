import api from './api';

export const fetchOrganizationNatures = () => {
  return api.callGet('/organization_natures');
};
