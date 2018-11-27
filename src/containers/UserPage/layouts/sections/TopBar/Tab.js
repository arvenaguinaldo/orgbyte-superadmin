import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';

const styles = {
  root: {
    flexGrow: 1,
    paddingRight: 0
  },
  app: {
    backgroundColor: '#5c181d',
    color: 'white',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  },
  label: {
    textAlign: 'center',
    margin: 0,
    height: '100%',
    fontSize: '35%',
    '&:hover': {
      backgroundColor: '#3c080c',
      color: 'white'
    }
  },
  gridright: {
    padding: 0
  }
};
class SimpleTabs extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.app}>
          <Grid container spacing={0} className={classes.gridright}>
            <Center>
              <Tabs>
                <Tab component={Link} to="/" label="Home" className={classes.label} />
                <Tab component={Link} to="/announcements" label="Announcements" className={classes.label} />
                <Tab component={Link} to="/events" label="Events" className={classes.label} />
                <Tab component={Link} to="/organizations" label="Organizations" className={classes.label} />
              </Tabs>
            </Center>
          </Grid>

        </AppBar>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
