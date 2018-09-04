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
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '100px',
    paddingBottom: '10px'
  },
  title: {
    textAlign: 'center'
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
      <div>
        <form className={classes.container} noValidate autoComplete="on" onSubmit={this.onSubmit}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography className={classes.title} color="textSecondary" variant="display1">
                LOGIN
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

            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" className={classes.button} fullWidth onClick={this.onSubmit}>
                <Typography color="inherit" variant="button">
                  Login
                </Typography>
              </Button>
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

const withLoadingWhileFetchingData = showLoadingWhileFetchingData((props) => {
  return props.meta.isLoading;
});
export default compose(
  withRedux,
  withLoadingWhileFetchingData,
  withStyles(styles)
)(LoginAdmin);
