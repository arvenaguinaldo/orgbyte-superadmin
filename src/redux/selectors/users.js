import {createSelector} from 'reselect';

export const selectUser = state => state.user;

export const makeSelectUser = () => createSelector(
  selectUser,
  user => user.toJS()
);

export const makeSelectUserEmail = () => createSelector(
  makeSelectUser(),
  user => user.email
);

export const makeSelectUserPassword = () => createSelector(
  makeSelectUser(),
  user => user.password
);

export const makeSelectUserMeta = () => createSelector(
  makeSelectUser(),
  user => user.meta
);
