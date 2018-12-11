import api from './api';

export const fetchCourses = (params) => {
  return api.callGet('/courses/fetch_courses', params);
};

export const addCourse = (params) => {
  return api.callPost('/courses', params);
};
