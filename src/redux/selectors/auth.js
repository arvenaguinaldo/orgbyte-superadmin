import {createSelector} from 'reselect';

export const selectAuth = state => state.auth;


export const makeSelectAuth = () => createSelector(
  selectAuth,
  auth => auth.toJS()
);

export const makeSelectAuthUser = () => createSelector(
  makeSelectAuth(),
  auth => auth.login
);

export const makeSelectCurrentUser = () => createSelector(
  makeSelectAuth(),
  auth => auth.user
);

export const makeSelectColorTheme = () => createSelector(
  makeSelectAuth(),
  auth => auth.colorTheme
);

export const makeSelectAuthMeta = () => createSelector(
  makeSelectAuth(),
  auth => auth.meta
);
