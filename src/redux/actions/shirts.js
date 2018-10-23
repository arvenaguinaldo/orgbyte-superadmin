import {SHIRTS} from 'constants/actions/shirts';

export const fetchShirt = params => ({
  type: SHIRTS.FETCH_SHIRT,
  params
});

export const fetchShirtSuccess = response => ({
  type: SHIRTS.FETCH_SHIRT_SUCCESS,
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

export const fetchPurchaseShirts = params => ({
  type: SHIRTS.FETCH_PURCHASE_SHIRTS,
  params
});

export const fetchPurchaseShirtsSuccess = response => ({
  type: SHIRTS.FETCH_PURCHASE_SHIRTS_SUCCESS,
  response
});

