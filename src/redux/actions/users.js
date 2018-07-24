import {USERS} from 'constants/actions/users';

export const fetchUsers = params => ({
  type: USERS.FETCH_USERS,
  params
});

export const fetchUsersSuccess = response => ({
  type: USERS.FETCH_USERS_SUCCESS,
  response
});
