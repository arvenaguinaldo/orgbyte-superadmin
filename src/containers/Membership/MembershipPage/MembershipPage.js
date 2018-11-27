import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {makeSelectMembersList, makeSelectUsersMeta} from 'redux/selectors/users';
import {fetchMembers} from 'redux/actions/users';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';

import style from './MembershipPage.scss';

class MembershipPage extends React.Component {
  static propTypes = {
    members: PropTypes.array.isRequired
  }

  static defaultProps = {
    members: []
  };

  state = {
    columns: ['Student No.', 'Name', 'Section', 'Contact Number', 'Email', 'Address'],
    dbTable: 'members'
  };

  changeStuff(newcolumns) {
    this.setState({columns: newcolumns});
  }

  render() {
    const {members} = this.props;
    const {columns, dbTable} = this.state;
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbarSelect: selectedRows =>
        (<CustomToolbarSelect
          dbTable={dbTable}
          selectedRows={selectedRows}
          data={members}
          columns={this.state.columns}
        />)
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4">
          Memberships
        </Typography>

        <Button component={Link} to="/admin/memberships/addmember" variant="contained" color="primary" className={style.button} >
          Add a member
        </Button>

        <MUIDataTable
          title={'Memberships List'}
          data={members.map((member) => {
            return [
              member.student_number,
              member.last_name + ',  ' + member.first_name + ' ' + member.middle_name,
              member.year_level + member.section + ' - G' + member.group,
              member.contact_number,
              member.email,
              member.address
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
  members: makeSelectMembersList(),
  meta: makeSelectUsersMeta()
});

// const mapDispatchToProps = {
//   fetchEvents
// };

const withRedux = connect(mapStateToProps, {fetchMembers});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchMembers();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(MembershipPage);
