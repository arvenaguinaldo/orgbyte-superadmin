import {ORGANIZATIONS} from 'constants/actions/organizations';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  currentOrg: {},
  selectedOrg: {},
  organization_user_side: {},
  meta: {
    open: false,
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
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }
    case ORGANIZATIONS.FETCH_ORGANIZATION: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ORGANIZATIONS.FETCH_ORGANIZATION_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        selectedOrg: data,
        meta: {
          open: true,
          loading: false
        }
      }));
    }
    case ORGANIZATIONS.FETCH_CURRENT_ORGANIZATION: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ORGANIZATIONS.FETCH_CURRENT_ORGANIZATION_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
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
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }
    case ORGANIZATIONS.FETCH_ORGANIZATION_TO_USER_SIDE: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ORGANIZATIONS.FETCH_ORGANIZATION_TO_USER_SIDE_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        organization_user_side: data,
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
