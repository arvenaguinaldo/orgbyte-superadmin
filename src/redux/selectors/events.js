import {createSelector} from 'reselect';

export const selectEvents = state => state.events;

export const makeSelectEvents = () => createSelector(
  selectEvents,
  events => events.toJS()
);

export const makeSelectEventsList = () => createSelector(
  makeSelectEvents(),
  events => events.list
);

export const makeSelectEventsMeta = () => createSelector(
  makeSelectEvents(),
  events => events.meta
);
