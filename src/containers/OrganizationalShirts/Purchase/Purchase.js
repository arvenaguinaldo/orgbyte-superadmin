import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


import {createStructuredSelector} from 'reselect';
import {makeSelectShirt} from 'redux/selectors/shirts';
import fetchInitialData from 'hoc/fetchInitialData';
import {fetchShirt} from 'redux/actions/shirts';


// Material UI

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import Individual from './Individual';

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

class Purchase extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    shirt: PropTypes.object
  }

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
  };


  render() {
    const {classes, shirt} = this.props;
    const {value} = this.state;

    if (!shirt) {
      return <Redirect to={'admin/shirts/addorganizationalshirt'} />;
    }
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>
          Purchase
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
              <Tab label="Individual" />
              <Tab label="Section" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer> <Individual shirt={shirt} /> </TabContainer>}
          {value === 1 && <TabContainer>Section</TabContainer>}
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  shirt: makeSelectShirt()
});

const mapDispatchToProps = {
  fetchShirt
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchShirt();
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles)
)(Purchase);
