import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as smssActions from 'redux/actions/sms';
import * as smssService from 'services/api/sms';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {SMSS} from 'constants/actions/sms';
import {ARCHIVE} from 'constants/actions/archive';
import {callErrorNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchSmss(action) {
  const response = yield call(smssService.fetchSmss, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(smssActions.fetchSmssSuccess(response));
    }
  }
}

function* fetchSms(action) {
  const response = yield call(smssService.fetchSms, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(smssActions.fetchSmsSuccess(response));
    }
  }
}

function* createSms(action) {
  const response = yield call(smssService.createSms, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(smssActions.createSmsSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Sms Sent Successfully');
      yield put(smssActions.createSmsSuccess(response.data));
      yield put(reset('SmsForm'));
      yield put(push('/admin/sms'));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(SMSS.FETCH_SMSS, fetchSmss);
}

function* watchRequestFetchSms() {
  yield* takeEvery(SMSS.FETCH_SMS, fetchSms);
}

function* watchRequestCreateSms() {
  yield* takeEvery(SMSS.CREATE_SMS, createSms);
}

function* watchRequestArchive() {
  yield* takeEvery(ARCHIVE.ARCHIVE_SUCCESS, fetchSmss);
}

export default function* smss() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchSms),
    fork(watchRequestCreateSms),
    fork(watchRequestArchive)
  ];
}
