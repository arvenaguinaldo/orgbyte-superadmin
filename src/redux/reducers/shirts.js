import {SHIRTS} from 'constants/actions/shirts';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  shirt: {},
  sizes: [],
  isVerified: false,
  orgshirt: '',
  purchaseShirt: '',
  fetchPurchaseShirts: [],
  meta: {
    loading: false
  }
});

const shirts = (state = initialState, action) => {
  switch (action.type) {
    case SHIRTS.FETCH_SHIRT: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SHIRTS.FETCH_SHIRT_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        shirt: data,
        meta: {
          loading: false
        }
      }));
    }

    case SHIRTS.VERIFY_MEMBER: {
      return state.mergeIn(['meta'], fromJS({
        isVerifyMemberLoading: true
      }));
    }
    case SHIRTS.VERIFY_MEMBER_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        verifyMember: data,
        isVerified: !action.response.data.error,
        meta: {
          loading: false
        }
      }));
    }

    case SHIRTS.ADD_ORGSHIRT: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SHIRTS.ADD_ORGSHIRT_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        orgshirt: data,
        meta: {
          loading: false
        }
      }));
    }

    case SHIRTS.FETCH_SIZES: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SHIRTS.FETCH_SIZES_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        sizes: data,
        meta: {
          loading: false
        }
      }));
    }

    case SHIRTS.PURCHASE_SHIRT: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SHIRTS.PURCHASE_SHIRT_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        purchaseShirt: data,
        meta: {
          loading: false
        }
      }));
    }

    case SHIRTS.FETCH_PURCHASE_SHIRTS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SHIRTS.FETCH_PURCHASE_SHIRTS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        fetchPurchaseShirts: data,
        meta: {
          loading: false
        }
      }));
    }

    default:
      return state;
  }
};

export default shirts;
