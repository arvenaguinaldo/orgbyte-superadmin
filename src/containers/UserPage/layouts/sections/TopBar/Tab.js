import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
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
    fontSize: '30%',
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
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Center>
                <Tabs>
                  <Tab component={Link} to="/" label="Home" className={classes.label} />
                  <Tab component={Link} to="/announcements" label="Announcements" className={classes.label} />
                  <Tab component={Link} to="/events" label="Events" className={classes.label} />
                  <Tab component={Link} to="/organizations" label="Organizations" className={classes.label} />
                </Tabs>
              </Center>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.gridright}>
              <Center>
                <FormControl>
                  <Input
                    id="input-with-icon-adornment"
                    placeholder="Search"
                    style={{color: 'white', borderBottom: 'solid white 2px', width: '100%', margin: 0, padding: 0}}
                    endAdornment={
                      <Button>
                        <AccountCircle style={{color: 'white'}} />
                      </Button>
                    }
                  />
                </FormControl>
              </Center>
            </Grid>

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
