import {SHIRTS} from 'constants/actions/shirts';

export const fetchShirt = params => ({
  type: SHIRTS.FETCH_SHIRT,
  params
});

export const fetchShirtSuccess = response => ({
  type: SHIRTS.FETCH_SHIRT_SUCCESS,
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

export const addOrgShirt = params => ({
  type: SHIRTS.ADD_ORGSHIRT,
  params
});

export const addOrgShirtSuccess = response => ({
  type: SHIRTS.ADD_ORGSHIRT_SUCCESS,
  response
});

export const fetchSizes = params => ({
  type: SHIRTS.FETCH_SIZES,
  params
});

export const fetchSizesSuccess = response => ({
  type: SHIRTS.FETCH_SIZES_SUCCESS,
  response
});

export const purchaseShirt = params => ({
  type: SHIRTS.PURCHASE_SHIRT,
  params
});

export const purchaseShirtSuccess = response => ({
  type: SHIRTS.PURCHASE_SHIRT_SUCCESS,
  response
});

