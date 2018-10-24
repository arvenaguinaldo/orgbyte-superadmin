import React, {Component} from 'react';
import Center from 'react-center';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import RemoteSubmitButton from 'containers/RemoteSubmitButton/RemoteSubmitButton';

import {Field, reduxForm} from 'redux-form';
import {renderPasswordField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {compose} from 'recompose';
import {validate, warn} from 'utils/PasswordValidations/ChangePassword';

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
    password1: '',
    showPassword1: false,
    password2: '',
    showPassword2: false,
    password3: '',
    showPassword3: false
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
    return (
      <LayoutWithTopbarAndSidebar>
        <Center>
          <Paper className={styles.Paper}>
            <form>
              <Grid container spacing={0}>
                <Grid item xs={6} sm={6} md={6}>

                  <Grid container spacing={16}>

                    <Grid item xs={10} sm={10} md={12}>
                      <Typography variant="display1" color="secondary" >Password Reset Form</Typography>
                      <Typography variant="subheading" color="textSecondary" >Fill in required fields to change your password</Typography>
                    </Grid>

                    <Grid item xs={10} sm={10} md={11}>
                      <Field
                        name="old_password"
                        id="old_password"
                        component={renderPasswordField}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword1}
                            >
                              {this.state.showPassword1 ? <VisibilityOff /> : <Visibility />}
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
                        name="new_password"
                        id="new_password"
                        component={renderPasswordField}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword2}
                            >
                              {this.state.showPassword2 ? <VisibilityOff /> : <Visibility />}
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
                        name="confirm_new_password"
                        id="confirm_new_password"
                        component={renderPasswordField}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword3}
                            >
                              {this.state.showPassword3 ? <VisibilityOff /> : <Visibility />}
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
                <RemoteSubmitButton
                  submitForm={'ChangePasswordForm'}
                >
                SAVE
                </RemoteSubmitButton>
              </div>
            </form>
          </Paper>
        </Center>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default compose(
  reduxForm({
    form: 'ChangePasswordForm',
    destroyOnUnmount: false,
    validate,
    warn
  })
)(PasswordReset);
