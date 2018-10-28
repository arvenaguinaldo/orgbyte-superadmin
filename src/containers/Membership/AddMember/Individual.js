import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

// redux form
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField, renderRadioButton} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {addMember} from 'redux/actions/users';
import {fetchCourses} from 'redux/actions/courses';

import {makeSelectUsersMeta} from 'redux/selectors/users';
import {makeSelectCoursesList} from 'redux/selectors/courses';

import fetchInitialData from 'hoc/fetchInitialData';

// material ui
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import {validate} from 'utils/Validations/AddMemberIndividual';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import style from './Individual.scss';

class Individual extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
    fetchCourses: PropTypes.func,
    meta: PropTypes.object.isRequired
  };

  onSubmit = (values, dispatch) => {
    dispatch(addMember(values));
  };

  render() {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    const groupNumberMask = createTextMask({
      pattern: 'G-9',
      placeholder: ' '
    });
    const sectionMask = createTextMask({
      pattern: 'A',
      placeholder: ' '
    });
    const studentNumberMask = createTextMask({
      pattern: '9999-999999',
      placeholder: ' ',
      guide: false
    });

    const {courses, valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={32}>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="student_number"
                    component={renderTextField}
                    label="Student Number"
                    fullWidth
                    {...studentNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="last_name"
                    component={renderTextField}
                    label="Last Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="first_name"
                    component={renderTextField}
                    label="First Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="middle_name"
                    component={renderTextField}
                    label="Middle Name"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="email"
                    component={renderTextField}
                    label="Email"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} sm={12} md={3}>
                  <Field
                    name="contact_number"
                    component={renderTextField}
                    label="Contact Number"
                    fullWidth
                    {...contactNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field
                    name="address"
                    component={renderTextField}
                    label="Address"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={32}>
                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    name="year_level"
                    component={renderSelectField}
                    label="Year Level"
                    fullWidth
                  >
                    <option value="" />
                    <option value={1}>First Year</option>
                    <option value={2}>Second Year</option>
                    <option value={3}>Third Year</option>
                    <option value={4}>Fourth Year</option>
                  </Field>
                </Grid>

                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    name="section"
                    component={renderTextField}
                    label="Section"
                    fullWidth
                    {...sectionMask}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    name="group"
                    component={renderTextField}
                    label="Group"
                    fullWidth
                    {...groupNumberMask}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <Field
                    name="course_id"
                    component={renderSelectField}
                    label="Course"
                    fullWidth
                  >
                    <option value="" />
                    {courses.map((course) => {
                      return (
                        <option key={course.id} value={course.id}> {course.course_name} </option>
                      );
                    })}
                  </Field>
                </Grid>
              </Grid>

              <Grid container spacing={32}>
                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="semester"
                    component={renderRadioButton}
                    label="Semester"
                    fullWidth
                  >
                    <FormControlLabel value="1" control={<Radio color="primary" />} label="1st Semester" />
                    <FormControlLabel value="2" control={<Radio color="primary" />} label="2nd Semester" />
                  </Field>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          <div className={style.bottomButton}>
            <Button component={Link} to="/memberships" color="primary" className={style.button}>
              Cancel
            </Button>

            <SubmitButton loading={meta.isLoading} valid={!valid}>
              ADD A MEMBER
            </SubmitButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  courses: makeSelectCoursesList(),
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  addMember,
  fetchCourses
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchCourses();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'AddMember',
    destroyOnUnmount: false,
    validate
  })
)(Individual);
