import {fork} from 'redux-saga/effects';

import events from './events';
import auth from './auth';

export default function* root() {
  yield [
    fork(events),
    fork(auth)
  ];
}
