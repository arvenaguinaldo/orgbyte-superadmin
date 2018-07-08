import {fork} from 'redux-saga/effects';

import events from './events';

export default function* root() {
  yield [
    fork(events)
  ];
}
