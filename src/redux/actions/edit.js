import {EDIT} from 'constants/actions/edit';

export const fetchEdit = params => ({
  type: EDIT.FETCH_EDIT,
  params
});

export const fetchEditSuccess = response => ({
  type: EDIT.FETCH_EDIT_SUCCESS,
  response
});

export const saveEdit = params => ({
  type: EDIT.SAVE_EDIT,
  params
});

export const saveEditSuccess = response => ({
  type: EDIT.SAVE_EDIT_SUCCESS,
  response
});

export const editModalClose = () => ({
  type: EDIT.EDIT_MODAL_CLOSE
});
