import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import {reset} from 'redux-form';
import * as collegesActions from 'redux/actions/colleges';
import * as collegesService from 'services/api/colleges';
import {COLLEGES} from 'constants/actions/colleges';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* fetchColleges(action) {
  const response = yield call(collegesService.fetchColleges, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(collegesActions.fetchCollegesSuccess(response));
    }
  }
}

function* addCollege(action) {
  const response = yield call(collegesService.addCollege, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      action.callback();
      yield put(reset('AddCollegeForm'));
      yield put(collegesActions.addCollegeSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(COLLEGES.FETCH_COLLEGES, fetchColleges);
}

function* watchRequestAddCollege() {
  yield* takeEvery(COLLEGES.ADD_COLLEGE, addCollege);
}

export default function* colleges() {
  yield [
    fork(watchRequest),
    fork(watchRequestAddCollege)
  ];
}
