import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as eventsActions from 'redux/actions/events';
import * as eventsService from 'services/api/events';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {EVENTS} from 'constants/actions/events';
import {ARCHIVE} from 'constants/actions/archive';
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
      yield put(push('/admin/events'));
    }
  }
}

function* register(action) {
  const response = yield call(eventsService.register, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.registerSuccess(response.data));
    } else {
      yield call(callSuccessNotification, 'Register Successfully');
      yield put(eventsActions.registerSuccess(response.data));
      yield put(reset('EventRegisterFormMember'));
      yield put(reset('VerifyMemberForm'));
      // yield put(push('/events'));
    }
  }
}

function* fetchAttendee(action) {
  const response = yield call(eventsService.fetchAttendee, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.fetchAttendeeSuccess(response));
    } else {
      yield put(eventsActions.fetchAttendeeSuccess(response));
    }
  }
}

function* fetchAttendees(action) {
  const response = yield call(eventsService.fetchAttendees, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.fetchAttendeesSuccess(response));
    } else {
      yield put(eventsActions.fetchAttendeesSuccess(response));
    }
  }
}

function* attend(action) {
  const response = yield call(eventsService.attend, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.attendSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Attended Successfully');
      console.log(response);
      yield put(eventsActions.attendSuccess(response));
    }
  }
}

function* settlePayment(action) {
  const response = yield call(eventsService.settlePayment, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.settlePaymentSuccess(response));
    } else {
      yield put(eventsActions.settlePaymentSuccess(response));
    }
  }
}

function* registerImports(action) {
  const response = yield call(eventsService.registerImports, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.registerImportsSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Register Successfully');
      yield put(eventsActions.registerImportsSuccess(response.data));
      yield put(reset('EventRegisterForm'));
      // yield put(push('/events'));
    }
  }
}

function* fetchWhoAttend(action) {
  const response = yield call(eventsService.fetchWhoAttend, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.fetchWhoAttendSuccess(response));
    } else {
      yield put(eventsActions.fetchWhoAttendSuccess(response));
    }
  }
}

function* saveEdit(action) {
  const response = yield call(eventsService.saveEdit, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.saveEditSuccess(response));
    } else {
      yield put(eventsActions.saveEditSuccess(response));
      yield call(callSuccessNotification, 'Event Updated Successfully');
      yield put(push('/admin/events/' + response.data.id));
    }
  }
}

function* publish(action) {
  const response = yield call(eventsService.publish, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(eventsActions.publishSuccess(response));
    } else {
      yield put(eventsActions.publishSuccess(response));
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

function* watchRequestRegister() {
  yield* takeEvery(EVENTS.REGISTER, register);
}

function* watchRequestFetchAttendee() {
  yield* takeEvery(EVENTS.FETCH_ATTENDEE, fetchAttendee);
}

function* watchRequestFetchAttendees() {
  yield* takeEvery(EVENTS.FETCH_ATTENDEES, fetchAttendees);
}

function* watchRequestAttend() {
  yield* takeEvery(EVENTS.ATTEND, attend);
}

function* watchRequestSettlePayment() {
  yield* takeEvery(EVENTS.SETTLE_PAYMENT, settlePayment);
}

function* watchRequestRegisterImports() {
  yield* takeEvery(EVENTS.REGISTER_IMPORTS, registerImports);
}

function* watchRequestFetchWhoAttend() {
  yield* takeEvery(EVENTS.FETCH_WHO_ATTEND, fetchWhoAttend);
}

function* watchRequestSaveEdit() {
  yield* takeEvery(EVENTS.SAVE_EDIT, saveEdit);
}

function* watchRequestPublish() {
  yield* takeEvery(EVENTS.PUBLISH, publish);
}

function* watchRequestArchive() {
  yield* takeEvery(ARCHIVE.ARCHIVE_SUCCESS, fetchEvents);
}

export default function* events() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchEvent),
    fork(watchRequestCreateEvent),
    fork(watchRequestRegister),
    fork(watchRequestFetchAttendee),
    fork(watchRequestFetchAttendees),
    fork(watchRequestAttend),
    fork(watchRequestSettlePayment),
    fork(watchRequestRegisterImports),
    fork(watchRequestFetchWhoAttend),
    fork(watchRequestSaveEdit),
    fork(watchRequestPublish),
    fork(watchRequestArchive)
  ];
}
