import {ORGANIZATIONS} from 'constants/actions/organizations';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  currentOrg: [],
  meta: {
    loading: false
  }
});

const organizations = (state = initialState, action) => {
  switch (action.type) {
    case ORGANIZATIONS.FETCH_ORGANIZATIONS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ORGANIZATIONS.FETCH_ORGANIZATIONS_SUCCESS: {
      const {data} = action.response;
      return initialState.merge(fromJS({
        list: data,
        currentOrg: data,
        meta: {
          loading: false
        }
      }));
    }
    case ORGANIZATIONS.ADD_ORGANIZATION: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ORGANIZATIONS.ADD_ORGANIZATION_SUCCESS: {
      const {data} = action.response;
      return initialState.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case ORGANIZATIONS.ADD_ORGANIZATION_USER: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ORGANIZATIONS.ADD_ORGANIZATION_USER_SUCCESS: {
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

export default organizations;
