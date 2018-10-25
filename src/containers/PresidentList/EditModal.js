import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {editModalClose} from 'redux/actions/edit';
import {createStructuredSelector} from 'reselect';
import {makeSelectEdit} from 'redux/selectors/edit';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import RemoteSubmitButton from 'containers/RemoteSubmitButton/RemoteSubmitButton';

import {saveEdit} from 'redux/actions/edit';

import EditForm from './EditForm';

class EditModal extends React.Component {
  static propTypes = {
    edit: PropTypes.object.isRequired,
    editModalClose: PropTypes.func.isRequired
  };

  state = {
    dbTable: 'users'
  };

  handleSubmit = (values, dispatch) => {
    const {dbTable} = this.state;
    const {edit} = this.props;
    console.log(edit.formValues.id);
    dispatch(saveEdit({table: dbTable, id: edit.formValues.id, values}));
  }

  render() {
    const {dbTable} = this.state;
    const {edit} = this.props;

    if (!edit.open || edit.editFrom !== dbTable) {
      return null;
    }

    return (
      <div>
        <Dialog
          open
          onClose={this.props.editModalClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title" disableTypography><Typography component="h3" variant="h4">Edit</Typography></DialogTitle>
          <DialogContent>
            <EditForm initialValues={edit.formValues} onSubmit={this.handleSubmit} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.editModalClose} color="primary">
              CANCEL
            </Button>
            <RemoteSubmitButton
              loading={edit.meta.isLoading}
              submitForm={'EditForm'}
            >
              SAVE
            </RemoteSubmitButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  edit: makeSelectEdit()
});

const mapDispatchToProps = {
  editModalClose,
  saveEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
