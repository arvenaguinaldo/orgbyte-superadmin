import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1,
    padding: 'none'
  },
  app: {
    backgroundColor: '#5C181D',
    color: 'white',
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    amrgin: 'none'
  },
  label: {
    '&:hover': {
      backgroundColor: '#3c080c'
    }
  }
};
class SimpleTabs extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.app}>
          <Tabs>
            <Tab label="Home" className={classes.label} />
            <Tab label="Announcement" className={classes.label} />
            <Tab label="Event" className={classes.label} />
            <Tab label="Organization" className={classes.label} />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
