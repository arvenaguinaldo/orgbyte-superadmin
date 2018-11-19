import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import * as authenticate from 'utils/AuthService';

// action

import {login} from 'redux/actions/auth';
import {makeSelectAuthMeta} from 'redux/selectors/auth';
// import showLoadingWhileFetchingData from 'hoc/showLoadingWhileFetchingData';

import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderPasswordField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

//  material ui

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Password from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// validation
import {validate} from 'utils/Validations/LoginAdmin';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import Car from './Carrousel';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  card: {
    width: '100%',
    minWidth: 300,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '100px',
    borderRight: 'solid #7b180f 5px',
    borderLeft: 'solid #7b180f 5px'
  },
  title: {
    textAlign: 'center'
  },
  mainBg: {
    background: 'https://preview.ibb.co/h8vmvU/BGLOGIN.jpg'
  },
  logo: {
    Width: '200px',
    Height: '100px'
  },
  log: {
    height: '100%',
    width: '100%'
  },
  loginButton: {
    width: '100%'
  }
});

class LoginAdmin extends Component {
  static propTypes = {
    meta: PropTypes.object,
    location: PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  state = {
    showPassword1: false
  };

  onSubmit = (values, dispatch) => {
    dispatch(login(values));
  };

  handleClickShowPassword1 = () => {
    this.setState(state => ({showPassword1: !state.showPassword1}));
  };

  render() {
    const {from} = this.props.location.state || {from: {pathname: '/'}};
    const {classes, valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types

    if (authenticate.isUserAuthenticated()) {
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.root}>
        <form className={classes.container} noValidate autoComplete="on" onSubmit={handleSubmit(this.onSubmit)}>
          <Grid container spacing={0} className={classes.mainBg}>
            <Grid item xs={12} xl={2} />
            <Grid item xs={12} xl={6}>
              <Card className={classes.card}>
                <Grid container spacing={0}>
                  <Grid item xs={6} xl={6} >
                    <div className={classes.left}>
                      <Center>
                        <Car />
                      </Center>
                    </div>
                  </Grid>
                  <Divider />
                  <Grid item xs={6} xl={6}>
                    <div className={classes.logo}>
                      <img src="https://i.postimg.cc/sX2XJDHd/newbannerlogo.png" alt="logo" className={classes.log} />
                    </div>

                    <CardContent className={classes.content}>
                      <Field
                        name="email"
                        component={renderTextField}
                        label="Email"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          )
                        }}
                      />

                      <Field
                        name="password"
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
                        label="Password"
                        fullWidth
                        type={this.state.showPassword1 ? 'text' : 'password'}
                        startAdornment={
                          <InputAdornment position="start">
                            <Password />
                          </InputAdornment>
                        }
                      />
                      <Typography variant="caption" className={classes.link}>
                        Forgot Password?
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <SubmitButton loading={meta.isLoading} valid={!valid} className={classes.loginButton}>
                        LOGIN
                      </SubmitButton>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} xl={2} />
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectAuthMeta()
});

const withRedux = connect(mapStateToProps, {login});

export default compose(
  withRedux,
  reduxForm({
    form: 'LoginAdmin',
    destroyOnUnmount: false,
    validate
  }),
  withStyles(styles)
)(LoginAdmin);
