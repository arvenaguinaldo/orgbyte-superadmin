import React, {Component} from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import moment from 'moment';
import PropTypes from 'prop-types';

import {makeSelectEvent, makeSelectEventsMeta} from 'redux/selectors/events';
import {} from 'redux/selectors/events';
import {fetchEvent} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

// Redux Form
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderDateTimePicker, renderRadioButton, renderCheckbox} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import FileUpload from 'components/FileUpload/FileUpload';
import {createNumberMask} from 'redux-form-input-masks';
import {validate, warn} from 'utils/EditValidations/Events';

import {saveEdit} from 'redux/actions/events';
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
import style from './EditEvent.scss';

class EditEvent extends Component {

  static propTypes = {
    event: PropTypes.object
  };

  static defaultProps = {
    event: {}
  };

  state = {
    startsDate: new Date('2018-01-01T00:00:00.000Z'),
    endsDate: new Date(),
    members: this.props.event.members,
    dateToday: new Date()
  };

  componentDidMount() {
    this.handleInitialize();
    validate.starts === null; // eslint-disable-line
  }

  onSubmit = (values, dispatch) => {
    const {match: {params}} = this.props; // eslint-disable-line
    const param = {id: params.id, values}; // eslint-disable-line
    dispatch(saveEdit(param));
  };

  handleStartsDateChange = (date) => {
    this.setState({startsDate: date});
  }

  handleEndsDateChange = (date) => {
    this.setState({endsDate: date});
  }
  handleInitialize() {
    const initData = {
        'name': this.props.event.name, // eslint-disable-line
        'venue': this.props.event.venue, // eslint-disable-line
        'starts': this.props.event.starts, // eslint-disable-line
        'ends': this.props.event.ends, // eslint-disable-line
        'number_of_attendees': this.props.event.number_of_attendees, // eslint-disable-line
        'description': this.props.event.description, // eslint-disable-line
        'nature_of_event': this.props.event.nature_of_event, // eslint-disable-line
        'ticket_price_type': this.props.event.ticket_price_type, // eslint-disable-line
        'members_price': this.props.event.members_price, // eslint-disable-line
        'bulsuans_price': this.props.event.bulsuans_price, // eslint-disable-line
        'non_bulsuans_price': this.props.event.non_bulsuans_price, // eslint-disable-line
        'members': true, // eslint-disable-line
        'bulsuans': this.props.event.bulsuans, // eslint-disable-line
        'non_bulsuans': this.props.event.non_bulsuans // eslint-disable-line

    };
    this.props.initialize(initData); // eslint-disable-line react/prop-types
  }

  render() {
    const starts = (this.props.event.starts);
    const dateToday = this.state.dateToday;
    const {valid, handleSubmit, meta, event} = this.props; // eslint-disable-line react/prop-types

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
          Edit Event
        </Typography>
        <form onSubmit={handleSubmit(this.onSubmit)} name="event">
          <Paper className={style.form} elevation={0} square={false} >
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={12}>

                <Typography variant="h5">
                  {event.name}
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
                      required
                      name="venue"
                      component={renderTextField}
                      label="Venue"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={3}>
                    {starts !== undefined && starts > dateToday ?
                      (<Field
                        required
                        name="starts"
                        component={renderDateTimePicker}
                        label="Date Starts"
                        selected={this.state.startsDate}
                        onChange={this.handleStartsDateChange}
                        disablePast
                        fullWidth
                      />)
                      :
                      (<Field
                        required
                        name="starts"
                        component={renderDateTimePicker}
                        label="Date Starts"
                        selected={this.state.startsDate}
                        onChange={this.handleStartsDateChange}
                        fullWidth
                        disabled
                      />)
                    }
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Field
                      required
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
                      required
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
                      required
                      name="description"
                      component={renderTextField}
                      label="Description"
                      multiline
                      rows={7}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Field
                      name="nature_of_event"
                      component={renderRadioButton}
                      label="Nature of Event*"
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
                      label="Ticket Price Type*"
                      fullWidth
                    >
                      <FormControlLabel value="free" control={<Radio color="primary" />} label="Free Ticket" />
                      <FormControlLabel value="paid" control={<Radio color="primary" />} label="Paid Ticket" />
                    </Field>
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormLabel component="legend">{'Attendees*'}</FormLabel>
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
            <Button component={Link} to="/admin/events" color="primary" className={style.button}>
                  CANCEL
            </Button>

            <SubmitButton loading={meta.isLoading} valid={!valid}> {/* eslint-disable-line */}
                  SAVE CHANGES
            </SubmitButton>
          </div>
        </form>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchEvent
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchEvent(params.id);
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout,
  reduxForm({
    form: 'EditEventForm',
    destroyOnUnmount: false,
    enableReinitialize: false,
    validate,
    warn
  })
)(EditEvent);
