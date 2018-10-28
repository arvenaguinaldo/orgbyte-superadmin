import {COLLEGES} from 'constants/actions/colleges';

export const fetchColleges = params => ({
  type: COLLEGES.FETCH_COLLEGES,
  params
});

export const fetchCollegesSuccess = response => ({
  type: COLLEGES.FETCH_COLLEGES_SUCCESS,
  response
});
