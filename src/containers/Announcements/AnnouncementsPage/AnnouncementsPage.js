import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import moment from 'moment';

import MUIDataTable from 'mui-datatables';
import {withStyles} from '@material-ui/core/styles';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Typography from '@material-ui/core/Typography';

import {createStructuredSelector} from 'reselect';
import {makeSelectAnnouncementsList, makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';
import {fetchAnnouncements} from 'redux/actions/announcements';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


// import myStyles from './Announcements.scss';

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
  button: {
    margin: 20
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});


const columns = ['Title', 'Announcements Starts', 'Announcements Ends'];


const options = {
  rowsPerPage: 5
};
class AnnouncementsPage extends Component {
  static propTypes = {
    classes: PropTypes.object,
    announcements: PropTypes.array.isRequired
  };

  static defaultProps = {
    announcements: []
  };

  render() {
    const {classes} = this.props;

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4">
            Announcements
        </Typography>
        <Button component={Link} to="/admin/announcements/add" variant="contained" color="primary" className={classes.button} >
          Add announcement
        </Button>
        <MUIDataTable
          title={'Announcements'}
          options={options}
          data={this.props.announcements.map((announcement) => {
            return [
              announcement.title,
              moment(announcement.starts).format('MMMM Do YYYY, h:mm a'),
              moment(announcement.ends).format('MMMM Do YYYY, h:mm a')
            ];
          })}
          columns={columns}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  announcements: makeSelectAnnouncementsList(),
  meta: makeSelectAnnouncementsMeta()
});

const withRedux = connect(mapStateToProps, {fetchAnnouncements});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchAnnouncements();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout,
  withStyles(styles)
)(AnnouncementsPage);

