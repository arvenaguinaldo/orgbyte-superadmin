import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Grid from '@material-ui/core/Grid';
import Center from 'react-center';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%'
  },
  app: {
    width: '100%',
    height: '50px',
    margin: 0,
    padding: 0
  },
  label: {
    textAlign: 'center',
    margin: 0,
    fontWeight: 'bold',
    height: '100%',
    fontSize: '11px',
    '&:hover': {
      backgroundColor: '#3c080c',
      color: 'white'
    }
  },
  gridright: {
    padding: 0
  },
  logo: {
    position: 'relative',
    zIndex: 1500,
    minWidth: '480px',
    width: '480px',
    minHeight: '86px',
    height: '86px',
    backgroundColor: 'white'
  },
  mobileLogo: {
    position: 'relative',
    zIndex: 1500,
    // minWidth: '295px',
    width: '295px',
    // minHeight: '86px',
    height: '60px',
    backgroundColor: 'white',
    marginTop: '25px'
  },
  tabs: {
    width: '1120px'
  }
};
class SimpleTabs extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    displayLogo: PropTypes.bool.isRequired
  }

  render() {
    const {classes, displayLogo} = this.props;

    return (
      <div className={classes.root}>
        <Center>
          {displayLogo ?
            <Tabs>
              <Tab component={Link} to="/" label="Home" className={classes.label} />
              <Tab component={Link} to="/announcements" label="Announcements" className={classes.label} />

              <Link to="/">
                <img src="https://i.postimg.cc/59CnSdDj/logo23.png" alt="logo" className={classes.logo} />
              </Link>

              <Tab component={Link} to="/events" label="Events" className={classes.label} />
              <Tab component={Link} to="/organizations" label="Organizations" className={classes.label} />
            </Tabs>
            :
            <Tabs>
              <Link to="/">
                <img src="https://i.postimg.cc/59CnSdDj/logo23.png" alt="logo" className={classes.mobileLogo} />
              </Link>
            </Tabs>
          }
        </Center>
      </div>
    );
  }
}


export default withStyles(styles)(SimpleTabs);
