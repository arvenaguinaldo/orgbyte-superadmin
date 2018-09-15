import {SHIRTS} from 'constants/actions/shirts';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  isVerified: false,
  meta: {
    loading: false
  }
});

const shirts = (state = initialState, action) => {
  switch (action.type) {
    case SHIRTS.FETCH_SHIRTS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SHIRTS.FETCH_SHIRTS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case SHIRTS.VERIFY_MEMBER: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SHIRTS.VERIFY_MEMBER_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        verifyMember: data,
        isVerified: true,
        meta: {
          loading: true
        }
      }));
    }
    default:
      return state;
  }
};

export default shirts;
