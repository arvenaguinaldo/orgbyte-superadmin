import {AUTH} from 'constants/actions/auth';
import {fromJS} from 'immutable';
import isEmpty from 'lodash/isEmpty';

const initialState = fromJS({
  login: {},
  user: {},
  colorTheme: '#5C181D',
  // logout: false,
  isAuthenticated: false,
  meta: {
    loading: false
  }
});

const login = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case AUTH.LOGOUT: {
      return initialState.merge(fromJS({
        isAuthenticated: !isEmpty(action.response),
        user: action.response
      }));
    }
    case AUTH.SET_CURRENT_USER: {
      return initialState.merge(fromJS({
        isAuthenticated: !isEmpty(action.response),
        user: action.response
      }));
    }
    case AUTH.LOGIN_SUCCESS: {
      const {data} = action.response;
      return initialState.merge(fromJS({
        login: data,
        meta: {
          loading: false
        }
      }));
    }
    case AUTH.SET_COLOR_THEME: {
      return state.merge(fromJS({
        colorTheme: action.response
      }));
    }
    default:
      return state;
  }
};

export default login;
