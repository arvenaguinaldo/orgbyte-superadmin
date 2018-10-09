import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as eventsActions from 'redux/actions/events';
import * as eventsService from 'services/api/events';
import {EVENTS} from 'constants/actions/events';
import {callErrorNotification} from './notification';

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

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(EVENTS.FETCH_EVENTS, fetchEvents);
}

export default function* events() {
  yield [
    fork(watchRequest)
  ];
}
