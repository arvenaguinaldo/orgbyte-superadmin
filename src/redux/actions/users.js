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

export const addMember = params => ({
  type: USERS.ADD_MEMBER,
  params
});

export const addMemberSuccess = response => ({
  type: USERS.ADD_MEMBER_SUCCESS,
  response
});

export const fetchMembers = params => ({
  type: USERS.FETCH_MEMBERS,
  params
});

export const fetchMembersSuccess = response => ({
  type: USERS.FETCH_MEMBERS_SUCCESS,
  response
});
