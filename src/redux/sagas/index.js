import {fork} from 'redux-saga/effects';

import events from './events';
import users from './users';

export default function* root() {
  yield [
    fork(events),
    fork(users)
  ];
}
