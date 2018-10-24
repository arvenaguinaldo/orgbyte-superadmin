import {COURSES} from 'constants/actions/courses';

export const fetchCourses = params => ({
  type: COURSES.FETCH_COURSES,
  params
});

export const fetchCoursesSuccess = response => ({
  type: COURSES.FETCH_COURSES_SUCCESS,
  response
});
