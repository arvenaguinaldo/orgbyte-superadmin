import api from './api';

export const fetchEdit = (params) => {
  return api.callGet(`/${params.table}/` + params.id);
};

export const saveEdit = (params) => {
  return api.callPut(`/${params.table}/${params.id}/`, params.values);
};
