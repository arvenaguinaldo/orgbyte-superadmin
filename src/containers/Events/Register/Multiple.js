import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
// import {call} from 'redux-saga/effects';
import Button from '@material-ui/core/Button';
import MUIDataTable from 'mui-datatables';
import * as Papa from 'papaparse';
import {reduxForm} from 'redux-form';
import {createStructuredSelector} from 'reselect';
import _ from 'lodash';

import JsPDF from 'jspdf';
import moment from 'moment';

import {registerImports} from 'redux/actions/events';
import {setMessage, clearMessage} from 'redux/actions/notification';
import {makeSelectEventsMeta} from 'redux/selectors/events';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';

import SubmitButton from 'components/SubmitButton/SubmitButton';
import ticketTemplate from 'assets/images/ticket-template.png';

import validateInput from 'utils/Validations/AttendeesMultiple';

// import {callErrorNotification} from 'redux/sagas/notification';

import style from './Multiple.scss';

class Multiple extends Component {
  static propTypes = {
    event: PropTypes.object,
    registerImports: PropTypes.func,
    organization: PropTypes.object,
    setMessage: PropTypes.func,
    clearMessage: PropTypes.func,
    meta: PropTypes.object.isRequired
  };

  state = {
    attendees: [],
    errors: {},
    columns: ['Student No.', 'Name', 'Course Name', 'Section', 'Contact Number', 'Email', 'Attendee Type']
  };

  onGenerateId = (attendees) => {
    // e.preventDefault();
    const {event, organization} = this.props;

    for (let i = 0; i < attendees.length; i += 1) {

      const generator = require('generate-password');

      const generate = generator.generate({
        length: 6,
        numbers: true
      });

      const qrValue = generate + attendees[i].first_name;

      const base64QR = attendees[i].attendee_type === 'NON-BULSUAN' ? qrValue : attendees[i].student_number;

      const qrcode = require('yaqrcode');
      const base64 = qrcode(base64QR);

      console.log(base64QR);

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
      doc.text(attendees[i].first_name.toUpperCase() + ' ' + attendees[i].last_name.toUpperCase(), 1780, 468, null, null, 'right');

      // Attendee Type
      doc.setFontSize(65);
      doc.setTextColor('#1F1F1F');
      doc.text(attendees[i].attendee_type, 1780, 558, null, null, 'right');

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
      console.log(ticketURI);
      _.set(attendees[i], 'ticket', ticket);

      if (attendees[i].attendee_type === 'NON-BULSUAN') {
        attendees[i].student_number = base64QR; // eslint-disable-line
      }
    }

    console.log(attendees);

    return attendees;
  };

  onSubmit = () => {
    const {attendees} = this.state;
    const multipleAttendees = this.onGenerateId(attendees);
    const params = {event_id: this.props.event.id, multipleAttendees};
    this.props.registerImports(params);
  };

  handleImport = (value) => {
    console.log(value);
    Papa.parse(value, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.handleResult
    });
    document.getElementById('contained-button-file').value = '';
  }

  isValid = (results) => {
    const {errors, isValid} = validateInput(results, this.props.event);
    if (!isValid) {
      this.setState({errors});
      const displayErrors = Object.values(errors);
      this.props.clearMessage();
      this.props.setMessage(displayErrors[0], {type: 'error'});
    }
    return isValid;
  }

  handleResult = (results) => {
    console.log(results.data);
    console.log(results.data[0]);
    this.setState({attendees: []});
    if (this.isValid(results.data)) {
      this.setState({errors: {}});
      this.setState({attendees: results.data});
      console.log(this.state.attendees);
    }
  }

  render() {
    const {attendees, columns} = this.state;
    const {handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 5,
      resizableColumns: false
    };

    return (
      <div>
        <input
          accept=".csv"
          id="contained-button-file"
          multiple
          type="file"
          style={{display: 'none'}}
          onChange={event => this.handleImport(event.target.files[0])}
        />
        <label htmlFor="contained-button-file">
          <Button color="primary" variant="contained" component="span" className={style.button}>
            IMPORT
          </Button>
        </label>

        <MUIDataTable
          title={'Import Attendee List'}
          data={attendees.map((data) => {
            return [
              data.student_number,
              data.last_name + ',  ' + data.first_name + ' ' + data.middle_name,
              data.course_name,
              data.year_level + data.section + ' - G' + data.group,
              data.contact_number,
              data.email,
              data.attendee_type
            ];
          })}
          columns={columns}
          options={options}
        />

        <div className={style.bottomButton}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Button component={Link} to="/admin/shirts" color="primary" className={style.button}>
              Cancel
            </Button>
            <SubmitButton loading={meta.isLoadingSubmit}>
              REGISTER IMPORTS
            </SubmitButton>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organization: makeSelectCurrentOrganization(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  registerImports,
  clearMessage,
  setMessage
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
  reduxForm({
    form: 'PurchaseImports',
    destroyOnUnmount: false
  })
)(Multiple);
