import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import {makeSelectOrganizationsList} from 'redux/selectors/organizations';
// import {fetchOrganizations} from 'redux/actions/organizations';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {validate, warn} from 'utils/Validations/AddAccount';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {addUser} from 'redux/actions/users';
import {fetchColleges} from 'redux/actions/colleges';
import {makeSelectUsersMeta} from 'redux/selectors/users';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';
import {makeSelectCollegesList} from 'redux/selectors/colleges';

import fetchInitialData from 'hoc/fetchInitialData';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import style from './AccountList.scss';


class AddAccount extends React.Component {
  static propTypes = {
    organization: PropTypes.object,
    colleges: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  onSubmit = (values, dispatch) => {
    _.set(values, 'password', values.last_name + this.props.organization.acronym);
    const user = values;
    dispatch(addUser({user}));
  };

  render() {
    const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types

    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom> Add an Account </Typography>
        <div>
          <Paper className={style.Paper}>
            <form onSubmit={handleSubmit(this.onSubmit)} name="addUser">
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="last_name"
                        component={renderTextField}
                        label="Last Name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="first_name"
                        component={renderTextField}
                        label="First Name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="middle_name"
                        component={renderTextField}
                        label="Middle Name"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Field
                        name="email"
                        component={renderTextField}
                        label="Email"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6} sm={12} md={2}>
                      <Field
                        name="contact_number"
                        component={renderTextField}
                        label="Contact Number"
                        fullWidth
                        {...contactNumberMask}
                      />
                    </Grid>

                    <Grid item xs={6} sm={12} md={2}>
                      <Field
                        name="position"
                        component={renderTextField}
                        label="Position"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        name="college_id"
                        component={renderSelectField}
                        label="College"
                        fullWidth
                      >
                        <option value="" />
                        {this.props.colleges.map((college) => {
                          return (
                            <option key={college.id} value={college.id}> {college.name} </option>
                          );
                        })}
                      </Field>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div className={style.bottomButton}>
                <Button component={Link} to="/admin/accounts" color="primary" className={style.cancelButton}>
                  Cancel
                </Button>

                <SubmitButton loading={meta.isLoading} valid={!valid}>
                  ADD ACCOUNT
                </SubmitButton>
              </div>
            </form>
          </Paper>
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organization: makeSelectCurrentOrganization(),
  colleges: makeSelectCollegesList(),
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  fetchColleges,
  addUser
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchColleges();
});


export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'AddUser',
    destroyOnUnmount: false,
    initialValues: {
      user_type_id: 3
    },
    validate,
    warn
  }),
)(AddAccount);
