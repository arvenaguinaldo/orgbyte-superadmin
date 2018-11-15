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

export const makeSelectEvent = () => createSelector(
  makeSelectEvents(),
  events => events.event
);

export const makeSelectAttendee = () => createSelector(
  makeSelectEvents(),
  events => events.attendee
);

export const makeSelectAttendees = () => createSelector(
  makeSelectEvents(),
  events => events.attendees
);

export const makeSelectSuccess = () => createSelector(
  makeSelectEvents(),
  events => events.success
);

export const makeSelectWhoAttend = () => createSelector(
  makeSelectEvents(),
  events => events.fetchWhoAttend
);

export const makeSelectEventsMeta = () => createSelector(
  makeSelectEvents(),
  events => events.meta
);
