import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectPresidentsList} from 'redux/selectors/users';
import {fetchPresidents} from 'redux/actions/users';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import CustomToolbar from './CustomToolbarSelect';

class PresidentsTable extends React.Component {
  static propTypes = {
    presidents: PropTypes.array,
    fetchPresidents: PropTypes.func.isRequired
  }

  state = {
    columns: ['Id', 'Full Name', 'Organization', 'Email', 'Contact Number']
  };

  componentWillMount() {
    this.props.fetchPresidents();
  }

  changeStuff(newcolumns) {
    this.setState({columns: newcolumns});
  }

  render() {
    const {presidents} = this.props;
    const {columns} = this.state;
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
          title={'Presidents List'}
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
  presidents: makeSelectPresidentsList()
});

const withRedux = connect(mapStateToProps, {fetchPresidents});


export default compose(
  withRedux,
)(PresidentsTable);
