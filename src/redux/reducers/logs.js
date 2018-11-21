import {LOGS} from 'constants/actions/logs';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  meta: {
    loading: false
  }
});

const logs = (state = initialState, action) => {
  switch (action.type) {
    case LOGS.FETCH_LOGS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case LOGS.FETCH_LOGS_SUCCESS: {
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

export default logs;
