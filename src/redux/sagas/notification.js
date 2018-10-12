import {put, call} from 'redux-saga/effects';
import * as notificationActions from 'redux/actions/notification';

function* clearNotification() {
  yield put(notificationActions.clearMessage());
}

function* callNotification(message, options) {
  yield call(clearNotification);
  yield put(notificationActions.setMessage(message, options));
}

function* callInfoNotification(message, options) {
  yield call(clearNotification);
  yield put(notificationActions.setMessage(message, {type: 'info', ...options}));
}

function* callSuccessNotification(message, options) {
  yield call(clearNotification);
  yield put(notificationActions.setMessage(message, {type: 'success', ...options}));
}

function* callErrorNotification(message, options) {
  yield call(clearNotification);
  yield put(notificationActions.setMessage(message, {type: 'error', ...options}));
}

function* callWarningNotification(message, options) {
  yield call(clearNotification);
  yield put(notificationActions.setMessage(message, {type: 'warning', ...options}));
}

function* callLoadingNotification(message, options) {
  yield call(clearNotification);
  yield put(notificationActions.setMessage(message, {type: 'loading', ...options}));
}

export {
  callNotification,
  callInfoNotification,
  callSuccessNotification,
  callErrorNotification,
  callWarningNotification,
  callLoadingNotification,
  clearNotification
};
