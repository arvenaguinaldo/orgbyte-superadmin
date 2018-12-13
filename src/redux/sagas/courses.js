import {takeEvery} from 'redux-saga';
import {put, call, fork} from 'redux-saga/effects';
import {reset} from 'redux-form';
import * as coursesActions from 'redux/actions/courses';
import * as coursesService from 'services/api/courses';
import {COURSES} from 'constants/actions/courses';
import {EDIT} from 'constants/actions/edit';
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

function* addCourse(action) {
  const response = yield call(coursesService.addCourse, action.params);
  if (response) {
    if (response.error) {
      yield call(callErrorNotification, `Could not fetch data: ${response.error}`);
    } else {
      action.callback();
      yield put(reset('AddCourseForm'));
      yield put(coursesActions.addCourseSuccess(response));
    }
  }
}

//* *********** Watchers ************//

function* watchRequest() {
  yield* takeEvery(COURSES.FETCH_COURSES, fetchCourses);
}

function* watchRequestAddCourse() {
  yield* takeEvery(COURSES.ADD_COURSE, addCourse);
}

function* watchRequestSaveEdit() {
  yield* takeEvery(EDIT.SAVE_EDIT_SUCCESS, fetchCourses);
}

export default function* courses() {
  yield [
    fork(watchRequest),
    fork(watchRequestAddCourse),
    fork(watchRequestSaveEdit)
  ];
}
