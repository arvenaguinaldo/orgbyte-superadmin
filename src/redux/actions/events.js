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

export const fetchAttendee = params => ({
  type: EVENTS.FETCH_ATTENDEE,
  params
});

export const fetchAttendeeSuccess = response => ({
  type: EVENTS.FETCH_ATTENDEE_SUCCESS,
  response
});

export const fetchAttendees = params => ({
  type: EVENTS.FETCH_ATTENDEES,
  params
});

export const fetchAttendeesSuccess = response => ({
  type: EVENTS.FETCH_ATTENDEES_SUCCESS,
  response
});

export const attend = params => ({
  type: EVENTS.ATTEND,
  params
});

export const attendSuccess = response => ({
  type: EVENTS.ATTEND_SUCCESS,
  response
});

export const settlePayment = params => ({
  type: EVENTS.SETTLE_PAYMENT,
  params
});

export const settlePaymentSuccess = response => ({
  type: EVENTS.SETTLE_PAYMENT_SUCCESS,
  response
});

export const registerImports = params => ({
  type: EVENTS.REGISTER_IMPORTS,
  params
});

export const registerImportsSuccess = response => ({
  type: EVENTS.REGISTER_IMPORTS_SUCCESS,
  response
});

export const fetchWhoAttend = params => ({
  type: EVENTS.FETCH_WHO_ATTEND,
  params
});

export const fetchWhoAttendSuccess = response => ({
  type: EVENTS.FETCH_WHO_ATTEND_SUCCESS,
  response
});

export const saveEdit = params => ({
  type: EVENTS.SAVE_EDIT,
  params
});

export const saveEditSuccess = response => ({
  type: EVENTS.SAVE_EDIT_SUCCESS,
  response
});

export const publish = params => ({
  type: EVENTS.PUBLISH,
  params
});

export const publishSuccess = response => ({
  type: EVENTS.PUBLISH_SUCCESS,
  response
});

