import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import MUIDataTable from 'mui-datatables';
import {createStructuredSelector} from 'reselect';
import fetchInitialData from 'hoc/fetchInitialData';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';

class RenewalList extends Component {
 static propTypes = {
   organizations: PropTypes.array.isRequired,
   meta: PropTypes.object.isRequired
 };

static defaultProps = {
  organizations: []
};

state = {
  startsDate: new Date('2018-01-01T00:00:00.000Z'),
  endsDate: new Date(),
  selectedDate: new Date(),
  selectedLogo: null,
  color: ['#5C181D', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
    '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
    '#ff9800', '#ff5722', '#795548', '#607d8b'],
  selectedColor: '#5C181D',
  activeStep: 0,
  columns: [
    {
      name: 'Id',
      options: {
        display: false,
        filter: false
      }
    },
    {
      name: 'Name\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
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
      name: 'College\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
      options: {
        filter: true
      }
    },
    {
      name: 'Type\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
      options: {
        filter: true
      }
    },
    {
      name: 'Action Button',
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Button
              component={Link}
              to={`/superadmin/renew/${value}`}
              color="primary"
              variant="contained"
              mini
              style={{fontSize: '11px'}}
              onClick={this.handleClickOpen}
            >
              Renew
            </Button>
          );
        }
      }
    }
  ]
};
getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: '#eee',
        padding: '0px 10px 0px 10px'
      }
    },
    MUIDataTableBodyRow: {
      root: {
        backgroundColor: '#fff',
        padding: '0px 10px 0px 10px',
        '&:hover': {
          backgroundColor: '#eee',
          color: '#fff',
          cursor: 'pointer'
        }
      }
    },
    MUIDataTableBodyCell: {
      root: {
        padding: '0px 10px 0px 10px'
      }
    }
  }
})
render() {
  const meta = this.props.meta;
  const options = {
    filter: true,
    selectableRows: false,
    filterType: 'dropdown',
    responsive: 'scroll',
    rowsPerPage: 5,
    resizableColumns: false,
    rowHover: false,
    onRowClick: (rowData) => {
      console.log(rowData[0], rowData[1]);
      console.log(meta);
    }
  };
  return (
    <LayoutWithTopbarAndSidebar>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={24}>

            <Grid item xs={12} sm={12} md={12} >
              <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                  title={'Organization Renewal List'}
                  data={this.props.organizations.map((org) => {
                    return [
                      org.id,
                      org.name,
                      org.acronym,
                      org.recognition_number,
                      org.formation,
                      org.college_name,
                      org.organization_type_name,
                      org.id
                    ];
                  })}
                  columns={this.state.columns}
                  options={options}
                />
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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

export default compose(
  withRedux,
  withFetchInitialData,
)(RenewalList);
