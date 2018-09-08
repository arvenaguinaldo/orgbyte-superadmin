import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
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
      columns: ['Id', 'Name', 'Acronym', 'Recogniton No.', 'Date of Formation', 'College', 'Type']
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
      customToolbarSelect: selectedRows => <CustomToolbar selectedRows={selectedRows} data={this.state.data} changeHandler={this.changeStuff.bind(this)} columns={this.state.columns} />
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
              org.organization_type_name
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
