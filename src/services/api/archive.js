import api from './api';

export const fetchArchives = (params) => {
  return api.callGet(`/${params.table}/fetchArchives`);
};

export const archive = (params) => {
  return api.callDelete(`/${params.table}/${params.id}/`);
};
