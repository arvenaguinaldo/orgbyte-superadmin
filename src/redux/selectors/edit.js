import {createSelector} from 'reselect';

const selectEdit = state => state.edit;

const makeSelectEdit = () => createSelector(
  selectEdit,
  edit => edit.toJS()
);

export {
  selectEdit,
  makeSelectEdit
};
