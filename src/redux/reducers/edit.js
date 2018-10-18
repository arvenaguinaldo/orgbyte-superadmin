import {EDIT} from 'constants/actions/edit';
import {fromJS} from 'immutable';

const initialState = fromJS({
  formValues: {},
  open: false,
  editFrom: '',
  meta: {
    loading: false
  }
});

const edit = (state = initialState, action) => {
  switch (action.type) {
    case EDIT.FETCH_EDIT: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case EDIT.FETCH_EDIT_SUCCESS: {
      return state.merge(fromJS({
        formValues: action.response.response.data,
        editFrom: action.response.table,
        open: true,
        meta: {
          loading: false
        }
      }));
    }

    case EDIT.SAVE_EDIT: {
      return state.mergeIn(['meta'], fromJS({
        isLoading: true
      }));
    }

    case EDIT.SAVE_EDIT_SUCCESS: {
      // return state.merge(fromJS({
      //   open: false,
      //   meta: {
      //     loading: false
      //   }
      // }));
      return initialState;
    }

    case EDIT.EDIT_MODAL_CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default edit;
