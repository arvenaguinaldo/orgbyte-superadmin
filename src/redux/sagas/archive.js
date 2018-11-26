import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as archiveActions from 'redux/actions/archive';
import * as archiveService from 'services/api/archive';
import {ARCHIVE} from 'constants/actions/archive';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchArchives(action) {
  const response = yield call(archiveService.fetchArchives, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
    } else {
      const successResponse = {table: action.params.table, response};
      yield put(archiveActions.fetchArchivesSuccess(successResponse));
    }
  }
}

function* archiveData(action) {
  const response = yield call(archiveService.archive, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
    } else {
      const successResponse = {table: action.params.table, response};
      yield call(callSuccessNotification, 'Archived Successfully');
      yield put(archiveActions.archiveSuccess(successResponse));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(ARCHIVE.FETCH_ARCHIVES, fetchArchives);
}

function* watchRequestArchive() {
  yield* takeEvery(ARCHIVE.ARCHIVE, archiveData);
}

export default function* archive() {
  yield [
    fork(watchRequest),
    fork(watchRequestArchive)
  ];
}
