import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as renewalActions from 'redux/actions/renewal';
import * as renewalService from 'services/api/renewal';
import {RENEWAL} from 'constants/actions/renewal';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* setRenewal(action) {
  const response = yield call(renewalService.setRenewal, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
    } else {
      yield call(callSuccessNotification, 'Renewal dates set Successfully');
      yield put(renewalActions.setRenewalSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(RENEWAL.SET_RENEWAL, setRenewal);
}

export default function* renewal() {
  yield [
    fork(watchRequest)
  ];
}
