import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';


import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbar from './CustomToolbarSelect';

class OrganizationTable extends React.Component {
  static propTypes = {
    organizations: PropTypes.array,
    fetchOrganizations: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
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
            display: true
          }
        },
        {
          name: 'Acronym',
          options: {
            display: true
          }
        },
        {
          name: 'Recognition No.',
          options: {
            display: true
          }
        },
        {
          name: 'Date of Formation',
          options: {
            display: true
          }
        },
        {
          name: 'College',
          options: {
            display: true
          }
        },
        {
          name: 'Type',
          options: {
            display: true
          }
        },
        {
          name: 'Active',
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={value}
                      value={value ? 'Yes' : 'No'}
                    />
                  }
                  onChange={(event) => {
                    updateValue(event.target.value !== 'Yes');
                  }}
                />
              );
            }
          }
        }
      ]
    };
  }

  componentWillMount() {
    this.props.fetchOrganizations();
  }
  changeStuff(newcolumns) {
    this.setState({columns: newcolumns});
  }
  render() {
    const {organizations} = this.props;
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      onRowsSelect: (rowsSelected, allRows) => {
        console.log(rowsSelected, allRows);
      },
      customToolbarSelect: selectedRows => <CustomToolbar selectedRows={selectedRows} data={organizations} changeHandler={this.changeStuff.bind(this)} columns={this.state.columns} />
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
          columns={this.state.columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizationsList()
});

const withRedux = connect(mapStateToProps, {fetchOrganizations});


export default compose(
  withRedux,
)(OrganizationTable);
