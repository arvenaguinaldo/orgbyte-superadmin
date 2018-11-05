import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as authActions from 'redux/actions/auth';
import * as orgActions from 'redux/actions/organizations';
import * as authService from 'services/api/auth';
import * as authenticate from 'utils/AuthService';
import * as theme from 'utils/ThemeService';
import {push} from 'react-router-redux';
import jwt from 'jsonwebtoken';
import {AUTH} from 'constants/actions/auth';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* login(action) {
  const response = yield call(authService.login, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(authActions.loginSuccess(response));
      authenticate.authenticateToken(response.data.token);
      yield put(authActions.setCurrentUser(jwt.decode(response.data.token)));
      const loginData = jwt.decode(response.data.token);

      yield put(orgActions.fetchCurrentOrganization());

      if (loginData.user_type_id === 'admin') {
        yield put(push('/admin/'));
      }

      if (loginData.user_type_id === 'super_admin') {
        yield put(push('/superadmin/'));
        theme.setThemeColor('#5C181D');
      }
    }
  }
}

function* logout() {
  theme.removeThemeColor();
  authenticate.deauthenticateUser();
  yield put(authActions.setCurrentUser({}));
  // yield put(orgActions.fetchCurrentOrganization());
  yield put(push('/login'));
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(AUTH.LOGIN, login);
}

function* watchRequestLogout() {
  yield* takeEvery(AUTH.LOGOUT, logout);
}

export default function* auth() {
  yield [
    fork(watchRequest),
    fork(watchRequestLogout)
  ];
}
