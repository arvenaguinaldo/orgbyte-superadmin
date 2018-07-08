import {createSelector} from 'reselect';

const selectNotification = state => state.notification;

const makeSelectNotification = () => createSelector(
  selectNotification,
  notification => notification.toJS()
);

export {
  selectNotification,
  makeSelectNotification
};
