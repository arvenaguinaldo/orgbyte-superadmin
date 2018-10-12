import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import {createStructuredSelector} from 'reselect';
import {makeSelectShirtPurchaseShirts, makeSelectShirtsMeta} from 'redux/selectors/shirts';
import {fetchPurchaseShirts} from 'redux/actions/shirts';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';

class OrganizationalShirtPage extends React.Component {
  static propTypes = {
    purchasedShirts: PropTypes.array.isRequired
  }

  static defaultProps = {
    purchasedShirts: []
  };

  state = {
    columns: ['Id', 'Name', 'Size', 'Year and Section', 'Contact Number', 'Email'],
    dbTable: 'purchased_shirts'
  };

  render() {
    const {columns, dbTable} = this.state;
    const {purchasedShirts} = this.props;
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
          data={purchasedShirts}
          columns={this.state.columns}
        />)
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="display1">
          Organizational Shirts
        </Typography>

        <Button component={Link} to="/shirts/purchase" variant="raised" color="primary" style={{margin: 20}}>
          Purchase
        </Button>

        <MUIDataTable
          title={'Organization List'}
          data={purchasedShirts.map((shirt) => {
            return [
              shirt.id,
              shirt.last_name + ',  ' + shirt.first_name + ' ' + shirt.middle_name,
              shirt.size,
              shirt.year_level + shirt.section + ' - G' + shirt.group,
              shirt.contact_number,
              shirt.email
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
  purchasedShirts: makeSelectShirtPurchaseShirts(),
  meta: makeSelectShirtsMeta()
});

const mapDispatchToProps = {
  fetchPurchaseShirts
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchPurchaseShirts();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(OrganizationalShirtPage);

