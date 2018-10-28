import {fork} from 'redux-saga/effects';

import events from './events';
import auth from './auth';
import organizations from './organizations';
import users from './users';
import shirts from './shirts';
import edit from './edit';
import courses from './courses';
import colleges from './colleges';
import organizationNatures from './organization_natures';

export default function* root() {
  yield [
    fork(events),
    fork(auth),
    fork(organizations),
    fork(users),
    fork(shirts),
    fork(edit),
    fork(courses),
    fork(colleges),
    fork(organizationNatures)
  ];
}
