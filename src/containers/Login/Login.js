import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

// action

import {loginAction} from 'redux/actions/login';

//  material ui

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// validation
import validateInput from './LoginValidations';


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

class Login extends Component {
  static propTypes = {
    loginAction: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    email: '',
    password: '',
    errorMessage: {},
    error: {},
    isLoading: false
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({errorMessage: {}, errors: {}, isLoading: true});
      this.props.loginAction(this.state);
    }
  }

  isValid = () => {
    const {error, errorMessage, isValid} = validateInput(this.state);
    if (!isValid) {
      this.setState({errorMessage});
      this.setState({error});
    }
    return isValid;
  }

  handleChange = name => ({target: {value}}) => {
    this.setState({
      [name]: value
    });
  };


  render() {
    const {error, errorMessage, email, password, isLoading} = this.state;
    const {classes} = this.props;

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
                error={error.email}
                helperText={errorMessage.email}
                onChange={this.handleChange('email')}
              />

              <TextField
                label="Password"
                value={password}
                placeholder="Enter Password"
                fullWidth
                margin="normal"
                type="password"
                error={error.password}
                helperText={errorMessage.password}
                onChange={this.handleChange('password')}
              />


            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" className={classes.button} disabled={isLoading} fullWidth onClick={this.onSubmit}>
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
export default compose(
  connect(null, {loginAction}),
  withStyles(styles))(Login);

