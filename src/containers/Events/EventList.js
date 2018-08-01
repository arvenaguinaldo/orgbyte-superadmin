import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {makeSelectEventsList, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvents} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Button from '@material-ui/core/Button';

class EventList extends Component {
  static propTypes = {
    events: PropTypes.array
  };

  static defaultProps = {
    events: []
  };

  render() {
    const styles = require('./EventList.scss');
    return (
      <LayoutWithTopbarAndSidebar>
        <div className={styles.root}>
          <header className={styles.topbar}>
            <h1>Events</h1>
          </header>
          <main className={styles.main}>
            <div>
              {this.props.events.map((event) => {
                return (
                  <div key={event.id}>
                    <span>{event.name}</span>
                    <span>{event.venue}</span>
                    <span>{event.ticket_price}</span>
                    <span>{event.date_time}</span>
                  </div>
                );
              })}

              <Button variant="outlined" color="primary">
                Default
              </Button>
            </div>
          </main>
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  events: makeSelectEventsList(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchEvents
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

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
)(EventList);
