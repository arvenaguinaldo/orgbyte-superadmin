import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as shirtsActions from 'redux/actions/shirts';
import * as shirtsService from 'services/api/shirts';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {SHIRTS} from 'constants/actions/shirts';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchShirt(action) {
  const response = yield call(shirtsService.fetchShirt, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(shirtsActions.fetchShirtSuccess(response));
    }
  }
}

function* addOrgShirt(action) {
  const responseSizes = yield call(shirtsService.addOrgShirtSizes, action.params);

  if (responseSizes) {
    if (responseSizes.error) {
      yield call(callErrorNotification, `Could not fetch data: ${responseSizes.error}`);
    } else {

      const responseShirt = yield call(shirtsService.addOrgShirt, action.params);

      if (responseShirt) {
        if (responseShirt.error) {
          yield call(callErrorNotification, `Could not fetch data: ${responseShirt.error}`);
        } else {
          const params = {shirt_sizes_id: responseSizes.data.id, shirt_id: responseShirt.data.id};
          yield call(shirtsService.addOrgShirtSizestoShirt, params);
          yield put(shirtsActions.addOrgShirtSuccess(responseShirt));
        }
      }
    }
  }
}

function* fetchSizes(action) {
  const response = yield call(shirtsService.fetchSizes, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(shirtsActions.fetchSizesSuccess(response));
    }
  }
}

function* purchaseShirt(action) {
  const response = yield call(shirtsService.purchaseShirt, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(shirtsActions.purchaseShirtSuccess(response.data));
      yield call(callSuccessNotification, 'Purchased Successfully');
      yield put(reset('IndividualPurchaseForm'));
      yield put(reset('VerifyMemberForm'));
      yield put(push('/shirts'));
    }
  }
}

function* fetchPurchaseShirts(action) {
  const response = yield call(shirtsService.fetchPurchaseShirts, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(shirtsActions.fetchPurchaseShirtsSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(SHIRTS.FETCH_SHIRT, fetchShirt);
}

function* watchRequestAddOrgShirt() {
  yield* takeEvery(SHIRTS.ADD_ORGSHIRT, addOrgShirt);
}

function* watchRequestfetchSizes() {
  yield* takeEvery(SHIRTS.FETCH_SIZES, fetchSizes);
}

function* watchRequestPurchaseShirt() {
  yield* takeEvery(SHIRTS.PURCHASE_SHIRT, purchaseShirt);
}

function* watchRequestFetchPurchaseShirts() {
  yield* takeEvery(SHIRTS.FETCH_PURCHASE_SHIRTS, fetchPurchaseShirts);
}

export default function* shirts() {
  yield [
    fork(watchRequest),
    fork(watchRequestAddOrgShirt),
    fork(watchRequestfetchSizes),
    fork(watchRequestPurchaseShirt),
    fork(watchRequestFetchPurchaseShirts)
  ];
}
