import {SHIRTS} from 'constants/actions/shirts';

export const fetchShirt = params => ({
  type: SHIRTS.FETCH_SHIRT,
  params
});

export const fetchShirtSuccess = response => ({
  type: SHIRTS.FETCH_SHIRT_SUCCESS,
  response
});

export const addOrgShirt = (params, callback) => ({
  type: SHIRTS.ADD_ORGSHIRT,
  params,
  callback
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

export const purchaseImports = params => ({
  type: SHIRTS.PURCHASE_IMPORTS,
  params
});

export const purchaseImportsSuccess = response => ({
  type: SHIRTS.PURCHASE_IMPORTS_SUCCESS,
  response
});

export const fetchShirtOrganization = params => ({
  type: SHIRTS.FETCH_SHIRT_ORGANIZATION,
  params
});

export const fetchShirtOrganizationSuccess = response => ({
  type: SHIRTS.FETCH_SHIRT_ORGANIZATION_SUCCESS,
  response
});
