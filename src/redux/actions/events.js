import {EVENTS} from 'constants/actions/events';

export const fetchEvents = params => ({
  type: EVENTS.FETCH_EVENTS,
  params
});

export const fetchEventsSuccess = response => ({
  type: EVENTS.FETCH_EVENTS_SUCCESS,
  response
});
