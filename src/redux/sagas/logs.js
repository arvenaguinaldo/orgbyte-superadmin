import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as logsActions from 'redux/actions/logs';
import * as logsService from 'services/api/logs';
import {LOGS} from 'constants/actions/logs';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* fetchLogs(action) {
  const response = yield call(logsService.fetchLogs, action.params);
  if (response) {
    if (response.data.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.data.error}`);
    } else {
      yield put(logsActions.fetchLogsSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(LOGS.FETCH_LOGS, fetchLogs);
}

export default function* logs() {
  yield [
    fork(watchRequest)
  ];
}
