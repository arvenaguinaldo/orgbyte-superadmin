import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as eventsActions from 'redux/actions/events';
import * as eventsService from 'services/api/events';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {EVENTS} from 'constants/actions/events';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchEvents(action) {
  const response = yield call(eventsService.fetchEvents, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(eventsActions.fetchEventsSuccess(response));
    }
  }
}

function* fetchEvent(action) {
  const response = yield call(eventsService.fetchEvent, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(eventsActions.fetchEventSuccess(response));
    }
  }
}

function* createEvent(action) {
  const response = yield call(eventsService.createEvent, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield call(callSuccessNotification, 'Event Created Successfully');
      yield put(eventsActions.createEventSuccess(response.data));
      yield put(reset('CreateEventForm'));
      yield put(push('/events'));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(EVENTS.FETCH_EVENTS, fetchEvents);
}

function* watchRequestFetchEvent() {
  yield* takeEvery(EVENTS.FETCH_EVENT, fetchEvent);
}

function* watchRequestCreateEvent() {
  yield* takeEvery(EVENTS.CREATE_EVENT, createEvent);
}


export default function* events() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchEvent),
    fork(watchRequestCreateEvent)
  ];
}
