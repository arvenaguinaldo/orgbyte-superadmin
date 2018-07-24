import {USERS} from 'constants/actions/users';
import {fromJS} from 'immutable';

const initialState = fromJS({
  users: {},
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
        users: data,
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
