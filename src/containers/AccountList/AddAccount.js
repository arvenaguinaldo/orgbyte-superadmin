import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import {makeSelectOrganizationsList} from 'redux/selectors/organizations';
// import {fetchOrganizations} from 'redux/actions/organizations';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import generator from 'generate-password';
import {validate, warn} from 'utils/Validations/AddAccount';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {addUser} from 'redux/actions/users';
import {makeSelectUsersMeta, makeSelectUsersList} from 'redux/selectors/users';

import SubmitButton from 'components/SubmitButton/SubmitButton';
import CustomToolbar from './CustomToolbarSelect';
import mystyle from './AccountList.scss';

const generatedPassword = generator.generate({
  length: 10,
  numbers: true
});

class AddAccount extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    columns: ['Id', 'Name', 'Acronym', 'Recogniton No.', 'Date of Formation', 'College', 'Type']
  };
  onSubmit = (values, dispatch) => {
    dispatch(addUser(values));
  };

  // changeStuff(newcolumns) {
  //   this.setState({columns: newcolumns});
  // }
  render() {
    const {handleSubmit} = this.props;
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
        <Typography variant="display1" gutterBottom>
          Add an Account
          <div>
            <Paper className={mystyle.Paper}>
              <form onSubmit={handleSubmit(this.onSubmit)} name="addUser">
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={12} md={12}>

                    <Grid container spacing={40}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Field
                          name="email"
                          component={renderTextField}
                          label="Email"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
                        <Field
                          name="last_name"
                          component={renderTextField}
                          label="Last Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
                        <Field
                          name="first_name"
                          component={renderTextField}
                          label="First Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
                        <Field
                          name="user_type_id"
                          component={renderSelectField}
                          label="Position"
                          fullWidth
                        >
                          <MenuItem value={2}>Vice President</MenuItem>
                          <MenuItem value={3}>Sub Admin</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <SubmitButton className={mystyle.bottomButton}>Add officer</SubmitButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </div>
        </Typography>
        <MUIDataTable
          title={'Account List'}
          columns={columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsersList(),
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  addUser
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  reduxForm({
    form: 'AddUser',
    destroyOnUnmount: false,
    initialValues: {
      password: generatedPassword
    },
    validate,
    warn
  }),
  withRedux,
)(AddAccount);
