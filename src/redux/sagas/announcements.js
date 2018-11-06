import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as announcementsActions from 'redux/actions/announcements';
import * as announcementsService from 'services/api/announcements';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {ANNOUNCEMENTS} from 'constants/actions/announcements';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchAnnouncements(action) {
  const response = yield call(announcementsService.fetchAnnouncements, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(announcementsActions.fetchAnnouncementsSuccess(response));
    }
  }
}

function* fetchAnnouncement(action) {
  const response = yield call(announcementsService.fetchAnnouncement, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(announcementsActions.fetchAnnouncementSuccess(response));
    }
  }
}

function* createAnnouncement(action) {
  const response = yield call(announcementsService.createAnnouncement, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
    } else {
      yield call(callSuccessNotification, 'Announcement Posr Successfully');
      yield put(announcementsActions.createAnnouncementSuccess(response.data));
      yield put(reset('AnnouncementsForm'));
      yield put(push('/admin/announcements'));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(ANNOUNCEMENTS.FETCH_ANNOUNCEMENTS, fetchAnnouncements);
}

function* watchRequestFetchAnnouncement() {
  yield* takeEvery(ANNOUNCEMENTS.FETCH_ANNOUNCEMENT, fetchAnnouncement);
}

function* watchRequestCreateAnnouncement() {
  yield* takeEvery(ANNOUNCEMENTS.CREATE_ANNOUNCEMENT, createAnnouncement);
}


export default function* announcements() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchAnnouncement),
    fork(watchRequestCreateAnnouncement)
  ];
}
