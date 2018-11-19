import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import JsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import MUIDataTable from 'mui-datatables';
import * as Papa from 'papaparse';
import {reduxForm} from 'redux-form';
import {createStructuredSelector} from 'reselect';

import {addMembers} from 'redux/actions/users';
import {setMessage, clearMessage} from 'redux/actions/notification';
import {makeSelectUsersMeta} from 'redux/selectors/users';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import validateInput from 'utils/Validations/AddMemberMultiple';

import id from 'assets/images/membership-id-template.png';

import style from './Multiple.scss';

class Multiple extends Component {
  static propTypes = {
    addMembers: PropTypes.func,
    organization: PropTypes.object,
    setMessage: PropTypes.func,
    clearMessage: PropTypes.func,
    meta: PropTypes.object.isRequired
  };

  state = {
    members: [],
    errors: {},
    columns: ['Student No.', 'Name', 'Course name', 'Section', 'Contact Number', 'Email', 'Address']
  };

  onGenerateId = (members) => {
    const {organization} = this.props;

    for (let i = 0; i < members.length; i += 1) {

      const qrcode = require('yaqrcode');
      const base64 = qrcode(members[i].student_number);

      const doc = new JsPDF('p', 'px', [2054, 3373]);

      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      doc.addImage(id, 'PNG', 0, 0, width, height);

      // Student Name
      doc.setFontSize(150);
      doc.setTextColor('#1F1F1F');
      doc.text(members[i].first_name.toUpperCase() + ' ' + members[i].last_name.toUpperCase(), width / 2, 1423, null, null, 'center');

      // Student Number
      doc.setFontSize(150);
      doc.setTextColor('#1F1F1F');
      doc.text(members[i].student_number, width / 2, 1560, null, null, 'center');

      // Organization Name
      doc.setFontSize(125);
      doc.setTextColor('#1F1F1F');
      const organizationName = doc.splitTextToSize(organization.name, 1750);
      doc.text(organizationName, width / 2, 1671, null, null, 'center');

      doc.addImage(base64, 'GIF', 625, 2019, 785, 785);
      doc.addImage('https://i.postimg.cc/fyCSqmq1/Swits.png', 'PNG', 930, 2320, 200, 200); // LEFT IMAGE

      const membershipIdURI = doc.output('datauristring'); // Display in iframe
      const membershipId = membershipIdURI.substring(28);
      _.set(members[i], 'membershipId', membershipId);
    }
    return members;
  };

  onSubmit = () => {
    const {members} = this.state;
    const memberships = this.onGenerateId(members);
    console.log(memberships);
    this.props.addMembers({memberships});
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
    const {errors, isValid} = validateInput(results);
    if (!isValid) {
      this.setState({errors});
      const displayErrors = Object.values(errors);
      this.props.clearMessage();
      this.props.setMessage(displayErrors[0], {type: 'error'});
      console.log(errors);
    }
    return isValid;
  }

  handleResult = (results) => {
    console.log(results.data);
    console.log(results.data[0]);
    this.setState({members: []});
    if (this.isValid(results.data)) {
      this.setState({errors: {}});
      this.setState({members: results.data});
      console.log(this.state.members);
    }
  }

  render() {
    const {members, columns} = this.state;
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
          title={'Import Memberships List'}
          data={members.map((data) => {
            return [
              data.student_number,
              data.last_name + ',  ' + data.first_name + ' ' + data.middle_name,
              data.course_name,
              data.year_level + data.section + ' - G' + data.group,
              data.contact_number,
              data.email,
              data.address
            ];
          })}
          columns={columns}
          options={options}
        />

        <div className={style.bottomButton}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Button component={Link} to="/admin/memberships" color="primary" className={style.button}>
              Cancel
            </Button>
            <SubmitButton loading={meta.isLoading}>
              ADD MEMBERS
            </SubmitButton>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organization: makeSelectCurrentOrganization(),
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  addMembers,
  clearMessage,
  setMessage
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
  reduxForm({
    form: 'AddMembers',
    destroyOnUnmount: false
  })
)(Multiple);
