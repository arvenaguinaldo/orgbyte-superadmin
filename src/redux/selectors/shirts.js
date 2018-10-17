import {createSelector} from 'reselect';

export const selectShirts = state => state.shirts;

export const makeSelectShirts = () => createSelector(
  selectShirts,
  shirts => shirts.toJS()
);

export const makeSelectShirtsList = () => createSelector(
  makeSelectShirts(),
  shirts => shirts.list
);

export const makeSelectShirt = () => createSelector(
  makeSelectShirts(),
  shirts => shirts.shirt
);

export const makeSelectVerifyMember = () => createSelector(
  makeSelectShirts(),
  shirts => shirts.verifyMember
);

export const makeSelectIsVerified = () => createSelector(
  makeSelectShirts(),
  shirts => shirts.isVerified
);

export const makeSelectShirtSizes = () => createSelector(
  makeSelectShirts(),
  shirts => shirts.sizes
);

export const makeSelectShirtPurchaseShirts = () => createSelector(
  makeSelectShirts(),
  shirts => shirts.fetchPurchaseShirts
);

export const makeSelectShirtsMeta = () => createSelector(
  makeSelectShirts(),
  shirts => shirts.meta
);
