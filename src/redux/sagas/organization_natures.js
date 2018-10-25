import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as organizationNaturesActions from 'redux/actions/organization_natures';
import * as organizationNaturesService from 'services/api/organization_natures';
import {ORGANIZATION_NATURES} from 'constants/actions/organization_natures';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* fetchOrganizationNatures(action) {
  const response = yield call(organizationNaturesService.fetchOrganizationNatures, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(organizationNaturesActions.fetchOrganizationNaturesSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(ORGANIZATION_NATURES.FETCH_ORGANIZATION_NATURES, fetchOrganizationNatures);
}

export default function* organizationNatures() {
  yield [
    fork(watchRequest)
  ];
}
