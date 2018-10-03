import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as editActions from 'redux/actions/edit';
import * as editService from 'services/api/edit';
import {reset} from 'redux-form';
import {EDIT} from 'constants/actions/edit';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchEdit(action) {
  const response = yield call(editService.fetchEdit, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(reset('EditForm'));
      const successResponse = {table: action.params.table, response};
      yield put(editActions.fetchEditSuccess(successResponse));
    }
  }
}

function* saveEdit(action) {
  const response = yield call(editService.saveEdit, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      const successResponse = {table: action.params.table, response};
      yield call(callSuccessNotification, 'Updated Successfully');
      yield put(reset('EditForm'));
      yield put(editActions.saveEditSuccess(successResponse));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(EDIT.FETCH_EDIT, fetchEdit);
}

function* watchRequestSaveEdit() {
  yield* takeEvery(EDIT.SAVE_EDIT, saveEdit);
}

export default function* edit() {
  yield [
    fork(watchRequest),
    fork(watchRequestSaveEdit)
  ];
}
