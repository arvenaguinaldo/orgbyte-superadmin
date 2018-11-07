import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {renderTextField, renderDateTimePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// actions
import {createAnnouncement} from 'redux/actions/announcements';
import {makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';

import FileUpload from 'components/FileUpload/FileUpload';
import SubmitButton from 'components/SubmitButton/SubmitButton';

import {validate} from 'utils/Validations/LoginAdmin';

import myStyles from './Announcements.scss';

const styles = theme => ({
  root: {
    width: '100%'
  },
  Paper: {
    padding: '50px'
  },
  sendButton: {
    flex: 1
  },
  grid: {
    backgroundColor: '#5F1D24'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  button: {
    margin: 20
  }
});

class AddAnnouncements extends Component {
    static propTypes = {
      meta: PropTypes.object
    };
    state = {
      startsDate: new Date('YYYY-MM-DDT00:00:00.000Z'),
      endsDate: new Date()
    }

    onSubmit = (values, dispatch) => {
      dispatch(createAnnouncement(values));
    };

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
                        disablePast
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
                    <FileUpload paramName="file" maxFilesize={200} size="small" uploadUrl="http://s3.ap-southeast-1.amazonaws.com/orgbyte" label="Upload or Drag an Image" />
                  </Grid>


                  <Grid container spacing={40}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
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

const withRedux = connect(mapStateToProps, {createAnnouncement});

export default compose(
  withRedux,
  reduxForm({
    form: 'AnnouncementsForm',
    destroyOnUnmount: false,
    validate
  }),
  withStyles(styles)
)(AddAnnouncements);
