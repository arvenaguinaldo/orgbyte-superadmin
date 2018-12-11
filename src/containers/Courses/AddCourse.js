import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {createStructuredSelector} from 'reselect';

import {Field, reduxForm} from 'redux-form';
import {validate} from 'utils/Validations/AddCourse';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import {addCourse} from 'redux/actions/courses';
import {fetchColleges} from 'redux/actions/colleges';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {makeSelectCoursesMeta} from 'redux/selectors/courses';
import {makeSelectCollegesList} from 'redux/selectors/colleges';

import fetchInitialData from 'hoc/fetchInitialData';

import SubmitButton from 'components/SubmitButton/SubmitButton';


class AddCourse extends React.Component {
  static propTypes = {
    meta: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    colleges: PropTypes.array.isRequired,
    handleClose: PropTypes.func
  };

  state = {
    open: true
  };

  onSubmit = (values, dispatch) => {
    dispatch(addCourse(values, () => {
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
            <DialogTitle id="form-dialog-title" disableTypography><Typography component="h3" variant="h4">Add Course</Typography></DialogTitle>
            <DialogContent>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>

                  <Grid container spacing={32}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        name="college_id"
                        component={renderSelectField}
                        label="College"
                        fullWidth
                      >
                        <option value="" />
                        {this.props.colleges.map((college) => {
                          return (
                            <option key={college.id} value={college.id}> {college.name} </option>
                          );
                        })}
                      </Field>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        name="name"
                        component={renderTextField}
                        label="Course Name"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        name="course_code"
                        component={renderTextField}
                        label="Course Code"
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
  colleges: makeSelectCollegesList(),
  meta: makeSelectCoursesMeta()
});

const mapDispatchToProps = {
  addCourse,
  fetchColleges
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchColleges();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'AddCourseForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
  })
)(AddCourse);
