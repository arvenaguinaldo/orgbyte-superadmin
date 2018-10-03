import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as shirtsActions from 'redux/actions/shirts';
import * as shirtsService from 'services/api/shirts';
import {SHIRTS} from 'constants/actions/shirts';
import {callErrorNotification} from './notification';

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

function* verifyMember(action) {
  const response = yield call(shirtsService.verifyMember, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(shirtsActions.verifyMemberSuccess(response));
    } else {
      yield put(shirtsActions.verifyMemberSuccess(response));
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
      yield put(shirtsActions.purchaseShirtSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(SHIRTS.FETCH_SHIRT, fetchShirt);
}

function* watchRequestVerifyMember() {
  yield* takeEvery(SHIRTS.VERIFY_MEMBER, verifyMember);
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

export default function* shirts() {
  yield [
    fork(watchRequest),
    fork(watchRequestVerifyMember),
    fork(watchRequestAddOrgShirt),
    fork(watchRequestfetchSizes),
    fork(watchRequestPurchaseShirt)
  ];
}
