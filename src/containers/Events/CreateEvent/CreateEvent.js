import React, {Component} from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {makeSelectEventsMeta} from 'redux/selectors/events';

// Redux Form
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderDateTimePicker, renderRadioButton, renderCheckbox} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import FileUpload from 'components/FileUpload/FileUpload';
import {createNumberMask} from 'redux-form-input-masks';
import {validate} from 'utils/Validations/CreateEvent';

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
    selectedDate: new Date('2018-01-01T00:00:00.000Z')
  };

  onSubmit = (values, dispatch) => {
    dispatch(createEvent(values));
  };


  render() {

    const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types

    const checkboxLabel = [
      {label: 'Members', name: 'members'},
      {label: 'Non - Members', name: 'non_members'}
    ];

    const priceMask = createNumberMask({
      prefix: '₱',
      decimalPlaces: 2,
      guide: true
    });

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="display1" gutterBottom>
          Create Event
        </Typography>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Paper className={style.form} elevation={0} square={false} >
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={12}>

                <Typography variant="headline">
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
                      selected={this.state.selectedDate}
                      label="Date Starts"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Field
                      name="ends"
                      component={renderDateTimePicker}
                      selected={this.state.selectedDate}
                      label="Date Ends"
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
                      name="event_type"
                      component={renderRadioButton}
                      label="Event Type"
                      fullWidth
                    >
                      <FormControlLabel value="curricular" control={<Radio color="primary" />} label="Curricular" />
                      <FormControlLabel value="co_curricular" control={<Radio color="primary" />} label="Co - Curricular" />
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

                <FormLabel component="legend">{'Event Price'}</FormLabel>
                <Grid container spacing={32}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Field
                      name="member_price"
                      component={renderTextField}
                      label="Member Price"
                      fullWidth
                      {...priceMask}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Field
                      name="non_member_price"
                      component={renderTextField}
                      label="Non-Member Price"
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
    form: 'CreateEvent',
    destroyOnUnmount: false,
    validate
  })
)(CreateEvent);
