import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {createStructuredSelector} from 'reselect';
import {makeSelectEventsList, makeSelectEventsMeta} from 'redux/selectors/events';
import {makeSelectCurrentUser} from 'redux/selectors/auth';
import {fetchEvents} from 'redux/actions/events';


import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Print from '@material-ui/icons/LocalPrintshop';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

// import myStyles from './Announcements.scss';
const columns = [
  {
    name: 'Name\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'Venue\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'Start Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'End Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'Nature of Event',
    options: {
      filter: true
    }
  },
  {
    name: 'Ticket Price',
    options: {
      filter: true
    }
  },
  {
    name: 'No. of Attendees',
    options: {
      filter: false
    }
  },
  {
    name: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => {
        return (
          <Tooltip title={'Preview download'}>
            <Link key={value} to={'/admin/reports/' + value + '/attendees'}>
              <IconButton>
                <Print />
              </IconButton>
            </Link>
          </Tooltip>
        );
      }
    }
  }

];


class AttendeeList extends Component {

  static propTypes = {
    events: PropTypes.array.isRequired
  };

  static defaultProps = {
    events: []
  };

  render() {
    const options = {
      selectableRows: false,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 15],
      filter: true,
      print: false,
      download: false
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <MUIDataTable
          title={'Event List'}
          options={options}
          data={this.props.events.map((event) => {
            return [
              event.name,
              event.venue,
              moment(event.starts).format('MMM DD YYYY h:mm A'),
              moment(event.ends).format('MMM DD YYYY h:mm A'),
              event.nature_of_event.toUpperCase(),
              event.ticket_price_type.toUpperCase(),
              '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + (event.number_of_attendees - event.available_slots),
              event.id
            ];
          })}
          columns={columns}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  events: makeSelectEventsList(),
  user: makeSelectCurrentUser(),
  meta: makeSelectEventsMeta()
});

const withRedux = connect(mapStateToProps, {fetchEvents});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchEvents();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(AttendeeList);
