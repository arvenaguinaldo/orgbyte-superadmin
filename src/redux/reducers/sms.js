import {SMSS} from 'constants/actions/sms';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  sms: {},
  meta: {
    loading: false
  }
});

const sms = (state = initialState, action) => {
  switch (action.type) {
    case SMSS.FETCH_SMSS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SMSS.FETCH_SMSS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case SMSS.FETCH_SMS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SMSS.FETCH_SMS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        sms: data,
        meta: {
          loading: false
        }
      }));
    }

    case SMSS.CREATE_SMS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case SMSS.CREATE_SMS_SUCCESS: {
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

export default sms;
