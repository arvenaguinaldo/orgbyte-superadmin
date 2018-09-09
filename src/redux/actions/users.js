import {USERS} from 'constants/actions/users';

export const fetchUsers = params => ({
  type: USERS.FETCH_USERS,
  params
});

export const fetchUsersSuccess = response => ({
  type: USERS.FETCH_USERS_SUCCESS,
  response
});

export const fetchPresidents = params => ({
  type: USERS.FETCH_PRESIDENTS,
  params
});

export const fetchPresidentsSuccess = response => ({
  type: USERS.FETCH_PRESIDENTS_SUCCESS,
  response
});
