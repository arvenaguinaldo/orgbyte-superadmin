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

import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderPasswordField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

// material ui

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Password from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// validation
import {validate} from 'utils/Validations/LoginAdmin';

import SubmitButton from 'components/SubmitButton/SubmitButton';


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
    minWidth: 275,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '100px',
    paddingBottom: '10px'
  },
  title: {
    textAlign: 'center'
  },
  loginButton: {
    width: '100%'
  }
});

class Login extends Component {
static propTypes = {
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
    <div>
      <form className={classes.container} noValidate autoComplete="on" onSubmit={handleSubmit(this.onSubmit)}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} color="textSecondary" variant="h4">
              LOGIN
            </Typography>

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

          </CardContent>
          <CardActions>
            <SubmitButton loading={meta.isLoading} valid={!valid} className={classes.loginButton}>
              LOGIN
            </SubmitButton>
          </CardActions>
        </Card>
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
    form: 'LoginSuperAdmin',
    destroyOnUnmount: false,
    validate
  }),
  withStyles(styles)
)(Login);
