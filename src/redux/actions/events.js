import {EVENTS} from 'constants/actions/events';

export const fetchEvents = params => ({
  type: EVENTS.FETCH_EVENTS,
  params
});

export const fetchEventsSuccess = response => ({
  type: EVENTS.FETCH_EVENTS_SUCCESS,
  response
});

export const fetchEvent = params => ({
  type: EVENTS.FETCH_EVENT,
  params
});

export const fetchEventSuccess = response => ({
  type: EVENTS.FETCH_EVENT_SUCCESS,
  response
});

export const createEvent = params => ({
  type: EVENTS.CREATE_EVENT,
  params
});

export const createEventSuccess = response => ({
  type: EVENTS.CREATE_EVENT_SUCCESS,
  response
});

export const register = params => ({
  type: EVENTS.REGISTER,
  params
});

export const registerSuccess = response => ({
  type: EVENTS.REGISTER_SUCCESS,
  response
});
