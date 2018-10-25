import {createSelector} from 'reselect';

export const selectColleges = state => state.colleges;

export const makeSelectColleges = () => createSelector(
  selectColleges,
  colleges => colleges.toJS()
);

export const makeSelectCollegesList = () => createSelector(
  makeSelectColleges(),
  colleges => colleges.list
);

export const makeSelectCollegesMeta = () => createSelector(
  makeSelectColleges(),
  colleges => colleges.meta
);
