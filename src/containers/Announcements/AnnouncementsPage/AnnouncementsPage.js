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
let tableData = {};
let tableDataArray = [];
let tableColumnsArray = [];
const tableColumnsStatus = [];
let tableColumns = {};
const options = {
  rowsPerPage: 5,
  onTableChange: (action, tableState) => {
    // get displayed table data
    tableDataArray = [];
    tableData = {...tableState};
    let counter = 0;
    tableData.displayData.map((values) => {
      tableDataArray[counter] = ({...values.data});
      counter += 1;
      return (null);
    });

    // get table column names
    tableColumnsArray = [];
    let counterb = 0;
    tableColumns = {...tableState};
    tableColumns.columns.map((values) => {
      if (values.display === 'true') {
        return (tableColumnsArray[counterb] = (values.name),tableColumnsStatus[counterb] = (values.display), counterb++); // eslint-disable-line
      }
      return null;
    });
    // get table columnstatus (display: true/false)
    let counterc = 0;
    tableColumns.columns.map((values) => {
        return (tableColumnsStatus[counterc] = (values.display), counterc++); // eslint-disable-line
    });

  }
};
class AnnouncementsPage extends Component {
  static propTypes = {
    classes: PropTypes.object,
    announcements: PropTypes.array.isRequired
  };

  static defaultProps = {
    announcements: []
  };
  printData = () => {
    tableDataArray.map((values) => {
      for (let x = 0; x < tableColumnsStatus.length; x += 1) {
        if (tableColumnsStatus[x] === 'false') {
          delete values[x] // eslint-disable-line
        }
      }
      return (null);
    });
    console.log(tableColumnsArray);
    console.log(tableDataArray);
  }
  render() {
    const columns = ['Title', 'Announcements Starts', 'Announcements Ends'];
    const {classes, announcements} = this.props;

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
          data={announcements.map((announcement) => {
            return [
              announcement.title,
              moment(announcement.starts).format('MMMM Do YYYY, h:mm a'),
              moment(announcement.ends).format('MMMM Do YYYY, h:mm a')
            ];
          })}
          columns={columns}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.printData} >
          Print PDF
        </Button>
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

