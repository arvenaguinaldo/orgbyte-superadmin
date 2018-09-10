import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {makeSelectMembersList} from 'redux/selectors/users';
import {fetchMembers} from 'redux/actions/users';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbar from './CustomToolbarSelect';
import style from './MembershipPage.scss';

class MembershipPage extends React.Component {
  static propTypes = {
    members: PropTypes.array,
    fetchMembers: PropTypes.func.isRequired
  }

  state = {
    columns: ['Student No.', 'Name', 'Section', 'Contact Number', 'Email', 'Address']
  };

  componentWillMount() {
    this.props.fetchMembers();
  }

  changeStuff(newcolumns) {
    this.setState({columns: newcolumns});
  }

  render() {
    const {members} = this.props;
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
        <Typography variant="display1">
          Memberships
        </Typography>

        <Button component={Link} to="/memberships/addmember" variant="raised" color="primary" className={style.button} >
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
  members: makeSelectMembersList()
});

const withRedux = connect(mapStateToProps, {fetchMembers});


export default compose(
  withRedux,
)(MembershipPage);