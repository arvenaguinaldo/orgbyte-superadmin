import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
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

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(COLLEGES.FETCH_COLLEGES, fetchColleges);
}

export default function* colleges() {
  yield [
    fork(watchRequest)
  ];
}
