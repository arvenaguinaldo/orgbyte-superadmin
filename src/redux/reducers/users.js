import {USERS} from 'constants/actions/users';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  presidents: [],
  members: [],
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
      return state.merge(fromJS({
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
      return state.merge(fromJS({
        presidents: data,
        meta: {
          loading: false
        }
      }));
    }

    case USERS.ADD_MEMBER: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case USERS.ADD_MEMBER_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        members: data,
        meta: {
          loading: false
        }
      }));
    }

    case USERS.FETCH_MEMBERS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case USERS.FETCH_MEMBERS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        members: data,
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
