import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderDateTimePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {compose} from 'recompose';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
// import FileUpload from 'components/FileUpload/FileUpload';

// Material UI
import Grid from '@material-ui/core/Grid';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  };

  state = {
    selectedDate: new Date(),
    startsDate: new Date('YYYY-MM-DDT00:00:00.000Z'),
    endsDate: new Date()
  };

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
  }

  handleStartsDateChange = (date) => {
    this.setState({startsDate: date});
  }

  handleEndsDateChange = (date) => {
    this.setState({endsDate: date});
  }

  render() {
    const {handleSubmit} = this.props;


    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>

                <Grid item xs={10} sm={10} md={6} >
                  <Field
                    name="title"
                    component={renderTextField}
                    label="Title"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} sm={10} md={3} >
                  <Field
                    name="starts"
                    component={renderDateTimePicker}
                    label="Announcements Starts"
                    selected={this.state.startsDate}
                    onChange={this.handleStartsDateChange}
                    minDate={moment().format('YYYY-MM-DD')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} sm={10} md={3} >
                  <Field
                    name="ends"
                    component={renderDateTimePicker}
                    label="Announcements Ends"
                    selected={this.state.endsDate}
                    minDate={moment(this.state.startsDate).format('YYYY-MM-DD')}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Typography variant="h5" gutterBottom>Announcement Image (optional)</Typography>
              <Grid item xs={12} sm={12} md={3}>
                {/* <FileUpload paramName="file" maxFilesize={200} size="small" uploadUrl="http://s3.ap-southeast-1.amazonaws.com/orgbyte" label="Upload or Drag an Image" /> */}
              </Grid>


              <Grid container spacing={40}>
                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    name="content"
                    component={renderTextField}
                    label="Message"
                    fullWidth
                    multiline
                    rows="7"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}


export default compose(
  reduxForm({
    form: 'EditForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    enableReinitialize: true
  })
)(EditForm);
