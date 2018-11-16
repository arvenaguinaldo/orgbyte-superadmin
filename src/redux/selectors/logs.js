import {createSelector} from 'reselect';

export const selectLogs = state => state.logs;

export const makeSelectLogs = () => createSelector(
  selectLogs,
  logs => logs.toJS()
);

export const makeSelectLogsList = () => createSelector(
  makeSelectLogs(),
  logs => logs.list
);

export const makeSelectLogsMeta = () => createSelector(
  makeSelectLogs(),
  logs => logs.meta
);
