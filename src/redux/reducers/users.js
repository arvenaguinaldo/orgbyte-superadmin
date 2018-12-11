import {USERS} from 'constants/actions/users';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  presidents: [],
  officers: [],
  members: [],
  isVerified: false,
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

    case USERS.ADD_USER: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case USERS.ADD_USER_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        officers: data,
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case USERS.VERIFY_MEMBER: {
      return state.mergeIn(['meta'], fromJS({
        isVerifyMemberLoading: true
      }));
    }
    case USERS.VERIFY_MEMBER_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        verifyMember: data,
        isVerified: !action.response.data.error,
        meta: {
          loading: false
        }
      }));
    }

    case USERS.CLEAR_VERIFY_MEMBER: {
      return state.merge(fromJS({
        verifyMember: null,
        meta: {
          loading: false
        }
      }));
    }

    case USERS.ADD_MEMBERS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case USERS.ADD_MEMBERS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        members: data,
        meta: {
          loading: false
        }
      }));
    }

    case USERS.CHANGE_PASSWORD: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case USERS.CHANGE_PASSWORD_SUCCESS: {
      return state.merge(fromJS({
        meta: {
          loading: false
        }
      }));
    }

    case USERS.FETCH_OFFICERS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case USERS.FETCH_OFFICERS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        officers: data,
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
