import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Center from 'react-center';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background: ' #333'
  },
  text: {
    color: 'white'
  }
});

class Footer extends Component {
    static propTypes = {
      classes: PropTypes.object.isRequired
    };
    render() {
      const {classes} = this.props;
      return (
        <div>
          <Paper className={classes.root} elevation={1}>
            <Center>
              <Typography component="p" className={classes.text}>
                Paper can be used to build surface or other elements for your application.
              </Typography>
            </Center>
          </Paper>
        </div>
      );
    }
}

export default withStyles(styles)(Footer);
