import {COURSES} from 'constants/actions/courses';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  meta: {
    loading: false
  }
});

const courses = (state = initialState, action) => {
  switch (action.type) {
    case COURSES.FETCH_COURSES: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case COURSES.FETCH_COURSES_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    default:
      return state;
  }
};

export default courses;
