import {createSelector} from 'reselect';

export const selectRenewal = state => state.renewal;

export const makeSelectRenewal = () => createSelector(
  selectRenewal,
  renewal => renewal.toJS()
);

export const makeSelectRenewalDate = () => createSelector(
  makeSelectRenewal(),
  renewal => renewal.date
);

export const makeSelectRenewalMeta = () => createSelector(
  makeSelectRenewal(),
  renewal => renewal.meta
);
