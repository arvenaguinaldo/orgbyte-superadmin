import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as emailsActions from 'redux/actions/emails';
import * as emailsService from 'services/api/emails';
import {reset} from 'redux-form';
import {push} from 'react-router-redux';
import {EMAILS} from 'constants/actions/emails';
import {callErrorNotification, callSuccessNotification} from './notification';

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
  const response = yield call(emailsService.createEmail, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(emailsActions.createEmailSuccess(response));
    } else {
      yield call(callSuccessNotification, 'Email Send Successfully');
      yield put(emailsActions.createEmailSuccess(response.data));
      yield put(reset('EmailsForm'));
      yield put(push('/admin/email'));
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


export default function* emails() {
  yield [
    fork(watchRequest),
    fork(watchRequestFetchEmail),
    fork(watchRequestCreateEmail)
  ];
}
