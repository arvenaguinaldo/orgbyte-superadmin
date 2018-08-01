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
import FormHelperText from '@material-ui/core/FormHelperText';

import {CirclePicker} from 'react-color';

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
  input: {
    display: 'none'
  },
  button: {
    width: '300px'
  },
  hide: {
    display: 'none'
  }
});

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
    nameOfOrganization: '',
    college: '',
    acronym: '',
    recognitionNumber: '  -   ',
    date: '',
    natureOfOrganization: '',
    typeOfOrganization: '',
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    presidentCollege: '',
    selectedLogo: null,
    color: ['#5C181D', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
      '#ff9800', '#ff5722', '#795548', '#607d8b'],
    colorPreview: '#5C181D',
    activeStep: 0,
    error: ''
  };

  getSteps = () => {
    return ['Organization Profile', 'President Profile', 'Personalize'];
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return this.orgnazationProfile();
      case 1:
        return this.presidentProfile();
      case 2:
        return this.personalize();
      default:
        return 'Uknown stepIndex';
    }
  }

  handleChange = name => ({target: {value}}) => {
    this.setState({
      [name]: value
    });
  };

  imageUploadHandler = (event) => {
    event.preventDefault();
    this.setState({
      selectedLogo: URL.createObjectURL(event.target.files[0])
    });
  }

  handleColorChangeComplete = (color) => {
    this.setState({colorPreview: color.hex});
  };

  orgnazationProfile = () => {
    const {
      nameOfOrganization,
      college,
      acronym,
      recognitionNumber,
      date,
      natureOfOrganization,
      typeOfOrganization,
      error
    } = this.state;

    const {classes} = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>

          <Grid container spacing={40}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                value={nameOfOrganization}
                label="Name of Organization"
                placeholder="Organization Name"
                className={classes.textField}
                onChange={this.handleChange('nameOfOrganization')}
                margin="normal"
                error={!!error.nameOfOrganization}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <FormControl className={classes.formControl} margin="normal" error={!!error.college} fullWidth>
                <InputLabel htmlFor="age-simple">College</InputLabel>
                <Select
                  value={college}
                  className={classes.textField}
                  onChange={this.handleChange('college')}
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
                <FormHelperText>{error.college}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={32}>
            <Grid item xs={6} sm={6} md={2}>
              <TextField
                value={acronym}
                label="Acronym"
                placeholder="Acronym"
                className={classes.textField}
                onChange={this.handleChange('acronym')}
                margin="normal"
                error={!!error.acronym}
                fullWidth
              />
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <FormControl className={classes.formControl} margin="normal" error={!!error.recognitionNumber} fullWidth>
                <InputLabel htmlFor="formatted-text-mask-input">Recognition Number</InputLabel>
                <Input
                  value={recognitionNumber}
                  onChange={this.handleChange('recognitionNumber')}
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
                <FormHelperText>{error.recognitionNumber}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <FormControl className={classes.formControl} margin="normal" error={!!error.date} fullWidth>

                <TextField
                  value={date}
                  label="Date of Formation"
                  type="date"
                  className={classes.textField}
                  onChange={this.handleChange('date')}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />

                <FormHelperText>{error.date}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <FormControl className={classes.formControl} margin="normal" error={!!error.natureOfOrganization} fullWidth>
                <InputLabel htmlFor="age-simple">Nature of Organization</InputLabel>
                <Select
                  value={natureOfOrganization}
                  className={classes.textField}
                  onChange={this.handleChange('natureOfOrganization')}
                  inputProps={{
                    name: 'natureOfOrganization',
                    id: 'age-simple'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Academic</MenuItem>
                </Select>
                <FormHelperText>{error.natureOfOrganization}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <FormControl className={classes.formControl} margin="normal" error={!!error.typeOfOrganization} fullWidth>
                <InputLabel htmlFor="age-simple">Type of Organization</InputLabel>
                <Select
                  value={typeOfOrganization}
                  className={classes.textField}
                  onChange={this.handleChange('typeOfOrganization')}
                  inputProps={{
                    name: 'typeOfOrganization',
                    id: 'age-simple'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>University Based</MenuItem>
                </Select>
                <FormHelperText>{error.typeOfOrganization}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  presidentProfile = () => {
    const {
      lastName,
      firstName,
      middleName,
      email,
      presidentCollege,
      error
    } = this.state;
    const {classes} = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                value={lastName}
                label="Last Name"
                placeholder="Last Name"
                className={classes.textField}
                onChange={this.handleChange('lastName')}
                margin="normal"
                error={!!error.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                value={firstName}
                label="First Name"
                placeholder="First Name"
                className={classes.textField}
                onChange={this.handleChange('firstName')}
                margin="normal"
                error={!!error.firstName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                value={middleName}
                label="Middle Name"
                placeholder="Middle Name"
                className={classes.textField}
                onChange={this.handleChange('middleName')}
                margin="normal"
                error={!!error.middleName}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                value={email}
                label="Email"
                placeholder="Email"
                type="email"
                className={classes.textField}
                onChange={this.handleChange('email')}
                margin="normal"
                error={!!error.email}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <FormControl className={classes.formControl} margin="normal" error={!!error.presidentCollege} fullWidth>
                <InputLabel htmlFor="age-simple">College</InputLabel>
                <Select
                  value={presidentCollege}
                  className={classes.textField}
                  onChange={this.handleChange('presidentCollege')}
                  inputProps={{
                    name: 'presidentCollege',
                    id: 'age-simple'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>College of Information and Communications Technology</MenuItem>
                </Select>
                <FormHelperText>{error.presidentCollege}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  personalize = () => {
    const {selectedLogo, color, colorPreview} = this.state;
    const {classes} = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={24}>


            <Grid item xs={12} sm={12} md={6} >
              <Typography variant="display1" gutterBottom>
                  Upload your logo
              </Typography>


              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6} >
                  <Paper className={style.imagePreview} elevation={1} square={false}>
                    {selectedLogo === null ? (
                      <Typography className={style.yourLogoHere} variant="headline" gutterBottom>Your Logo Here</Typography>
                    ) : (<img className={style.selectedLogo} alt="Organization Logo" src={selectedLogo} />
                    )}
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    onChange={this.imageUploadHandler}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button color="primary" variant="contained" component="span" className={classes.button} fullWidth>
                        Upload a image
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="display1" gutterBottom>
                  Choose a color
              </Typography>

              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6} >
                  <Paper style={{backgroundColor: colorPreview}} className={style.colorPreviewBox} elevation={0} square={false} />
                </Grid>
              </Grid>

              <Grid container spacing={24} >
                <Grid item xs={12} sm={12} md={6} >
                  <CirclePicker
                    width={300}
                    circleSize={39}
                    circleSpacing={11}
                    colors={color}
                    onChangeComplete={this.handleColorChangeComplete}
                  />
                </Grid>
              </Grid>

            </Grid>

          </Grid>
        </Grid>
      </Grid>
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

            <Paper className={style.form} elevation={0} square={false} >
              {this.getStepContent(activeStep)}
            </Paper>

            <div className={style.bottomButton}>
              {activeStep === steps.length ? (
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
