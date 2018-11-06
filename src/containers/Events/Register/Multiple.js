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

import {registerImports} from 'redux/actions/events';
import {setMessage, clearMessage} from 'redux/actions/notification';
import {makeSelectEventsMeta} from 'redux/selectors/events';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import validateInput from 'utils/Validations/AttendeesMultiple';

// import {callErrorNotification} from 'redux/sagas/notification';

import style from './Multiple.scss';

class Multiple extends Component {
  static propTypes = {
    event: PropTypes.object,
    registerImports: PropTypes.func,
    setMessage: PropTypes.func,
    clearMessage: PropTypes.func,
    meta: PropTypes.object.isRequired
  };

  state = {
    attendees: [],
    errors: {},
    columns: ['Student No.', 'Name', 'Course Name', 'Section', 'Contact Number', 'Email', 'Attendee Type']
  };

  onSubmit = () => {
    const {attendees} = this.state;
    const params = {event_id: this.props.event.id, attendees};
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
