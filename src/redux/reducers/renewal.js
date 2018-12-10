import {RENEWAL} from 'constants/actions/renewal';
import {fromJS} from 'immutable';

const initialState = fromJS({
  date: [],
  meta: {
    loading: false
  }
});

const renewal = (state = initialState, action) => {
  switch (action.type) {
    case RENEWAL.SET_RENEWAL: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case RENEWAL.SET_RENEWAL_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        date: data,
        meta: {
          loading: false
        }
      }));
    }

    case RENEWAL.GET_RENEWAL: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case RENEWAL.GET_RENEWAL_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        date: data,
        meta: {
          loading: false
        }
      }));
    }

    default:
      return state;
  }
};

export default renewal;
