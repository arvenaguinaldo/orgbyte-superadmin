import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as usersActions from 'redux/actions/users';
import * as usersService from 'services/api/users';
import {push} from 'react-router-redux';
import {reset} from 'redux-form';
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
      yield put(usersActions.addMemberSuccess(response.data));
      yield put(reset('AddMember'));
      yield put(push('/admin/memberships'));
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
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(usersActions.addUserSuccess(response.data.error));
    } else {
      yield call(callSuccessNotification, 'Account added successfully');
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

function* addMembers(action) {
  const response = yield call(usersService.addMembers, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(usersActions.addMembersSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Registration has been Successful');
      yield put(usersActions.addMembersSuccess(response.data));
      // yield put(push('/admin/memberships'));
    }
  }
}

function* changePassword(action) {
  const response = yield call(usersService.changePassword, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(usersActions.changePasswordSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Change password successfully');
      yield put(usersActions.changePasswordSuccess(response.data));
      yield put(reset('ChangePasswordForm'));
      // yield put(push('/admin/memberships'));
    }
  }
}

function* fetchOfficers(action) {
  const response = yield call(usersService.fetchOfficers, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(usersActions.fetchOfficersSuccess(response));
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

function* watchRequestAddMembers() {
  yield* takeEvery(USERS.ADD_MEMBERS, addMembers);
}

function* watchRequestChangePassword() {
  yield* takeEvery(USERS.CHANGE_PASSWORD, changePassword);
}

function* watchRequestFetchOfficers() {
  yield* takeEvery(USERS.FETCH_OFFICERS, fetchOfficers);
}

export default function* users() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchPresidents),
    fork(watchRequestAddMember),
    fork(watchRequestFetchMembers),
    fork(watchRequestAddUser),
    fork(watchRequestVerifyMember),
    fork(watchRequestAddMembers),
    fork(watchRequestChangePassword),
    fork(watchRequestFetchOfficers)
  ];
}
