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
import showLoadingWhileFetchingData from 'hoc/showLoadingWhileFetchingData';

//  material ui

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {CardMedia} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// validation
import validateInput from 'utils/LoginValidations';


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
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '100px',
    paddingBottom: '10px'
  },
  title: {
    textAlign: 'center'
  },
  mainBg: {
    background: 'https://preview.ibb.co/h8vmvU/BGLOGIN.jpg'
  },
  logo: {
    minWidth: '200px',
    minHeight: '200px'
  }
});

class LoginAdmin extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    location: PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  state = {
    email: '',
    password: '',
    errors: {}
  }

  onSubmit = (event) => {
    const {email, password} = this.state;
    event.preventDefault();
    if (this.isValid()) {
      this.setState({errors: {}});
      this.props.login({email, password});
    }
  }

  isValid = () => {
    const {errors, isValid} = validateInput(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

handleChange = name => ({target: {value}}) => {
  this.setState({
    [name]: value
  });
};

render() {
  const {from} = this.props.location.state || {from: {pathname: '/'}};
  const {errors, email, password} = this.state;
  const {classes} = this.props;

  if (authenticate.isUserAuthenticated()) {
    return <Redirect to={from} />;
  }

  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="on" onSubmit={this.onSubmit}>
        <Grid container spacing={0} className={classes.mainBg}>
          <Grid item xs={12} xl={2} />
          <Grid item xs={12} xl={6}>
            <Card className={classes.card}>
              <Grid container spacing={0}>
                <Grid item xs={6} xl={6} >
                  <CardMedia
                    className={classes.logo}
                    image="https://postimg.cc/image/5yu2s01fl/"
                  />
                </Grid>
                <Divider />
                <Grid item xs={6} xl={6}>
                  <CardContent className={classes.content}>
                    <Typography className={classes.title} color="primary" variant="h4">
                    Login
                    </Typography>
                    <TextField
                      label="Email"
                      value={email}
                      placeholder="Email"
                      fullWidth
                      margin="normal"
                      type="email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email}
                      onChange={this.handleChange('email')}
                    />

                    <TextField
                      label="Password"
                      value={password}
                      placeholder="Enter Password"
                      fullWidth
                      margin="normal"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password}
                      onChange={this.handleChange('password')}
                    />
                    <Typography variant="caption" className={classes.link}>
                    Forgot Password?
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" className={classes.button} fullWidth onClick={this.onSubmit}>
                      <Typography color="inherit" variant="button">
                  Login
                      </Typography>
                    </Button>
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

const withLoadingWhileFetchingData = showLoadingWhileFetchingData((props) => {
  return props.meta.isLoading;
});
export default compose(
  withRedux,
  withLoadingWhileFetchingData,
  withStyles(styles)
)(LoginAdmin);
