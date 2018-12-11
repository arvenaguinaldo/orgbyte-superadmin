import {COURSES} from 'constants/actions/courses';

export const fetchCourses = params => ({
  type: COURSES.FETCH_COURSES,
  params
});

export const fetchCoursesSuccess = response => ({
  type: COURSES.FETCH_COURSES_SUCCESS,
  response
});

export const addCourse = (params, callback) => ({
  type: COURSES.ADD_COURSE,
  params,
  callback
});

export const addCourseSuccess = response => ({
  type: COURSES.ADD_COURSE_SUCCESS,
  response
});

