import {EVENTS} from 'constants/actions/events';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  meta: {
    loading: false
  }
});

const events = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS.FETCH_EVENTS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case EVENTS.FETCH_EVENTS_SUCCESS: {
      const {data} = action.response;
      return initialState.merge(fromJS({
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

export default events;
