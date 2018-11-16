import {LOGS} from 'constants/actions/logs';

export const fetchLogs = params => ({
  type: LOGS.FETCH_LOGS,
  params
});

export const fetchLogsSuccess = response => ({
  type: LOGS.FETCH_LOGS_SUCCESS,
  response
});
