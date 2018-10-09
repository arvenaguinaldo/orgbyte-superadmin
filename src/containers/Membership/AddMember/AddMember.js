import React, {Component} from 'react';
import PropTypes from 'prop-types';


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

class AddMember extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
  };


  render() {
    const {classes} = this.props;
    const {value} = this.state;
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="display1" gutterBottom>
          Add a Member
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
          {value === 0 && <TabContainer> <Individual /> </TabContainer>}
          {value === 1 && <TabContainer>Section</TabContainer>}
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default withStyles(styles)(AddMember);
