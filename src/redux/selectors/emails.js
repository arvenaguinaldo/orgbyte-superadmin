import {createSelector} from 'reselect';

export const selectEmails = state => state.emails;

export const makeSelectEmails = () => createSelector(
  selectEmails,
  emails => emails.toJS()
);

export const makeSelectEmailsList = () => createSelector(
  makeSelectEmails(),
  emails => emails.list
);

export const makeSelectEmail = () => createSelector(
  makeSelectEmails(),
  emails => emails.email
);

export const makeSelectEmailsMeta = () => createSelector(
  makeSelectEmails(),
  emails => emails.meta
);
