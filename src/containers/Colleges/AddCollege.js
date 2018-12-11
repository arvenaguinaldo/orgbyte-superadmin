import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {createStructuredSelector} from 'reselect';

import {Field, reduxForm} from 'redux-form';
import {validate} from 'utils/Validations/AddCollege';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import {addCollege} from 'redux/actions/colleges';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {makeSelectCollegesMeta} from 'redux/selectors/colleges';

import SubmitButton from 'components/SubmitButton/SubmitButton';


class AddCollege extends React.Component {
  static propTypes = {
    meta: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func
  };

  state = {
    open: true
  };

  onSubmit = (values, dispatch) => {
    dispatch(addCollege(values, () => {
      this.props.handleClose();
    }));
  };

  render() {

    const {meta} = this.props;

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types

    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <DialogTitle id="form-dialog-title" disableTypography><Typography component="h3" variant="h4">Add College</Typography></DialogTitle>
            <DialogContent>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>

                  <Grid container spacing={32}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        name="name"
                        component={renderTextField}
                        label="College Name"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        name="college_code"
                        component={renderTextField}
                        label="College Code"
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                CANCEL
              </Button>
              <SubmitButton
                loading={meta.isSubmitLoading}
                valid={!valid}
              >
                SUBMIT
              </SubmitButton>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectCollegesMeta()
});

const withRedux = connect(mapStateToProps, {addCollege});

export default compose(
  withRedux,
  reduxForm({
    form: 'AddCollegeForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
  })
)(AddCollege);
