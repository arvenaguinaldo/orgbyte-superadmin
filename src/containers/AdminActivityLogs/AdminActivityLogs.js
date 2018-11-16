import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectLogsList, makeSelectLogsMeta} from 'redux/selectors/logs';
import {fetchLogs} from 'redux/actions/logs';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

class AdminActivityLogs extends Component {
  static propTypes = {
    logs: PropTypes.array
  }
  render() {

    const columns = ['Admin name', 'Action', 'Name', 'Date and time'];
    const {logs} = this.props;

    const options = {
      filterType: 'checkbox'
    };

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>
          Activity logs
        </Typography>
        <MUIDataTable
          title={''}
          data={logs.map((log) => {
            return [
              log.admin_name,
              log.action,
              log.name,
              moment(log.created_at).format('MMMM Do YYYY, h:mm a')
            ];
          })}
          columns={columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  logs: makeSelectLogsList(),
  meta: makeSelectLogsMeta()
});

const withRedux = connect(mapStateToProps, {fetchLogs});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchLogs();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(AdminActivityLogs);
