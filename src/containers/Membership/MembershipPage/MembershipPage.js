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

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import View from '@material-ui/icons/Visibility';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';
import ViewModal from './ViewModal';

import style from './MembershipPage.scss';

class MembershipPage extends React.Component {
  static propTypes = {
    members: PropTypes.array.isRequired
  }

  static defaultProps = {
    members: []
  };

  state = {
    columns: [
      {
        name: 'id',
        options: {
          display: false,
          filter: false
        }
      },
      {
        name: 'Student no.',
        options: {
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
        name: 'Year/Section/Group',
        options: {
          filter: true
        }
      },
      {
        name: 'Contact no.',
        options: {
          filter: false
        }
      },
      {
        name: 'Email',
        options: {
          filter: false
        }
      },
      {
        name: 'Address',
        options: {
          filter: false
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
    dbTable: 'members',
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
    const {members} = this.props;
    const {columns, dbTable} = this.state;
    const options = {
      filter: true,
      print: false,
      download: false,
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
          columns={columns}
        />)
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <ViewModal open={this.state.open} id={this.state.id} handleClose={this.handleClose.bind(this)} members={members} />
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
              member.id,
              member.student_number,
              member.last_name + ',  ' + member.first_name + ' ' + member.middle_name,
              member.year_level + member.section + ' - G' + member.group,
              member.contact_number,
              member.email,
              member.address,
              member.id
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
