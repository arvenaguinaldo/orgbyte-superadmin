import {EMAILS} from 'constants/actions/emails';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  email: {},
  meta: {
    loading: false
  }
});

const emails = (state = initialState, action) => {
  switch (action.type) {
    case EMAILS.FETCH_EMAILS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case EMAILS.FETCH_EMAILS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case EMAILS.FETCH_EMAIL: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case EMAILS.FETCH_EMAIL_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        email: data,
        meta: {
          loading: false
        }
      }));
    }

    case EMAILS.CREATE_EMAIL: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case EMAILS.CREATE_EMAIL_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case EMAILS.SEND_CERTIFICATE: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case EMAILS.SEND_CERTIFICATE_SUCCESS: {
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

export default emails;
