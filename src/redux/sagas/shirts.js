import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as shirtsActions from 'redux/actions/shirts';
import * as shirtsService from 'services/api/shirts';
import {SHIRTS} from 'constants/actions/shirts';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* fetchShirts(action) {
  const response = yield call(shirtsService.fetchShirts, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(shirtsActions.fetchShirtsSuccess(response));
    }
  }
}

function* verifyMember(action) {
  const response = yield call(shirtsService.verifyMember, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(shirtsActions.verifyMemberSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(SHIRTS.FETCH_SHIRTS, fetchShirts);
}

function* watchRequestVerifyMember() {
  yield* takeEvery(SHIRTS.VERIFY_MEMBER, verifyMember);
}

export default function* shirts() {
  yield [
    fork(watchRequest),
    fork(watchRequestVerifyMember)
  ];
}
