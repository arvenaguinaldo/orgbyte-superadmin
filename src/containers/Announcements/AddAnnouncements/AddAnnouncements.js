import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {renderTextField, renderDateTimePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// actions
import {createAnnouncement, createAnnouncementSuccess} from 'redux/actions/announcements';
import {makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';

import FileUpload from 'components/FileUpload/FileUpload';
import SubmitButton from 'components/SubmitButton/SubmitButton';

import {validate} from 'utils/Validations/AddAnnouncements';

import myStyles from './Announcements.scss';

class AddAnnouncements extends Component {
    static propTypes = {
      createAnnouncement: PropTypes.func.required,
      createAnnouncementSuccess: PropTypes.func.required,
      meta: PropTypes.object
    };
    state = {
      startsDate: new Date('YYYY-MM-DDT00:00:00.000Z'),
      endsDate: new Date()
    }

    onSubmit = (values) => {
      this.props.createAnnouncement(values, (data) => {
        this.fileUpload.processQueue(data.id);
        return {type: 'announcement_shirt_image_upload_in_progress'};
      });
    };

    handleUploadSuccess = (file, response) => {
      this.props.createAnnouncementSuccess(response);
    }

    handleStartsDateChange = (date) => {
      this.setState({startsDate: date});
    }
    handleEndsDateChange = (date) => {
      this.setState({endsDate: date});
    }
    render() {
      const moment = require('moment');
      const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
      return (
        <LayoutWithTopbarAndSidebar>
          <Typography variant="h4" gutterBottom>Announcements</Typography>
          <Paper className={myStyles.Paper}>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12}>

                  <Grid container spacing={40}>

                    <Grid item xs={10} sm={10} md={6} >
                      <Field
                        required
                        name="title"
                        component={renderTextField}
                        label="Title"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={10} sm={10} md={3} >
                      <Field
                        required
                        name="starts"
                        component={renderDateTimePicker}
                        label="Announcements Starts"
                        selected={this.state.startsDate}
                        onChange={this.handleStartsDateChange}
                        disablePast
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={10} sm={10} md={3} >
                      <Field
                        required
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
                    <FileUpload
                      paramName="image"
                      acceptedFiles="image/jpeg, image/png"
                      thumbnailWidth={200}
                      thumbnailHeight={200}
                      autoProcessQueue={false}
                      ref={(element) => { this.fileUpload = element; }}
                      onUploadSuccess={this.handleUploadSuccess}
                      uploadUrl="/announcements/image"
                      label="Drop image here or click to upload"
                    />
                  </Grid>


                  <Grid container spacing={40}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        required
                        name="content"
                        component={renderTextField}
                        label="Message"
                        fullWidth
                        multiline
                        rows="15"
                      />
                    </Grid>
                  </Grid>
                  <div className={myStyles.actionsDiv}>
                    <Button component={Link} to={'/admin/announcements/'} color="primary" className={myStyles.button}>
                      CANCEL
                    </Button>
                    <SubmitButton loading={meta.isLoading} valid={!valid}>
                        POST
                    </SubmitButton>
                  </div>

                </Grid>
              </Grid>
            </form>
          </Paper>
          <div />
        </LayoutWithTopbarAndSidebar>
      );
    }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectAnnouncementsMeta()
});

const mapDispatchToProps = {
  createAnnouncement,
  createAnnouncementSuccess
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
  reduxForm({
    form: 'AnnouncementsForm',
    destroyOnUnmount: false,
    validate
  })
)(AddAnnouncements);
