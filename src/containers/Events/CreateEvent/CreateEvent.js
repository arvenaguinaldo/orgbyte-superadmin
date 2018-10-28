import React, {Component} from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import moment from 'moment';

import {makeSelectEventsMeta} from 'redux/selectors/events';

// Redux Form
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderDateTimePicker, renderRadioButton, renderCheckbox} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import FileUpload from 'components/FileUpload/FileUpload';
import {createNumberMask} from 'redux-form-input-masks';
import {validate, warn} from 'utils/Validations/CreateEvent';

import {createEvent} from 'redux/actions/events';
// import GoogleSearchPlaces from 'components/GoogleSearchPlaces/GoogleSearchPlaces';

// import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
// import Geosuggest from 'react-geosuggest';

// Material UI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import style from './CreateEvent.scss';


// const onSuggestionSelected = (suggestion) => {
//   console.log(suggestion.description);
// };

class CreateEvent extends Component {
  // static propTypes = {
  //   change: PropTypes.func.isRequired
  // }

  state = {
    startsDate: new Date('2018-01-01T00:00:00.000Z'),
    endsDate: new Date()
  };

  onSubmit = (values, dispatch) => {
    dispatch(createEvent(values));
  };

  handleStartsDateChange = (date) => {
    this.setState({startsDate: date});
  }

  handleEndsDateChange = (date) => {
    this.setState({endsDate: date});
  }

  render() {

    const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types

    const checkboxLabel = [
      {label: 'Members', name: 'members'},
      {label: 'Bulsuans', name: 'bulsuans'},
      {label: 'Non - Bulsuans', name: 'non_bulsuans'}
    ];

    const priceMask = createNumberMask({
      prefix: '₱',
      decimalPlaces: 2,
      guide: true
    });

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>
          Create Event
        </Typography>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Paper className={style.form} elevation={0} square={false} >
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={12}>

                <Typography variant="h5">
                  Event Details
                </Typography>

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      name="name"
                      component={renderTextField}
                      label="Event Name"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                {/* <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      fullWidth
                      name="venue"
                      autoFocus={false}
                      placeholder="Venue"
                      onSuggestionSelected={onSuggestionSelected}
                      suggestionscontainerprops={{style: {width: '0px'}}}
                      component={renderMUIPlacesAutocomplete}
                    />
                  </Grid>
                </Grid> */}

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      name="venue"
                      component={renderTextField}
                      label="Venue"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={3}>
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

                  <Grid item xs={12} sm={12} md={3}>
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

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      name="number_of_attendees"
                      component={renderTextField}
                      label="Number of Attendees"
                      type="number"
                      fullWidth
                    />
                  </Grid>
                </Grid>


                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormLabel component="legend">{'Event Poster'}</FormLabel>
                    <br />
                    <FileUpload paramName="file" maxFilesize={200} uploadUrl="http://s3.ap-southeast-1.amazonaws.com/orgbyte" label="Drag or Upload a image" />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      name="description"
                      component={renderTextField}
                      label="Description"
                      multiline
                      rows={5}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      name="nature_of_event"
                      component={renderRadioButton}
                      label="Nature of Event"
                      fullWidth
                    >
                      <FormControlLabel value="curricular" control={<Radio color="primary" />} label="Curricular" />
                      <FormControlLabel value="co_curricular" control={<Radio color="primary" />} label="Co - Curricular" />
                    </Field>
                  </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom>
                  Create Ticket
                </Typography>

                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      name="ticket_price_type"
                      component={renderRadioButton}
                      label="Ticket Price Type"
                      fullWidth
                    >
                      <FormControlLabel value="free" control={<Radio color="primary" />} label="Free Ticket" />
                      <FormControlLabel value="paid" control={<Radio color="primary" />} label="Paid Ticket" />
                    </Field>
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormLabel component="legend">{'Attendees'}</FormLabel>
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

                <br />
                <br />
                <FormLabel component="legend">{'Ticket Price'}</FormLabel>
                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Field
                      name="members_price"
                      component={renderTextField}
                      label="Members Price"
                      fullWidth
                      {...priceMask}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Field
                      name="bulsuans_price"
                      component={renderTextField}
                      label="Bulsuans Price"
                      fullWidth
                      {...priceMask}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Field
                      name="non_bulsuans_price"
                      component={renderTextField}
                      label="Non - Bulsuans Price"
                      fullWidth
                      {...priceMask}
                    />
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </Paper>
          <div className={style.bottomButton}>
            <Button component={Link} to="/events" color="primary" className={style.button}>
                  CANCEL
            </Button>

            <SubmitButton loading={meta.isLoading} valid={!valid}>
                  SUBMIT
            </SubmitButton>
          </div>
        </form>
      </LayoutWithTopbarAndSidebar>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  meta: makeSelectEventsMeta()
});

const withRedux = connect(mapStateToProps, null);

export default compose(
  withRedux,
  reduxForm({
    form: 'CreateEventForm',
    destroyOnUnmount: false,
    validate,
    warn
  })
)(CreateEvent);
