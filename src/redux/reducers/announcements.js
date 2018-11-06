import {ANNOUNCEMENTS} from 'constants/actions/announcements';
import {fromJS} from 'immutable';

const initialState = fromJS({
  list: [],
  announcement: {},
  meta: {
    loading: false
  }
});

const announcements = (state = initialState, action) => {
  switch (action.type) {
    case ANNOUNCEMENTS.FETCH_ANNOUNCEMENTS: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ANNOUNCEMENTS.FETCH_ANNOUNCEMENTS_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        list: data,
        meta: {
          loading: false
        }
      }));
    }

    case ANNOUNCEMENTS.FETCH_ANNOUNCEMENT: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ANNOUNCEMENTS.FETCH_ANNOUNCEMENT_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        announcement: data,
        meta: {
          loading: false
        }
      }));
    }

    case ANNOUNCEMENTS.CREATE_ANNOUNCEMENT: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }
    case ANNOUNCEMENTS.CREATE_ANNOUNCEMENT_SUCCESS: {
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

export default announcements;
