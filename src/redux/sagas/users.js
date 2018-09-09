import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as usersActions from 'redux/actions/users';
import * as usersService from 'services/api/users';
import {USERS} from 'constants/actions/users';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* fetchUsers(action) {
  const response = yield call(usersService.fetchUsers, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(usersActions.fetchUsersSuccess(response));
    }
  }
}

function* fetchPresidents(action) {
  const response = yield call(usersService.fetchPresidents, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(usersActions.fetchPresidentsSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(USERS.FETCH_USERS, fetchUsers);
}

function* watchRequestFetchPresidents() {
  yield* takeEvery(USERS.FETCH_PRESIDENTS, fetchPresidents);
}

export default function* users() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchPresidents)
  ];
}
