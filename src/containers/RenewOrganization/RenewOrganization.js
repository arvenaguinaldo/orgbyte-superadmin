import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import moment from 'moment';

import {Field, reduxForm, FormSection, change, propTypes} from 'redux-form';

import {addOrganization} from 'redux/actions/organizations';
import {fetchColleges} from 'redux/actions/colleges';
import {fetchOrganizationNatures} from 'redux/actions/organization_natures';

import {makeSelectCollegesList} from 'redux/selectors/colleges';
import {makeSelectOrganizationNaturesList} from 'redux/selectors/organization_natures';

import {createTextMask} from 'redux-form-input-masks';
import {validate, warn} from 'utils/Validations/AddOrganization';

import fetchInitialData from 'hoc/fetchInitialData';
import MUIDataTable from 'mui-datatables';

import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';


// Redux Material UI Forms
import {renderTextField, renderSelectField, renderDateTimePicker, renderDatePicker, renderCircleColorPicker, renderCheckbox} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import FileUpload from 'components/FileUpload/FileUpload';

// material ui core
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import generator from 'generate-password';

import SubmitButton from 'components/SubmitButton/SubmitButton';

// layout & styles
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import style from './RenewOrganization.scss';

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

const generatedPassword = generator.generate({
  length: 10,
  numbers: true
});

class RenewOrganization extends Component {
  static propTypes = {
    ...propTypes,
    addOrganization: PropTypes.func,
    classes: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    colleges: PropTypes.array.isRequired,
    organizations: PropTypes.array.isRequired,
    organizationNatures: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired
  };

  static defaultProps = {
    organizations: []
  };

  state = {
    startsDate: new Date('2018-01-01T00:00:00.000Z'),
    endsDate: new Date(),
    selectedDate: new Date(),
    selectedLogo: null,
    color: ['#5C181D', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
      '#ff9800', '#ff5722', '#795548', '#607d8b'],
    selectedColor: '#5C181D',
    activeStep: 0,
    columns: [
      {
        name: 'Id',
        options: {
          display: false,
          filter: false
        }
      },
      {
        name: 'Name\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
        options: {
          filter: false
        }
      },
      {
        name: 'Acronym',
        options: {
          filter: false
        }
      },
      {
        name: 'Recognition No.',
        options: {
          filter: false
        }
      },
      {
        name: 'Date of Formation',
        options: {
          filter: false
        }
      },
      {
        name: 'College\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
        options: {
          filter: true
        }
      },
      {
        name: 'Type\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
        options: {
          filter: true
        }
      }
    ]
  };

  onSubmit = (values, dispatch) => {
    dispatch(addOrganization(values));
  };

  getSteps = () => {
    return ['For Renewal', 'Organization Profile', 'President Profile', 'Personalize'];
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return this.renewalList();
      case 1:
        return this.orgnazationProfile();
      case 2:
        return this.presidentProfile();
      case 3:
        return this.personalize();
      default:
        return 'Uknown stepIndex';
    }
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
  handleFieldChange = () => {
    this.props.array.insert('organization_to_renew', 2, '123123');
    console.log(this.props);
  };
  handleStartsDateChange = (date) => {
    this.setState({startsDate: date});
  }

  handleEndsDateChange = (date) => {
    this.setState({endsDate: date});
  }
  renewalList = () => {
    // const columns = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      rowHover: false,
      onRowClick: (rowData) => {
        console.log(rowData[0], rowData[1]);
      }
    };
    const checkboxLabel = [
      {label: 'Copy of Constitution and by-laws(should there be ammendment/s made).\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0', name: '1'},
      {label: 'List of interim officers.', name: '2'},
      {label: 'Updated profile of officers and adviser/s, their respective positions, courses and year levels, student/employee number, contact numbers, addresses and signatures.', name: '3'},
      {label: 'Soft copy of accomplishment report of the preceding year and hard copy of audited financial statement duly signed by the treasurer, auditor, president and adviser/s.', name: '4'},
      {label: 'Written proposed activites for the entire school year including the tentative dates of implementation and a brief description of each activity.', name: '5'},
      {label: 'Letter of invitation to faculty/personell to serve as organization adviser signed by the organization president or his/her representatives.', name: '6'},
      {label: 'Signed letter from the chosen adviser/s addressed to the head for the Office of Student Organizations(OSO) accepting his/her role in the organization.', name: '7'},
      {label: 'Copies of voluntary membership form signed by the members (Organization with members 50 and above may ONLY submit a hard copy of membership list)', name: '8'}
    ];
    return (
      <FormSection name="organization">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={24}>


              <Grid item xs={12} sm={12} md={12} >
                <MUIDataTable
                  title={'Organization Renewal List'}
                  data={this.props.organizations.map((org) => {
                    return [
                      org.id,
                      org.name,
                      org.acronym,
                      org.recognition_number,
                      org.formation,
                      org.college_name,
                      org.organization_type_name
                    ];
                  })}
                  columns={this.state.columns}
                  options={options}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      name="organization_to_renew"
                      component={renderTextField}
                      label="Renew Organization"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      name="starts"
                      component={renderDateTimePicker}
                      label="Date Starts"
                      selected={this.state.startsDate}
                      onChange={this.handleStartsDateChange}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      name="ends"
                      component={renderDateTimePicker}
                      label="Date Ends"
                      selected={this.state.endsDate}
                      minDate={moment(this.state.startsDate).format('YYYY-MM-DD')}
                      fullWidth
                    />
                  </Grid>
                </Grid>

              </Grid>
              <Grid item xs={12} sm={12} md={12} >
                <Typography variant="h5">Application Requirements</Typography>
                <Typography variant="subtitle1">3 copies of the following
                  (2 originals and 1 photocopy for CollegeBased) and 2 original copies for University Wide.
                </Typography>
                {checkboxLabel.map(option => (
                  <Field
                    key={option.name}
                    name={option.name}
                    component={renderCheckbox}
                    label={option.label}
                  />
                ))}
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </FormSection>
    );
  }
  orgnazationProfile = () => {
    const recognitionNumberMask = createTextMask({
      pattern: '99-999',
      placeholder: ' '
    });
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
                  label="Nature of Organiation"
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
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={24}>


            <Grid item xs={12} sm={12} md={6} >
              <Typography variant="h4" gutterBottom>
                    Upload your logo
              </Typography>


              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={7}>
                  <FileUpload paramName="file" maxFilesize={200} uploadUrl="http://s3.ap-southeast-1.amazonaws.com/orgbyte" label="Upload a image" />
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

              <FormSection name="organization">
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
              </FormSection>

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
    const {classes, meta} = this.props;
    const steps = this.getSteps();

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types
    return (
      <LayoutWithTopbarAndSidebar>
        <form onSubmit={handleSubmit(this.onSubmit)} name="createOrganization">
          <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
            Renew Organization
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
  organizations: makeSelectOrganizationsList(),
  organizationNatures: makeSelectOrganizationNaturesList(),
  colleges: makeSelectCollegesList(),
  meta: makeSelectOrganizationsMeta()
});

const mapDispatchToProps = {
  fetchOrganizations,
  addOrganization,
  fetchColleges,
  fetchOrganizationNatures
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOrganizations();
  props.fetchOrganizationNatures();
  props.fetchColleges();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'RenewOrganizationForm',
    fields: ['password', 'organization_to_renew'],
    initialValues: {
      user: {
        password: generatedPassword,
        user_type_id: 2
      }
    },
    destroyOnUnmount: false,
    validate,
    warn
  }),
  withStyles(styles)
)(RenewOrganization);
