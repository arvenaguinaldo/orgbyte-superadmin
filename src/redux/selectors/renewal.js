import {createSelector} from 'reselect';

export const selectRenewal = state => state.renewal;

export const makeSelectRenewal = () => createSelector(
  selectRenewal,
  renewal => renewal.toJS()
);

export const makeSelectRenewalList = () => createSelector(
  makeSelectRenewal(),
  renewal => renewal.list
);

export const makeSelectRenewalMeta = () => createSelector(
  makeSelectRenewal(),
  renewal => renewal.meta
);
