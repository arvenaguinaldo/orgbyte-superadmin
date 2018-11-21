import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {compose} from 'recompose';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {fetchOfficers} from 'redux/actions/users';
import {makeSelectUsersMeta, makeSelectOfficersList} from 'redux/selectors/users';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import CustomToolbar from './CustomToolbarSelect';
import style from './AccountList.scss';


class AccountsList extends React.Component {
  static propTypes = {
    officers: PropTypes.array
  }

  state = {
    columns: ['Id', 'Name', 'Position', 'Email', 'Contact Number', 'College']
  };


  render() {
    const {columns} = this.state;
    const {officers} = this.props;

    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbarSelect: selectedRows => <CustomToolbar selectedRows={selectedRows} data={this.state.data} changeHandler={this.changeStuff.bind(this)} columns={this.state.columns} />
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom> Accounts List </Typography>

        <Button component={Link} to="/admin/accounts/addaccount" variant="contained" color="primary" className={style.addbutton} >
          Add Account
        </Button>

        <MUIDataTable
          title={'Account List'}
          columns={columns}
          options={options}
          data={officers.map((president) => {
            return [
              president.id,
              president.last_name + ',  ' + president.first_name + ' ' + president.middle_name,
              president.position,
              president.email,
              president.contact_number,
              president.college_name
            ];
          })}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  officers: makeSelectOfficersList(),
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  fetchOfficers
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOfficers();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(AccountsList);
