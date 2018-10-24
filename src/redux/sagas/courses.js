import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import * as coursesActions from 'redux/actions/courses';
import * as coursesService from 'services/api/courses';
import {COURSES} from 'constants/actions/courses';
import {callErrorNotification} from './notification';

//* *********** Subroutines ************//

function* fetchCourses(action) {
  const response = yield call(coursesService.fetchCourses, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      yield put(coursesActions.fetchCoursesSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(COURSES.FETCH_COURSES, fetchCourses);
}

export default function* courses() {
  yield [
    fork(watchRequest)
  ];
}
