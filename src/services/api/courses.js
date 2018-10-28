import api from './api';

export const fetchCourses = (params) => {
  return api.callGet('/courses/fetch_courses', params);
};
