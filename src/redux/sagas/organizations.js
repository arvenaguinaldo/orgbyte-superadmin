import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as organizationsActions from 'redux/actions/organizations';
import * as organizationsService from 'services/api/organizations';
import {push} from 'react-router-redux';
import {ORGANIZATIONS} from 'constants/actions/organizations';
import {callErrorNotification} from './notification';

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

function* addOrganization(action) {
  const response = yield call(organizationsService.addOrganization, action.params);
  if (response) {
    console.log(action.params);
    if (response.error) {
      yield call(callErrorNotification, `Could not add data: ${response.error}`);
    } else {

      const userResponse = yield call(organizationsService.addOrganizationUser, action.params);
      if (userResponse) {
        console.log(action.params);
        if (userResponse.error) {
          yield call(callErrorNotification, `Could not add data: ${userResponse.error}`);
        } else {
          const params = {organizations_id: response.data.id, user_id: userResponse.data.id};
          yield put(organizationsActions.addOrganizationUser(params));
        }
      }

    }
  }
}

function* addOrganizationUser(action) {
  const response = yield call(organizationsService.addUser, action.params);
  if (response) {
    console.log(action.params);
    if (response.error) {
      yield call(callErrorNotification, `Could not add data: ${response.error}`);
    } else {
      yield put(push('/addorganization'));
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

function* watchRequestAddOrganization() {
  yield* takeEvery(ORGANIZATIONS.ADD_ORGANIZATION, addOrganization);
}


function* watchRequestAddOrganizationUser() {
  yield* takeEvery(ORGANIZATIONS.ADD_ORGANIZATION_USER, addOrganizationUser);
}
export default function* organizations() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchOrganization),
    fork(watchRequestAddOrganization),
    fork(watchRequestAddOrganizationUser)
  ];
}
