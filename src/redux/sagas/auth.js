import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as authActions from 'redux/actions/auth';
import * as orgActions from 'redux/actions/organizations';
import * as authService from 'services/api/auth';
import * as authenticate from 'utils/AuthService';
import * as themeService from 'utils/ThemeService';
import {push} from 'react-router-redux';
import jwt from 'jsonwebtoken';
import {AUTH} from 'constants/actions/auth';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* login(action) {
  const response = yield call(authService.login, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, response.data.error);
      yield put(authActions.loginSuccess(response));
    } else {
      yield put(authActions.loginSuccess(response));
      authenticate.authenticateToken(response.data.user.token);
      yield put(authActions.setCurrentUser(jwt.decode(response.data.user.token)));

      if (response.data.organization) {
        yield put(authActions.setColorTheme(response.data.organization.color_theme));
        themeService.setThemeColor(response.data.organization.color_theme);
      }

      const loginData = jwt.decode(response.data.user.token);

      const user = yield call(authService.getUser, loginData.sub);

      yield put(orgActions.fetchCurrentOrganization());

      if (loginData.user_type_id === 'admin' || loginData.user_type_id === 'sub_admin') {
        if (user.data.sign_in_count === 0) {
          yield put(push('/admin/passwordreset'));
        } else {
          yield put(push('/admin/'));
        }
      }

      if (loginData.user_type_id === 'super_admin') {
        yield put(push('/superadmin/'));
      }
    }
  }
}

function* logout() {
  themeService.removeThemeColor();
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
