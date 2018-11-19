import {createSelector} from 'reselect';

export const selectSmss = state => state.sms;

export const makeSelectSmss = () => createSelector(
  selectSmss,
  smss => smss.toJS()
);

export const makeSelectSmssList = () => createSelector(
  makeSelectSmss(),
  smss => smss.list
);

export const makeSelectEmail = () => createSelector(
  makeSelectSmss(),
  smss => smss.sms
);

export const makeSelectSmssMeta = () => createSelector(
  makeSelectSmss(),
  smss => smss.meta
);
