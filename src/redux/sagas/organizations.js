import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as organizationsActions from 'redux/actions/organizations';
import * as organizationsService from 'services/api/organizations';
import {startSubmit, stopSubmit} from 'redux-form';
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

function* addOrganization(action) {
  yield put(startSubmit('AddOrganizationForm'));
  let errors = {};
  const response = yield call(organizationsService.addOrganization, action.params);
  if (response) {
    console.log(action.params);
    console.log('response' + response);
    if (response.error) {
      yield call(callErrorNotification, `Could not add data: ${response.error}`);
      errors = response.error;
    } else {
      yield put(organizationsActions.addOrganizationSuccess(response));
      const userResponse = yield call(organizationsService.addUsers, action.params);
      if (userResponse) {
        console.log(action.params);
        console.log('response' + userResponse);
        if (userResponse.error) {
          yield call(callErrorNotification, `Could not add data: ${userResponse.error}`);
          errors = userResponse.error;
        } else {
          yield put(organizationsActions.addOrganizationSuccess(userResponse));
          yield push('/addorganization');
        }
      }
    }
  }
  yield put(stopSubmit('AddOrganizationForm', errors));
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(ORGANIZATIONS.FETCH_ORGANIZATIONS, fetchOrganizations);
}

function* watchRequestAddOrganization() {
  yield* takeEvery(ORGANIZATIONS.ADD_ORGANIZATION, addOrganization);
}

export default function* organizations() {
  yield [
    fork(watchRequest),
    fork(watchRequestAddOrganization)
  ];
}
