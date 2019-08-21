import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
// import _ from 'lodash';
import {createStructuredSelector} from 'reselect';
import JsPDF from 'jspdf';

// redux form
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {addMember} from 'redux/actions/users';
import {fetchCourses} from 'redux/actions/courses';

import {makeSelectUsersMeta} from 'redux/selectors/users';
import {makeSelectCoursesList} from 'redux/selectors/courses';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';

import fetchInitialData from 'hoc/fetchInitialData';

// material ui
import Grid from '@material-ui/core/Grid';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import {validate} from 'utils/Validations/AddMemberIndividual';

import SubmitButton from 'components/SubmitButton/SubmitButton';
import id from 'assets/images/membership-id-template.png';

import style from './Individual.scss';

class Individual extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
    fetchCourses: PropTypes.func,
    organization: PropTypes.object,
    meta: PropTypes.object.isRequired
  };

  onGenerateId = (member) => {
    const {organization} = this.props;

    const qrcode = require('yaqrcode');
    const base64 = qrcode(member.student_number);

    const doc = new JsPDF('p', 'px', [2054, 3373]);

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    doc.addImage(id, 'PNG', 0, 0, width, height);

    // Student Name
    doc.setFontSize(150);
    doc.setTextColor('#1F1F1F');
    doc.text(member.first_name.toUpperCase() + ' ' + member.last_name.toUpperCase(), width / 2, 1423, null, null, 'center');

    // Student Number
    doc.setFontSize(150);
    doc.setTextColor('#1F1F1F');
    doc.text(member.student_number, width / 2, 1560, null, null, 'center');

    // Organization Name
    doc.setFontSize(125);
    doc.setTextColor('#1F1F1F');
    const organizationName = doc.splitTextToSize(organization.name, 1750);
    doc.text(organizationName, width / 2, 1671, null, null, 'center');

    doc.addImage(base64, 'GIF', 625, 2019, 785, 785);
    doc.addImage('https://i.postimg.cc/fyCSqmq1/Swits.png', 'PNG', 930, 2320, 200, 200); // LEFT IMAGE

    const membershipIdURI = doc.output('datauristring'); // Display in iframe
    const membershipId = membershipIdURI.substring(28);

    return membershipId;
  };

  onSubmit = (values, dispatch) => {
    // const membershipId = this.onGenerateId(values);
    // _.set(values, 'membershipId', membershipId);
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
      pattern: '9999999999',
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
                    required
                    name="student_number"
                    component={renderTextField}
                    label="Student Number"
                    fullWidth
                    {...studentNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    required
                    name="last_name"
                    component={renderTextField}
                    label="Last Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    required
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
                    required
                    name="email"
                    component={renderTextField}
                    label="Email"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} sm={12} md={3}>
                  <Field
                    required
                    name="contact_number"
                    component={renderTextField}
                    label="Contact Number"
                    fullWidth
                    {...contactNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field
                    required
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
                    required
                    name="year_level"
                    component={renderSelectField}
                    label="Year Level*"
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
                    required
                    name="section"
                    component={renderTextField}
                    label="Section"
                    fullWidth
                    {...sectionMask}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    required
                    name="group"
                    component={renderTextField}
                    label="Group"
                    fullWidth
                    {...groupNumberMask}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <Field
                    required
                    name="course_id"
                    component={renderSelectField}
                    label="Course*"
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
          <div className={style.bottomButton}>
            <Button component={Link} to="/admin/memberships" color="primary" className={style.button}>
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
  organization: makeSelectCurrentOrganization(),
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
