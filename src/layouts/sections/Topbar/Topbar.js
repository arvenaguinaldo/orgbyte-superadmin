import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const drawerWidth = 250;

const styles = () => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#363736'
  }
});

class Topbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const {classes} = this.props;

    return (
      <AppBar
        position="absolute"
        className={classes.appBar}
        color="secondary"
      >
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            SUPER ADMIN
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Topbar);
