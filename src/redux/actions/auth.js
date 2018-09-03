import {AUTH} from 'constants/actions/auth';

export const login = params => ({
  type: AUTH.LOGIN,
  params
});

export const setCurrentUser = response => ({
  type: AUTH.SET_CURRENT_USER,
  response
});

export const logout = params => ({
  type: AUTH.LOGOUT,
  params
});

export const loginSuccess = response => ({
  type: AUTH.LOGIN_SUCCESS,
  response
});
