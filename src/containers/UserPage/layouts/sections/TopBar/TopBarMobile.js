import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {
  drawerPaper: {
    backgroundColor: '#5c181d',
    width: '100%',
    marginTop: '49px'
  },
  fullList: {
    marginTop: '20px',
    backgroundColor: '#5c181d',
    width: '100%'
  },
  label: {
    color: 'white',
    textAlign: 'center',
    margin: 0,
    fontWeight: 'bold',
    height: '100%',
    fontSize: '11px',
    '&:hover': {
      backgroundColor: '#3c080c',
      color: 'white'
    }
  }
};

class TopBarMobile extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    topBarMobileOpen: PropTypes.bool.isRequired,
    onToggleDrawer: PropTypes.func.isRequired
  }

  render() {
    const {classes, onToggleDrawer} = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
          <ListItem button component={Link} to="/" >
            <ListItemText primary={<Typography variant="button" className={classes.label}>Home</Typography>} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button component={Link} to="/announcements" >
            <ListItemText primary={<Typography variant="button" className={classes.label}>Announcements</Typography>} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button component={Link} to="/events" >
            <ListItemText primary={<Typography variant="button" className={classes.label}>Events</Typography>} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button component={Link} to="/organizations" >
            <ListItemText primary={<Typography variant="button" className={classes.label}>Organizations</Typography>} />
          </ListItem>
        </List>

        <Divider />

      </div>
    );

    return (
      <div>
        <Drawer
          anchor="top"
          open={this.props.topBarMobileOpen}
          onClose={onToggleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={onToggleDrawer}
            onKeyDown={onToggleDrawer}
          >
            {fullList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(TopBarMobile);
