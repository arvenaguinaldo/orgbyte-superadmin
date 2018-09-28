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

class EditModal extends React.Component {
  static propTypes = {
    edit: PropTypes.object.isRequired,
    editModalClose: PropTypes.func.isRequired,
    save: PropTypes.func
  };

  render() {
    const {edit} = this.props;

    if (!edit.open || edit.editFrom !== 'users') {
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
          <DialogTitle id="form-dialog-title" disableTypography><Typography component="h3" variant="display1">Edit</Typography></DialogTitle>
          <DialogContent>
            hahahaha
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.editModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.save} variant="raised" color="primary">
              Save
            </Button>
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
  editModalClose
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
