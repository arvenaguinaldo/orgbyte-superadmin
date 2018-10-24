import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as usersActions from 'redux/actions/users';
import * as usersService from 'services/api/users';
import {push} from 'react-router-redux';
import {USERS} from 'constants/actions/users';
import {callErrorNotification} from './notification';
import {callSuccessNotification} from './notification';

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

function* addMember(action) {
  const response = yield call(usersService.addMember, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield call(callSuccessNotification, 'Registration has been Successful');
      console.log(response);
      yield put(usersActions.addMemberSuccess(response.data));
      yield put(push('/memberships'));
    }
  }
}

function* fetchMembers(action) {
  const response = yield call(usersService.fetchMembers, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(usersActions.fetchMembersSuccess(response));
    }
  }
}

function* addUser(action) {
  const response = yield call(usersService.addUser, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(usersActions.addUserSuccess(response));
    }
  }
}

function* verifyMember(action) {
  const response = yield call(usersService.verifyMember, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(usersActions.verifyMemberSuccess(response));
    } else {
      yield put(usersActions.verifyMemberSuccess(response));
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

function* watchRequestAddMember() {
  yield* takeEvery(USERS.ADD_MEMBER, addMember);
}

function* watchRequestFetchMembers() {
  yield* takeEvery(USERS.FETCH_MEMBERS, fetchMembers);
}

function* watchRequestAddUser() {
  yield* takeEvery(USERS.ADD_USER, addUser);
}

function* watchRequestVerifyMember() {
  yield* takeEvery(USERS.VERIFY_MEMBER, verifyMember);
}

export default function* users() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchPresidents),
    fork(watchRequestAddMember),
    fork(watchRequestFetchMembers),
    fork(watchRequestAddUser),
    fork(watchRequestVerifyMember)
  ];
}
