import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {fetchColleges} from 'redux/actions/colleges';

import {makeSelectCollegesList, makeSelectCollegesMeta} from 'redux/selectors/colleges';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';
import AddCollege from './AddCollege';

import style from './Colleges.scss';

class College extends Component {

  static propTypes = {
    colleges: PropTypes.array.isRequired
    // modalOpen: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    colleges: []
  };

  state = {
    columns: [
      {
        name: 'id',
        options: {
          display: false,
          filter: false
        }
      },
      {
        name: 'College Name',
        options: {
          filter: true
        }
      },
      {
        name: 'College Code',
        options: {
          filter: true
        }
      }
    ],
    dbTable: 'colleges',
    open: false,
    id: 0
  };

  handleOpen = (e) => {
    e.preventDefault();
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {colleges} = this.props;
    const {columns, dbTable} = this.state;

    const options = {
      filter: true,
      print: false,
      download: false,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbarSelect: selectedRows =>
        (<CustomToolbarSelect
          dbTable={dbTable}
          selectedRows={selectedRows}
          data={colleges}
          columns={columns}
        />)

    };

    return (
      <LayoutWithTopbarAndSidebar>
        <AddCollege open={this.state.open} handleClose={this.handleClose.bind(this)} />
        <Typography variant="h4">
          Colleges
        </Typography>

        <Button onClick={e => this.handleOpen(e)} variant="contained" color="primary" className={style.button} >
          Add a college
        </Button>

        <MUIDataTable
          title={'Colleges'}
          data={colleges.map((college) => {
            return [
              college.id,
              college.name,
              college.college_code
            ];
          })}
          columns={columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  colleges: makeSelectCollegesList(),
  meta: makeSelectCollegesMeta()
});

const withRedux = connect(mapStateToProps, {fetchColleges});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchColleges();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(College);
