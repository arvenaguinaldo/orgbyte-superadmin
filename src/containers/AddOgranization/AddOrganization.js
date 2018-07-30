import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';

// layout
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import style from './AddOrganization.scss';


const styles = theme => ({
  root: {
    width: '100%'
  },
  Paper: {
    padding: '50px'
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  grid: {
    backgroundColor: '#5F1D24'
  },
  hide: {
    display: 'none'
  }
});
/* eslint-disable react/prefer-stateless-function */

function TextMaskCustom(props) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};


class AddOrganization extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {
    activeStep: 0,
    textmask: '  -   ',
    college: '',
    organizationType: '',
    error: ''
  };

  getSteps = () => {
    return ['Organization Profile', 'President Profile', 'Create an ad'];
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return this.orgnazationProfile();
      case 1:
        return this.presidentProfile();
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Uknown stepIndex';
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  orgnazationProfile = () => {
    const {
      textmask,
      college,
      error
    } = this.state;
    const {classes} = this.props;
    return (
      <Paper className={style.form} elevation={0} square={false} >
        <Grid container spacing={24}>
          <Grid item xs={12}>

            <Grid container spacing={40}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="with-placeholder"
                  label="Name of Organization"
                  placeholder="Organization Name"
                  className={classes.textField}
                  margin="normal"
                  error={!!error}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} margin="normal" fullWidth>
                  <InputLabel htmlFor="age-simple">College</InputLabel>
                  <Select
                    value={college}
                    className={classes.textField}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'college',
                      id: 'age-simple'
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>College of Information and Communications Technology</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={32}>
              <Grid item xs={6} sm={2}>
                <TextField
                  id="with-placeholder"
                  label="Acronym"
                  placeholder="Acronym"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={6} sm={2}>
                <FormControl className={classes.formControl} margin="normal">
                  <InputLabel htmlFor="formatted-text-mask-input">Recognition Number</InputLabel>
                  <Input
                    value={textmask}
                    onChange={this.handleChange('textmask')}
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustom}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormControl className={classes.formControl} margin="normal" >
                  <TextField
                    id="date"
                    label="Date of Formation"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl className={classes.formControl} margin="normal" fullWidth>
                  <InputLabel htmlFor="age-simple">Nature of Organization</InputLabel>
                  <Select
                    value={college}
                    className={classes.textField}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'college',
                      id: 'age-simple'
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Academic</MenuItem>
                  </Select>
                </FormControl>
              </Grid><Grid item xs={6} sm={3}>
                <FormControl className={classes.formControl} margin="normal" fullWidth>
                  <InputLabel htmlFor="age-simple">Type of Organization</InputLabel>
                  <Select
                    value={college}
                    className={classes.textField}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'college',
                      id: 'age-simple'
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>University Based</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  presidentProfile = () => {
    return (
      <Paper className={style.form} elevation={0} square={false} >
        <p>President Profile</p>
      </Paper>
    );
  }

  handleNext = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };


  render() {
    const {activeStep} = this.state;
    const {classes} = this.props;
    const steps = this.getSteps();

    return (
      <LayoutWithTopbarAndSidebar>
        <div className={classes.root}>
          <Paper elevation={1} square={false} >
            <Stepper className={style.stepper} activeStep={activeStep} alternativeLabel>
              {steps.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {this.getStepContent(activeStep)}

            <div className={style.bottomButton}>
              {this.state.activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
                  </Typography>
                  <Button onClick={this.handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                    >
                  Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default withStyles(styles)(AddOrganization);
