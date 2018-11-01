import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';


import {createStructuredSelector} from 'reselect';
import {makeSelectEvent, makeSelectEventsMeta} from 'redux/selectors/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';
import {fetchEvent} from 'redux/actions/events';


// Material UI

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import Member from './Member';
import Bulsuans from './Bulsuans';
import NonBulsuans from './NonBulsuans';
import Multiple from './Multiple';

function TabContainer(props) {
  return (
    <div style={{padding: 8 * 3}}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

class Register extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    event: PropTypes.object
  }

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
  };


  render() {
    const {classes, event} = this.props;
    const {value} = this.state;

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Member" disabled={!event.members} />
              <Tab label="Bulsuan" disabled={!event.bulsuans} />
              <Tab label="Non - Bulsuan" disabled={!event.non_bulsuans} />
              <Tab label="CSV" />
            </Tabs>
          </AppBar>
          {value === 0 && event.members === true && <TabContainer> <Member event={event} /> </TabContainer>}
          {value === 1 && event.bulsuans === true && <TabContainer> <Bulsuans event={event} /> </TabContainer>}
          {value === 2 && event.non_bulsuans === true && <TabContainer> <NonBulsuans event={event} /> </TabContainer>}
          {value === 3 && <TabContainer> <Multiple event={event} /> </TabContainer>}
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  meta: makeSelectEventsMeta()
});

// const mapDispatchToProps = {
//   fetchEvent
// };

const withRedux = connect(mapStateToProps, {fetchEvent});

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
  withStyles(styles)
)(Register);
