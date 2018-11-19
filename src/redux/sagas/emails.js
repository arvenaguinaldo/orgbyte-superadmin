import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as emailsActions from 'redux/actions/emails';
import * as emailsService from 'services/api/emails';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {EMAILS} from 'constants/actions/emails';
import {callErrorNotification, callInfoNotification, callSuccessNotification} from './notification';

//* *********** Subroutines ************//

function* fetchEmails(action) {
  const response = yield call(emailsService.fetchEmails, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(emailsActions.fetchEmailsSuccess(response));
    }
  }
}

function* fetchEmail(action) {
  const response = yield call(emailsService.fetchEmail, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(emailsActions.fetchEmailSuccess(response));
    }
  }
}

function* createEmail(action) {
  yield call(callInfoNotification, 'This will take a minute...');
  const response = yield call(emailsService.createEmail, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(emailsActions.createEmailSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Email Sent Successfully');
      yield put(emailsActions.createEmailSuccess(response.data));
      yield put(reset('EmailForm'));
      yield put(push('/admin/email'));
    }
  }
}

function* sendCertificate(action) {
  yield call(callInfoNotification, 'This will take a minute...');
  const response = yield call(emailsService.sendCertificate, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(emailsActions.sendCertificateSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Certificates sent successfully.');
      yield put(emailsActions.sendCertificateSuccess(response.data));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(EMAILS.FETCH_EMAILS, fetchEmails);
}

function* watchRequestFetchEmail() {
  yield* takeEvery(EMAILS.FETCH_EMAIL, fetchEmail);
}

function* watchRequestCreateEmail() {
  yield* takeEvery(EMAILS.CREATE_EMAIL, createEmail);
}

function* watchRequestSendCertificate() {
  yield* takeEvery(EMAILS.SEND_CERTIFICATE, sendCertificate);
}

export default function* emails() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchEmail),
    fork(watchRequestCreateEmail),
    fork(watchRequestSendCertificate)
  ];
}
