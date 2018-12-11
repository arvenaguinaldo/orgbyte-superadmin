import {COLLEGES} from 'constants/actions/colleges';

export const fetchColleges = params => ({
  type: COLLEGES.FETCH_COLLEGES,
  params
});

export const fetchCollegesSuccess = response => ({
  type: COLLEGES.FETCH_COLLEGES_SUCCESS,
  response
});

export const addCollege = (params, callback) => ({
  type: COLLEGES.ADD_COLLEGE,
  params,
  callback
});

export const addCollegeSuccess = response => ({
  type: COLLEGES.ADD_COLLEGE_SUCCESS,
  response
});
