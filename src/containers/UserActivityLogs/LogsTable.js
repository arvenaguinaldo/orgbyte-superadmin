import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';
import Button from '@material-ui/core/Button';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbar from './CustomToolbarSelect';
import myStyles from './UserActivityLogs.scss';

class LogstTable extends React.Component {
  static propTypes = {
    organizations: PropTypes.array,
    fetchOrganizations: PropTypes.func.isRequired
  }

  state = {
    columns: ['Id', 'Name', 'Acronym', 'Recogniton No.', 'Date of Formation', 'College', 'Type']
  };

  componentWillMount() {
    this.props.fetchOrganizations();
  }

  changeStuff(newcolumns) {
    this.setState({columns: newcolumns});
  }

  render() {
    const {organizations} = this.props;
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
          title={'User Activity Logs'}
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
          columns={columns}
          options={options}
        />
        <div className={myStyles.resetButtonDiv}>
          <Button color="primary" variant="raised" >RESET</Button>
        </div>
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
)(LogstTable);
