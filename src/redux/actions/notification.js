import {NOTIFICATION} from 'constants/actions/notification';

export const setMessage = (message, options) => ({
  type: NOTIFICATION.SET_MESSAGE,
  message,
  options
});

export const clearMessage = () => ({
  type: NOTIFICATION.CLEAR_MESSAGE
});
