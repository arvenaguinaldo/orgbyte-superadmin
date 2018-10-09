import {createSelector} from 'reselect';

export const selectUsers = state => state.users;

export const makeSelectUsers = () => createSelector(
  selectUsers,
  users => users.toJS()
);

export const makeSelectUsersList = () => createSelector(
  makeSelectUsers(),
  users => users.list
);

export const makeSelectPresidentsList = () => createSelector(
  makeSelectUsers(),
  users => users.presidents
);

export const makeSelectUsersMeta = () => createSelector(
  makeSelectUsers(),
  users => users.meta
);

export const makeSelectMembersList = () => createSelector(
  makeSelectUsers(),
  users => users.members
);
