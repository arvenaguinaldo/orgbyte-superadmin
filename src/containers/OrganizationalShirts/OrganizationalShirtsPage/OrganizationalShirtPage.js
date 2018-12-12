import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import {createStructuredSelector} from 'reselect';
import {makeSelectShirtPurchaseShirts, makeSelectShirtsMeta} from 'redux/selectors/shirts';

import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';
import {makeSelectShirt} from 'redux/selectors/shirts';
import {fetchShirt} from 'redux/actions/shirts';

import {fetchPurchaseShirts} from 'redux/actions/shirts';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';
import EmptyTable from 'containers/EmptyTable/EmptyTable';
import style from './OrganizationalShirtPage.scss';

class OrganizationalShirtPage extends React.Component {
  static propTypes = {
    purchasedShirts: PropTypes.array.isRequired,
    shirt: PropTypes.object.isRequired
  }

  static defaultProps = {
    purchasedShirts: []
  };

  state = {
    columns: [{
      name: 'Id',
      options: {
        display: false,
        filter: false
      }
    },
    {
      name: 'Name',
      options: {
        display: true,
        filter: false
      }
    },
    {
      name: 'Size',
      options: {
        display: true,
        filter: true
      }
    },
    {
      name: 'Year and Section',
      options: {
        display: true,
        filter: true
      }
    },
    {
      name: 'Contact Number',
      options: {
        display: true,
        filter: false
      }
    },
    {
      name: 'Email',
      options: {
        display: true,
        filter: false
      }
    }],
    dbTable: 'purchased_shirts'
  };

  render() {
    const {columns, dbTable} = this.state;
    const {purchasedShirts, shirt} = this.props;
    const estimateprice = purchasedShirts.length * shirt.price;
    const options = {
      filter: true,
      selectableRows: true,
      print: false,
      download: false,
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
        <Typography variant="h4">
          Organizational Shirts
        </Typography>
        <div className={style.Controls}>
          <Button component={Link} to="/admin/shirts/purchase" variant="contained" color="primary" className={style.Button}>
          Purchase
          </Button>
          <Button component={Link} to="/admin/shirts/organizationalshirt" variant="contained" color="primary" className={style.Button}>
          View
          </Button>
          <Button component={Link} to="/admin/shirts/editorganizationalshirt" variant="contained" color="primary" className={style.Button}>
          Edit Shirt Details
          </Button>
          <Typography variant="subtitle1" className={style.Profit}>
            Estimated net profit:<span className={style.Gray}>  Php {parseFloat(estimateprice).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </Typography>
        </div>
        { purchasedShirts.length !== 0 ?
          (<MUIDataTable
            title={'Organizational Shirt Purchase Record'}
            data={purchasedShirts.map((shirts) => {
              return [
                shirts.id,
                shirts.last_name + ',  ' + shirts.first_name + ' ' + shirts.middle_name,
                shirts.size,
                shirts.year_level + shirts.section + ' - G' + shirts.group,
                shirts.contact_number,
                shirts.email
              ];
            })}
            columns={columns}
            options={options}
          />) :
          (<EmptyTable title={'Organizational Shirt Purchase Record'} message={'No purchase record to display'} />)
        }
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  purchasedShirts: makeSelectShirtPurchaseShirts(),
  shirt: makeSelectShirt(),
  organization: makeSelectCurrentOrganization(),
  meta: makeSelectShirtsMeta()
});

const mapDispatchToProps = {
  fetchPurchaseShirts,
  fetchShirt
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchPurchaseShirts();
  props.fetchShirt();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(OrganizationalShirtPage);

