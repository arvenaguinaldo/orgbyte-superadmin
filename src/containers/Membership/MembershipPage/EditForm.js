import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import fetchInitialData from 'hoc/fetchInitialData';

import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {connect} from 'react-redux';

import {fetchCourses} from 'redux/actions/courses';
import {makeSelectCoursesList} from 'redux/selectors/courses';

// Material UI
import Grid from '@material-ui/core/Grid';

import {validate} from 'utils/Validations/AddMemberIndividual';

class EditForm extends React.Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func
  };

  state = {
    selectedDate: new Date()
  };

  render() {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    const {handleSubmit} = this.props;

    const groupNumberMask = createTextMask({
      pattern: 'G-9',
      placeholder: ' '
    });
    const sectionMask = createTextMask({
      pattern: 'A',
      placeholder: ' '
    });
    const studentNumberMask = createTextMask({
      pattern: '9999999999',
      placeholder: ' ',
      guide: false
    });

    return (
      <div>
        <form onSubmit={handleSubmit}>
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

                {/* <Grid item xs={6} sm={6} md={6}>
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
                </Grid> */}
              </Grid>

              {/* <Grid container spacing={32}>
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
              </Grid> */}

            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  courses: makeSelectCoursesList()
});

const mapDispatchToProps = {
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
    form: 'EditForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
  })
)(EditForm);
