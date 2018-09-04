import {fork} from 'redux-saga/effects';

import events from './events';
import auth from './auth';
import organizations from './organizations';

export default function* root() {
  yield [
    fork(events),
    fork(auth),
    fork(organizations)
  ];
}
