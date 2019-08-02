import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {createStructuredSelector} from 'reselect';
import JsPDF from 'jspdf';

import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createTextMask} from 'redux-form-input-masks';

import {register} from 'redux/actions/events';
import {fetchCourses} from 'redux/actions/courses';
import {fetchColleges} from 'redux/actions/colleges';

import {makeSelectEventsMeta} from 'redux/selectors/events';
import {makeSelectCoursesList} from 'redux/selectors/courses';
import {makeSelectCollegesList} from 'redux/selectors/colleges';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';

import fetchInitialData from 'hoc/fetchInitialData';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SubmitButton from 'components/SubmitButton/SubmitButton';
import ticketTemplate from 'assets/images/ticket-template.png';

import style from './Register.scss';

class Bulsuans extends Component {
  static propTypes = {
    fetchCourses: PropTypes.func,
    courses: PropTypes.array.isRequired,
    colleges: PropTypes.array.isRequired,
    event: PropTypes.object,
    organization: PropTypes.object,
    meta: PropTypes.object.isRequired
  }

  onGenerateId = (member) => {
    // e.preventDefault();
    const {event, organization} = this.props;

    const qrcode = require('yaqrcode');
    const base64 = qrcode(member.student_number);

    const doc = new JsPDF('p', 'px', [2480, 3508]);

    doc.addImage(ticketTemplate, 'PNG', 49, 66, 2387, 939);

    // Event Title
    doc.setFontSize(100);
    doc.setTextColor('#1F1F1F');
    // doc.text(member.first_name.toUpperCase() + ' ' + member.last_name.toUpperCase(), width / 2, 1423, null, null, 'center');
    const eventName = doc.splitTextToSize(event.name, 1465);
    doc.text(eventName, 2355, 275, null, null, 'right');

    // Name
    doc.setFontSize(65);
    doc.setTextColor('#1F1F1F');
    doc.text(member.first_name.toUpperCase() + ' ' + member.last_name.toUpperCase(), 1780, 468, null, null, 'right');

    // Attendee Type
    doc.setFontSize(65);
    doc.setTextColor('#1F1F1F');
    doc.text('BULSUANS', 1780, 558, null, null, 'right');

    // Events Date
    doc.setFontSize(60);
    doc.setTextColor('#1F1F1F');
    const eventDate = doc.splitTextToSize(moment(event.starts).format('MMMM Do YYYY, h:mm a') + ' to ' + moment(event.ends).format('MMMM Do YYYY, h:mm a'), 785);
    doc.text(eventDate, 1780, 660, null, null, 'right');

    // Events Venue
    doc.setFontSize(60);
    doc.setTextColor('#1F1F1F');
    const eventVenue = doc.splitTextToSize(event.venue, 785);
    doc.text(eventVenue, 1780, 820, null, null, 'right');

    // Organization Name
    doc.setFontSize(45);
    doc.setTextColor('#1F1F1F');
    doc.text(organization.name.toUpperCase(), 968, 992, null, null, 'left');

    doc.addImage(base64, 'GIF', 1823, 385, 510, 510);
    // doc.addImage('https://i.postimg.cc/fyCSqmq1/Swits.png', 'PNG', 1815, 375, 490, 490); // LEFT IMAGE

    const ticketURI = doc.output('datauristring'); // Display in iframe
    const ticket = ticketURI.substring(28);
    // window.open(doc.output('bloburl'), '_blank', 'top=10%');

    return ticket;
  };

  onSubmit = (values, dispatch) => {
    const ticket = this.onGenerateId(values);
    _.set(values, 'ticket', ticket);
    _.set(values, 'event_id', this.props.event.id);
    dispatch(register(values));
  };

  handleFetchCourse = (value) => {
    const params = {college_id: value};
    this.props.fetchCourses(params);
  }

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

    const {courses, colleges, valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
    const registerDisable = moment().isAfter(this.props.event.ends);
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
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

          <Grid item xs={6} sm={6} md={2}>
            <Field
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
        </Grid>

        <Grid container spacing={32}>
          <Grid item xs={12} sm={12} md={6}>
            <Field
              name="college_id"
              component={renderSelectField}
              label="College*"
              fullWidth
              onChange={event => this.handleFetchCourse(event.target.value)}
            >
              <option value="" />
              {colleges.map((college) => {
                return (
                  <option key={college.id} value={college.id}> {college.name} </option>
                );
              })}
            </Field>
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <Field
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

        <div className={style.bottomButton}>
          <Button component={Link} to={'/admin/events/'} color="primary" className={style.button}>
                  Cancel
          </Button>

          <SubmitButton loading={meta.isLoadingSubmit} valid={!valid || registerDisable}>
                  Register
          </SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  colleges: makeSelectCollegesList(),
  organization: makeSelectCurrentOrganization(),
  courses: makeSelectCoursesList(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  register,
  fetchCourses,
  fetchColleges
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchCourses();
  props.fetchColleges();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'EventRegisterForm',
    overwriteOnInitialValuesChange: true,
    enableReinitialize: true,
    destroyOnUnmount: false,
    initialValues: {
      event_attendee_type_id: 2
    }
  })
)(Bulsuans);
