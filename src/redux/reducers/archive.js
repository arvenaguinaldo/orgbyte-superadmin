import {ARCHIVE} from 'constants/actions/archive';
import {fromJS} from 'immutable';

const initialState = fromJS({
  archives: [],
  meta: {
    loading: false
  }
});

const archive = (state = initialState, action) => {
  switch (action.type) {
    case ARCHIVE.FETCH_ARCHIVES: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case ARCHIVE.FETCH_ARCHIVES_SUCCESS: {
      const {data} = action.response;
      return state.merge(fromJS({
        archives: data,
        meta: {
          loading: false
        }
      }));
    }

    case ARCHIVE.ARCHIVE: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case ARCHIVE.ARCHIVE_SUCCESS: {
      // return state.merge(fromJS({
      //   open: false,
      //   meta: {
      //     loading: false
      //   }
      // }));
      return initialState;
    }

    default:
      return state;
  }
};

export default archive;
