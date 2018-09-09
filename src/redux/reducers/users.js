import {USERS} from 'constants/actions/users';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  presidents: [],
  meta: {
    loading: false
  }
});

const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS.FETCH_USERS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case USERS.FETCH_USERS_SUCCESS: {
      const {data} = action.response;
      return initialState.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case USERS.FETCH_PRESIDENTS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case USERS.FETCH_PRESIDENTS_SUCCESS: {
      const {data} = action.response;
      return initialState.merge(fromJS({
        presidents: data,
        meta: {
          loading: false
        }
      }));
    }
    default:
      return state;
  }
};

export default users;
