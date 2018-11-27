import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
// import ImageUploader from 'react-images-upload';
// import Dropzone from 'react-dropzone';

import {Field, reduxForm, FormSection, change} from 'redux-form';

import {addOrganization} from 'redux/actions/organizations';
import {fetchColleges} from 'redux/actions/colleges';
import {fetchOrganizationNatures} from 'redux/actions/organization_natures';

import {makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {makeSelectCollegesList} from 'redux/selectors/colleges';
import {makeSelectOrganizationNaturesList} from 'redux/selectors/organization_natures';

import {createTextMask} from 'redux-form-input-masks';
import {validate, warn} from 'utils/Validations/AddOrganization';

import fetchInitialData from 'hoc/fetchInitialData';

// Redux Material UI Forms
import {renderTextField, renderSelectField, renderDatePicker, renderCircleColorPicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import FileUpload from 'components/FileUpload/FileUpload';

// material ui core
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SubmitButton from 'components/SubmitButton/SubmitButton';

// layout & styles
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import style from './AddOrganization.scss';

const styles = theme => ({
  root: {
    width: '100%'
  },
  Paper: {
    padding: '50px'
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
  button: {
    width: '300px'
  }
});

class AddOrganization extends Component {
  static propTypes = {
    addOrganization: PropTypes.func,
    classes: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    colleges: PropTypes.array.isRequired,
    organizationNatures: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired
  };

  state = {
    selectedDate: new Date(),
    selectedLogo: null,
    color: ['#5C181D', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
      '#ff9800', '#ff5722', '#795548', '#607d8b'],
    selectedColor: '#5C181D',
    activeStep: 0,
    logo: null,
    files: []
  };

  onSubmit = (values, dispatch) => {
    _.set(values.user, 'password', values.user.last_name + values.organization.acronym);
    // _.set(values.organization, 'logo', this.state.files);
    console.log(values);
    dispatch(addOrganization(values, (data) => { this.fileUpload.processQueue(data); }));
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

  handleUploadSuccess = (file, response) => {
    this.setState({logo: response});
    console.log(response);
  }


  imageUploadHandler = (event) => {
    event.preventDefault();
    this.setState({
      selectedLogo: URL.createObjectURL(event.target.files[0])
    });
  }

  handleColorChangeComplete = (color) => {
    const {dispatch} = this.props; // eslint-disable-line react/prop-types
    this.setState({selectedColor: color.hex});
    dispatch(change('AddOrganizationForm', 'organization[color_theme]', color.hex));
  };


  orgnazationProfile = () => {
    const recognitionNumberMask = createTextMask({
      pattern: '99-999',
      placeholder: ' '
    });
    const moment = require('moment');
    const currentDate = moment().format('YYYY-MM-DD');

    return (
      <FormSection name="organization">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={40}>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="name"
                  component={renderTextField}
                  label="Organization Name"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Field
                  name="organization_type_id"
                  component={renderSelectField}
                  label="Type of Organization"
                  fullWidth
                >
                  <option value="" />
                  <option value={1}>Univesity Based</option>
                  <option value={2}>College Based</option>
                </Field>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Field
                  name="organization_nature_id"
                  component={renderSelectField}
                  label="Nature of Organization"
                  fullWidth
                >
                  <option value="" />
                  {this.props.organizationNatures.map((nature) => {
                    return (
                      <option key={nature.id} value={nature.id}> {nature.name} </option>
                    );
                  })}
                </Field>

              </Grid>
            </Grid>

            <Grid container spacing={32}>
              <Grid item xs={6} sm={6} md={2}>
                <Field
                  name="acronym"
                  component={renderTextField}
                  label="Acronym"
                  fullWidth
                />
              </Grid>

              <Grid item xs={6} sm={6} md={2}>
                <Field
                  name="recognition_number"
                  component={renderTextField}
                  label="Recognition Number"
                  fullWidth
                  {...recognitionNumberMask}
                />
              </Grid>

              <Grid item xs={6} sm={6} md={2}>
                <Field
                  name="formation"
                  component={renderDatePicker}
                  selected={this.state.selectedDate}
                  label="Date of Formation"
                  fullWidth
                  maxDate={currentDate}
                  maxDateMessage="Date should not be after maximal date"
                />
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
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
      </FormSection>
    );
  }

  presidentProfile = () => {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });
    return (
      <FormSection name="user">
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
              <Grid item xs={12} sm={12} md={3}>
                <Field
                  name="email"
                  component={renderTextField}
                  label="Email"
                  fullWidth
                />
              </Grid>

              <Grid item xs={6} sm={12} md={3}>
                <Field
                  name="contact_number"
                  component={renderTextField}
                  label="Contact Number"
                  fullWidth
                  {...contactNumberMask}
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
      </FormSection>
    );
  }

  personalize = () => {
    const {color, selectedColor} = this.state;

    return (
      <FormSection name="organization">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={24}>


              <Grid item xs={12} sm={12} md={6} >
                <Typography variant="h4" gutterBottom>
                      Upload your logo
                </Typography>


                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={7}>
                    {/* <Field component={UploadFile} name="logo" /> */}
                    {/* <Field component={UploadFile} name="logo" /> */}
                    {/* <Field
                      accept="image/jpeg, image/png"
                      name="logo"
                      type="file"
                      component={renderInput}
                      label="Upload a image"
                      fullWidth
                    /> */}
                    {/* <Dropzone
                      onDrop={this.onDrop}
                      onFileDialogCancel={this.onCancel}
                    >
                      <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone> */}
                    <FileUpload
                      paramName="logo"
                      maxFilesize={200}
                      autoProcessQueue={false}
                      ref={(element) => { this.fileUpload = element; }}
                      onUploadSuccess={this.handleUploadSuccess}
                      uploadUrl="http://localhost:3000/organizations/logo"
                      label="Upload a image"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h4" gutterBottom>
                      Choose a color
                </Typography>

                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6} >
                    <Paper style={{backgroundColor: selectedColor}} className={style.colorPreviewBox} elevation={0} square={false} />
                  </Grid>
                </Grid>


                <Grid container spacing={24} >
                  <Grid item xs={12} sm={12} md={6} >
                    <Field
                      name="color_theme"
                      fieldName="color_theme"
                      component={renderCircleColorPicker}
                      colors={color.hex}
                      color={selectedColor}
                      onChangeComplete={this.handleColorChangeComplete}
                    />
                  </Grid>
                </Grid>

              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </FormSection>
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
    const {classes, meta} = this.props;
    const steps = this.getSteps();

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types

    return (
      <LayoutWithTopbarAndSidebar>
        <form onSubmit={handleSubmit(this.onSubmit)} name="createOrganization">
          <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
            Add Organization
            </Typography>
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
                  <Button onClick={this.handleReset}>Reset</Button>
                ) : (
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                      color="primary"
                    >
                    Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <SubmitButton loading={meta.isLoading} valid={!valid}>
                      SUBMIT
                      </SubmitButton>
                    ) : (
                      <Button variant="contained" color="primary" onClick={this.handleNext} disabled={!valid}>
                        Next
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Paper>
          </div>
        </form>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organizationNatures: makeSelectOrganizationNaturesList(),
  colleges: makeSelectCollegesList(),
  meta: makeSelectOrganizationsMeta()
});

const mapDispatchToProps = {
  addOrganization,
  fetchColleges,
  fetchOrganizationNatures
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOrganizationNatures();
  props.fetchColleges();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'AddOrganizationForm',
    fields: ['password'],
    initialValues: {
      user: {
        user_type_id: 2,
        position: 'President'
      }
    },
    destroyOnUnmount: false,
    validate,
    warn
  }),
  withStyles(styles)
)(AddOrganization);
