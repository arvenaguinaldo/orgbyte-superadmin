import api from './api';

export const fetchEvents = () => {
  return api.callGet('/events');
};

export const fetchEvent = (params) => {
  return api.callGet('/events/' + params);
};

export const createEvent = (params) => {
  return api.callPost('/events', params);
};

export const register = (params) => {
  return api.callPost('/event_attendees', params);
};

export const fetchAttendee = (params) => {
  return api.callGet('/event_attendees/fetch_attendee_qr/' + params.qr_result + '/' + params.event_id);
};

export const fetchAttendees = (params) => {
  return api.callGet('/event_attendees/fetch_attendees/' + params);
};

export const attend = (params) => {
  return api.callPut('/event_attendees/attend/', params);
};

export const settlePayment = (params) => {
  return api.callPut('/event_attendees/settle_payment/', params);
};

export const registerImports = (params) => {
  return api.callPost('/event_attendees/register_imports', params);
};

export const fetchWhoAttend = (params) => {
  return api.callGet('/event_attendees/fetch_who_attend/' + params);
};

export const saveEdit = (params) => {
  return api.callPut('/events/' + params.id, params.values);
};

export const publish = (params) => {
  console.log(params);
  return api.callPut('/events/publish', params);
};

