import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as organizationsActions from 'redux/actions/organizations';
import * as usersActions from 'redux/actions/users';
import * as organizationsService from 'services/api/organizations';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {ORGANIZATIONS} from 'constants/actions/organizations';
import {ARCHIVE} from 'constants/actions/archive';
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
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
    } else {
      yield call(callSuccessNotification, 'Registration has been Successful');
      yield put(organizationsActions.addOrganizationSuccess(response.data.organization));
      yield put(usersActions.addUserSuccess(response.data.user));
      yield put(reset('AddOrganizationForm'));
      yield put(push('/superadmin/organizations'));
    }
  }
}

function* fetchOrganizationToUserSide(action) {
  const response = yield call(organizationsService.fetchOrganizationToUserSide, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(organizationsActions.fetchOrganizationToUserSideSuccess(response));
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
//       yield put(push('/superadmin/addorganization'));
//     }
//   }
// }

function* renewOrganization(action) {
  const response = yield call(organizationsService.renewOrganization, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(organizationsActions.renewOrganizationSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Registration has been Successful');
      yield put(organizationsActions.renewOrganizationSuccess(response.data.organization));
      yield put(usersActions.renewUserSuccess(response.data.user));
      yield put(reset('RenewOrganizationForm'));
      yield put(push('/superadmin/reneworganization'));
    }
  }
}

function* fetchSuspendedOrganizations(action) {
  const response = yield call(organizationsService.fetchSuspendedOrganizations, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(organizationsActions.fetchSuspendedOrganizationsSuccess(response));
    }
  }
}

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

function* watchRequestFetchOrganizationToUserSide() {
  yield* takeEvery(ORGANIZATIONS.FETCH_ORGANIZATION_TO_USER_SIDE, fetchOrganizationToUserSide);
}

function* watchRequestRenewOrganization() {
  yield* takeEvery(ORGANIZATIONS.RENEW_ORGANIZATION, renewOrganization);
}

function* watchRequestFetchSuspendedOrganizations() {
  yield* takeEvery(ORGANIZATIONS.FETCH_SUSPENDED_ORGANIZATIONS, fetchSuspendedOrganizations);
}

function* watchRequestArchive() {
  yield* takeEvery(ARCHIVE.ARCHIVE_SUCCESS, fetchOrganizations);
}


// function* watchRequestAddOrganizationUser() {
//   yield* takeEvery(ORGANIZATIONS.ADD_ORGANIZATION_USER, addOrganizationUser);
// }
export default function* organizations() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchOrganization),
    fork(watchRequestFetchCurrentOrganization),
    fork(watchRequestAddOrganization),
    fork(watchRequestFetchOrganizationToUserSide),
    fork(watchRequestRenewOrganization),
    fork(watchRequestFetchSuspendedOrganizations),
    fork(watchRequestArchive)
  ];
}
