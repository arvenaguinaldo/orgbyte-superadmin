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

export const makeSelectAuthMeta = () => createSelector(
  makeSelectAuth(),
  auth => auth.meta
);
