import {ORGANIZATION_NATURES} from 'constants/actions/organization_natures';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  meta: {
    loading: false
  }
});

const organizationNatures = (state = initialState, action) => {
  switch (action.type) {
    case ORGANIZATION_NATURES.FETCH_ORGANIZATION_NATURES: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ORGANIZATION_NATURES.FETCH_ORGANIZATION_NATURES_SUCCESS: {
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

export default organizationNatures;
