import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';

class OrganizationTable extends React.Component {
  static propTypes = {
    organizations: PropTypes.array.isRequired
  }

  static defaultProps = {
    organizations: []
  };

  state = {
    columns: [
      {
        name: 'Id',
        options: {
          display: false
        }
      },
      {
        name: 'Name',
        options: {
          filter: true
        }
      },
      {
        name: 'Acronym',
        options: {
          filter: true
        }
      },
      {
        name: 'Recognition No.',
        options: {
          filter: true
        }
      },
      {
        name: 'Date of Formation',
        options: {
          filter: true
        }
      },
      {
        name: 'College',
        options: {
          filter: true
        }
      },
      {
        name: 'Type',
        options: {
          filter: true
        }
      },
      {
        name: 'Active',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FormControlLabel
                label={value ? 'Active' : 'Inactive'}
                value={value ? 'Active' : 'Inactive'}
                control={
                  <Switch color="primary" checked={value} value={value ? 'Active' : 'Inactive'} />
                }
                onChange={(event) => {
                  updateValue(event.target.value !== 'Active');
                }}
              />
            );

          }
        }
      }
    ],
    dbTable: 'organizations'
  };

  render() {
    const {columns, dbTable} = this.state;
    const {organizations} = this.props;
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
          data={organizations}
          columns={this.state.columns}
        />)
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <MUIDataTable
          title={'Organization List'}
          data={organizations.map((org) => {
            return [
              org.id,
              org.name,
              org.acronym,
              org.recognition_number,
              org.formation,
              org.college_name,
              org.organization_type_name,
              org.status
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
  organizations: makeSelectOrganizationsList(),
  meta: makeSelectOrganizationsMeta()
});

const mapDispatchToProps = {
  fetchOrganizations
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOrganizations();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(OrganizationTable);
