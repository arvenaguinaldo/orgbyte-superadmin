import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
// import {call} from 'redux-saga/effects';
import Button from '@material-ui/core/Button';
import MUIDataTable from 'mui-datatables';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {reduxForm} from 'redux-form';
import {createStructuredSelector} from 'reselect';

import {purchaseImports} from 'redux/actions/shirts';
import {setMessage, clearMessage} from 'redux/actions/notification';
import {makeSelectShirtsMeta} from 'redux/selectors/shirts';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import validateInput from 'utils/Validations/PurchaseMultiple';

// import {callErrorNotification} from 'redux/sagas/notification';

import style from './Multiple.scss';

class Multiple extends Component {
  static propTypes = {
    purchaseImports: PropTypes.func,
    setMessage: PropTypes.func,
    clearMessage: PropTypes.func,
    meta: PropTypes.object.isRequired
  };

  state = {
    members: [],
    errors: {},
    columns: ['Student No.', 'Name', 'Size', 'Course', 'Section', 'Contact Number', 'Email']
  };

  onSubmit = () => {
    const {members} = this.state;
    this.props.purchaseImports({members});
  };

  handleImport = (event) => {
    const extension = event.target.files[0].name.split('.').pop();
    if (extension === 'xlsx') {
      const reader = new FileReader();

      reader.onload = () => {
        const workbook = XLSX.read(reader.result, {type: 'binary'});
        const sheetName = workbook.SheetNames[0];
        const csv = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        this.handleResult(csv);
      };
      reader.readAsBinaryString(event.target.files[0]);
    }

    if (extension === 'csv') {
      Papa.parse(event.target.files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: this.handleResult
      });
    }
    document.getElementById('contained-button-file').value = '';
  }

  isValid = (results) => {
    const {errors, isValid} = validateInput(results);
    if (!isValid) {
      this.setState({errors});
      const displayErrors = Object.values(errors);
      this.props.clearMessage();
      this.props.setMessage(displayErrors[0], {type: 'error'});
    }
    return isValid;
  }

  handleResult = (result) => {
    const results = result.data ? result.data : result;
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
          accept=".csv,.xlsx"
          id="contained-button-file"
          multiple
          type="file"
          style={{display: 'none'}}
          onChange={event => this.handleImport(event)}
        />
        <label htmlFor="contained-button-file">
          <Button color="primary" variant="contained" component="span" className={style.button}>
            IMPORT
          </Button>
        </label>

        <MUIDataTable
          title={'Import Organizational Shirt Purchase List'}
          data={members.map((data) => {
            return [
              data.student_number,
              data.last_name + ',  ' + data.first_name + ' ' + data.middle_name,
              data.size,
              data.course,
              data.year_level + data.section + ' - G' + data.group,
              data.contact_number,
              data.email
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
            <SubmitButton loading={meta.isLoading}>
              PURCHASE IMPORTS
            </SubmitButton>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectShirtsMeta()
});

const mapDispatchToProps = {
  purchaseImports,
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
