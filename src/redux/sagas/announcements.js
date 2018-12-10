import {takeEvery, delay} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as announcementsActions from 'redux/actions/announcements';
import * as announcementsService from 'services/api/announcements';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {EDIT} from 'constants/actions/edit';
import {ARCHIVE} from 'constants/actions/archive';
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
      yield put(action.callback(response.data));
      yield call(delay, 5000);
      yield call(callSuccessNotification, 'Announcement Post Successfully');
      // yield put(announcementsActions.createAnnouncementSuccess(response.data));
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

function* watchRequestSaveEdit() {
  yield* takeEvery(EDIT.SAVE_EDIT_SUCCESS, fetchAnnouncements);
}

function* watchRequestArchive() {
  yield* takeEvery(ARCHIVE.ARCHIVE_SUCCESS, fetchAnnouncements);
}


export default function* announcements() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchAnnouncement),
    fork(watchRequestCreateAnnouncement),
    fork(watchRequestSaveEdit),
    fork(watchRequestArchive)
  ];
}
