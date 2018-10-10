import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {CardMedia} from '@material-ui/core';
import {Card} from '@material-ui/core';

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 5}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  toptab: {
    minWidth: 30,
    border: 'white'
  },
  left: {
    textAlign: 'center'
  }

});

class SimpleTabs extends React.Component {
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
      <div className={classes.root}>
        <AppBar position="static">
          <Grid container spacing={24}>
            <Grid item xs={6} className="left">
              <Card className={classes.logo}>
                <CardMedia
                  className={classes.logo1}
                  image="https://s33.postimg.cc/6tw6ozo4f/mgjytmg.png"
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab classes={{root: classes.toptab}} label="Home" />
                <Tab classes={{root: classes.toptab}} label="Events" />
                <Tab classes={{root: classes.toptab}} label="Organizations" />
                <Tab classes={{root: classes.toptab}} label="Announcements" />
                <Tab classes={{root: classes.toptab}} label="Log In" />
              </Tabs>
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
