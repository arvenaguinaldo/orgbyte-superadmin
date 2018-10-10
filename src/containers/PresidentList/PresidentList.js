import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectPresidentsList, makeSelectUsersMeta} from 'redux/selectors/users';
import {fetchPresidents} from 'redux/actions/users';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';

class PresidentsTable extends React.Component {
  static propTypes = {
    presidents: PropTypes.array
  }

  static defaultProps = {
    presidents: []
  };
  state = {
    columns: ['Id', 'Full Name', 'Organization', 'Email', 'Contact Number'],
    dbTable: 'users'
  };

  render() {
    const {columns, dbTable} = this.state;
    const {presidents} = this.props;
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbarSelect: selectedRows =>
        (<CustomToolbarSelect
          dbTable={dbTable}
          selectedRows={selectedRows}
          data={presidents}
          columns={this.state.columns}
        />)
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <MUIDataTable
          title={'Presidents'}
          data={presidents.map((president) => {
            return [
              president.id,
              president.last_name + ',  ' + president.first_name + ' ' + president.middle_name,
              president.organization_name,
              president.email,
              president.contact_number
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
  presidents: makeSelectPresidentsList(),
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  fetchPresidents
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchPresidents();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(PresidentsTable);
