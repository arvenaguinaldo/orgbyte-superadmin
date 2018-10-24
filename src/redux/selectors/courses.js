import {createSelector} from 'reselect';

export const selectCourses = state => state.courses;

export const makeSelectCourses = () => createSelector(
  selectCourses,
  courses => courses.toJS()
);

export const makeSelectCoursesList = () => createSelector(
  makeSelectCourses(),
  courses => courses.list
);

export const makeSelectCoursesMeta = () => createSelector(
  makeSelectCourses(),
  courses => courses.meta
);
