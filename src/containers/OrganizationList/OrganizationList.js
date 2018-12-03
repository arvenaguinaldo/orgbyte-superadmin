import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import moment from 'moment';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';


import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import View from '@material-ui/icons/Visibility';
import EmptyTable from 'containers/EmptyTable/EmptyTable';
import ViewModal from './ViewModal';
import style from './OrganizationList.scss';


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
          display: false,
          filter: false
        }
      },
      {
        name: 'Name',
        options: {
          filter: false
        }
      },
      {
        name: 'Acronym',
        options: {
          filter: false
        }
      },
      {
        name: 'Recognition No.',
        options: {
          filter: false
        }
      },
      {
        name: 'Date of Formation',
        options: {
          filter: false
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
        name: 'Status',
        options: {
          filter: true
        }
      },
      {
        name: 'View',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => {
            return (
              <Tooltip title={'View Member'}>
                <IconButton onClick={e => this.handleModal(e, value)} className={style.ViewIcon}>
                  <View />
                </IconButton>
              </Tooltip>
            );
          }
        }
      }
    ],
    dbTable: 'organizations',
    open: false,
    id: 0
  };
  handleModal =(e, value) => {
    // e.preventDefault();
    console.log(value);
    this.setState({open: true, id: value});
  };
  handleClose = () => {
    this.setState({open: false});
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
      print: false,
      download: false,
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
        <ViewModal open={this.state.open} id={this.state.id} handleClose={this.handleClose.bind(this)} organizations={organizations} />
        { organizations.length !== 0 ?
          (<MUIDataTable
            title={'Organization List'}
            data={organizations.map((org) => {
              return [
                org.id,
                org.name,
                org.acronym,
                org.recognition_number.replace(/(\d{2})(\d{3})/, '$1-$2'),
                moment(org.formation).format('MMM DD YYYY'),
                org.college_name,
                org.organization_type_name,
                org.status.toUpperCase(),
                org.id
              ];
            })}
            columns={columns}
            options={options}
          />) :
          (<EmptyTable title={'Organization List'} message={'No registered organizations'} />)
        }
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
