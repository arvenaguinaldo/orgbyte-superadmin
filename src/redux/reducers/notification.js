import {NOTIFICATION} from 'constants/actions/notification';
import {Map} from 'immutable';

/**
 * @namespace
 * @property {string} message - The text that can be displayed.
 * @property {string} type - The message type which can be used on how to display the message. The value can be `info`, `success`, `error`, `warning` or `loading`.
 * @property {string} source - The message source or action that can be use to identify where the message comes from or which action triggers the message.
 * @property {boolean} alert - The flag to determine whether to display the message in notification bar at the top of the page.
 */
const initialState = Map({
  message: null,
  type: null,
  source: null,
  alert: false
});

const notification = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION.SET_MESSAGE: {
      const {message, options} = action;
      const notificationOptions = options || {};
      return initialState.merge({
        message,
        type: notificationOptions.type || null,
        source: notificationOptions.source || null,
        alert: notificationOptions.alert || true
      });
    }
    case NOTIFICATION.CLEAR_MESSAGE:
      return initialState;
    default:
      return state;
  }
};

export default notification;
