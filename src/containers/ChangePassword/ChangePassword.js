import React, {Component} from 'react';
import Center from 'react-center';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import {connect} from 'react-redux';

import {Field, reduxForm} from 'redux-form';
import {renderPasswordField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {compose} from 'recompose';
import {validate, warn} from 'utils/PasswordValidations/ChangePassword';

import {changePassword} from 'redux/actions/users';
import {createStructuredSelector} from 'reselect';
import {makeSelectUsersMeta} from 'redux/selectors/users';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/LockTwoTone';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import styles from './ChangePassword.scss';

class PasswordReset extends Component {
  state = {
    showPassword1: false,
    showPassword2: false,
    showPassword3: false
  };

  onSubmit = (values, dispatch) => {
    dispatch(changePassword(values));
  };

  handleClickShowPassword1 = () => {
    this.setState(state => ({showPassword1: !state.showPassword1}));
  };
  handleClickShowPassword2 = () => {
    this.setState(state => ({showPassword2: !state.showPassword2}));
  };
  handleClickShowPassword3 = () => {
    this.setState(state => ({showPassword3: !state.showPassword3}));
  };

  render() {
    const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
    return (
      <LayoutWithTopbarAndSidebar>
        <Center>
          <Paper className={styles.Paper}>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Grid container spacing={0}>
                <Grid item xs={6} sm={6} md={6}>

                  <Grid container spacing={16}>

                    <Grid item xs={10} sm={10} md={12}>
                      <Typography variant="h4" color="secondary" >Password Reset</Typography>
                      <Typography variant="subtitle1" color="textSecondary" >Fill in required fields to change your password</Typography>
                    </Grid>

                    <Grid item xs={10} sm={10} md={11}>
                      <Field
                        required
                        name="old_password"
                        id="old_password"
                        component={renderPasswordField}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword1}
                            >
                              {this.state.showPassword1 ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Old Password"
                        fullWidth
                        type={this.state.showPassword1 ? 'text' : 'password'}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={16}>

                    <Grid item xs={10} sm={10} md={11}>
                      <Field
                        required
                        name="new_password"
                        id="new_password"
                        component={renderPasswordField}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword2}
                            >
                              {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                        fullWidth
                        type={this.state.showPassword2 ? 'text' : 'password'}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={16}>

                    <Grid item xs={10} sm={10} md={11}>
                      <Field
                        required
                        name="password"
                        id="password"
                        component={renderPasswordField}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword3}
                            >
                              {this.state.showPassword3 ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm New Password"
                        fullWidth
                        type={this.state.showPassword3 ? 'text' : 'password'}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>

                  <Grid container spacing={40}>

                    <Grid item xs={10} sm={10} md={4}>
                      <LockIcon className={styles.icon} />
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
              <div className={styles.submitButtonDiv}>
                <SubmitButton loading={meta.isLoading} valid={!valid} >
                SAVE
                </SubmitButton>
              </div>
            </form>
          </Paper>
        </Center>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  changePassword
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
  reduxForm({
    form: 'ChangePasswordForm',
    destroyOnUnmount: false,
    validate,
    warn
  })
)(PasswordReset);
