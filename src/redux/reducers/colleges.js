import {COLLEGES} from 'constants/actions/colleges';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  meta: {
    loading: false
  }
});

const colleges = (state = initialState, action) => {
  switch (action.type) {
    case COLLEGES.FETCH_COLLEGES: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case COLLEGES.FETCH_COLLEGES_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case COLLEGES.ADD_COLLEGE: {
      return state.mergeIn(['meta'], fromJS({
        isSubmitLoading: true
      }));
    }
    case COLLEGES.ADD_COLLEGE_SUCCESS: {
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

export default colleges;
