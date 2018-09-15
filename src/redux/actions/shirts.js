import {SHIRTS} from 'constants/actions/shirts';

export const fetchShirts = params => ({
  type: SHIRTS.FETCH_SHIRTS,
  params
});

export const fetchShirtsSuccess = response => ({
  type: SHIRTS.FETCH_SHIRTS_SUCCESS,
  response
});

export const verifyMember = params => ({
  type: SHIRTS.VERIFY_MEMBER,
  params
});

export const verifyMemberSuccess = response => ({
  type: SHIRTS.VERIFY_MEMBER_SUCCESS,
  response
});
