import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as organizationsActions from 'redux/actions/organizations';
import * as usersActions from 'redux/actions/users';
import * as organizationsService from 'services/api/organizations';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {ORGANIZATIONS} from 'constants/actions/organizations';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchOrganizations(action) {
  const response = yield call(organizationsService.fetchOrganizations, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(organizationsActions.fetchOrganizationsSuccess(response));
    }
  }
}

function* fetchOrganization(action) {
  const response = yield call(organizationsService.fetchOrganization, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(organizationsActions.fetchOrganizationSuccess(response));
    }
  }
}

function* fetchCurrentOrganization(action) {
  const response = yield call(organizationsService.fetchCurrentOrganization, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(organizationsActions.fetchCurrentOrganizationSuccess(response));
    }
  }
}

function* addOrganization(action) {
  const response = yield call(organizationsService.addOrganization, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield call(callSuccessNotification, 'Registration has been Successful');
      yield put(organizationsActions.addOrganizationSuccess(response.data.organization));
      yield put(usersActions.addUserSuccess(response.data.user));
      yield put(reset('AddOrganizationForm'));
      yield put(push('/organizations'));
    }
  }
}

// function* addOrganizationUser(action) {
//   const response = yield call(organizationsService.addUser, action.params);
//   if (response) {
//     console.log(action.params);
//     if (response.error) {
//       yield call(callErrorNotification, `Could not add data: ${response.error}`);
//     } else {
//       yield put(push('/addorganization'));
//     }
//   }
// }

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(ORGANIZATIONS.FETCH_ORGANIZATIONS, fetchOrganizations);
}

function* watchRequestFetchOrganization() {
  yield* takeEvery(ORGANIZATIONS.FETCH_ORGANIZATION, fetchOrganization);
}

function* watchRequestFetchCurrentOrganization() {
  yield* takeEvery(ORGANIZATIONS.FETCH_CURRENT_ORGANIZATION, fetchCurrentOrganization);
}

function* watchRequestAddOrganization() {
  yield* takeEvery(ORGANIZATIONS.ADD_ORGANIZATION, addOrganization);
}


// function* watchRequestAddOrganizationUser() {
//   yield* takeEvery(ORGANIZATIONS.ADD_ORGANIZATION_USER, addOrganizationUser);
// }
export default function* organizations() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchOrganization),
    fork(watchRequestFetchCurrentOrganization),
    fork(watchRequestAddOrganization)
  ];
}
