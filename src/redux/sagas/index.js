import {fork} from 'redux-saga/effects';

import events from './events';
import auth from './auth';
import organizations from './organizations';
import users from './users';

export default function* root() {
  yield [
    fork(events),
    fork(auth),
    fork(organizations),
    fork(users)
  ];
}
