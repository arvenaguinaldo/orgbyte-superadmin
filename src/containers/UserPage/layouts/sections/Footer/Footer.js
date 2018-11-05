import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Center from 'react-center';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Home from '@material-ui/icons/Home';
import Announcement from '@material-ui/icons/Announcement';
import Org from '@material-ui/icons/AccountBoxRounded';
import Event from '@material-ui/icons/Event';
import {SocialIcon} from 'react-social-icons';
import 'typeface-roboto';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background: ' #333'
  },
  text: {
    color: 'white',
    padding: 0
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
              <Grid container spacing={0}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <List component="nav">
                        <ListItem button>
                          <Typography variant="overline" className={classes.text}>Orgbyte</Typography>
                        </ListItem>

                        <ListItem button>
                          <ListItemIcon>
                            <Home />
                          </ListItemIcon>
                          <Typography variant="caption" className={classes.text}>Home</Typography>
                        </ListItem>

                        <ListItem button>
                          <ListItemIcon>
                            <Announcement />
                          </ListItemIcon>
                          <Typography variant="caption" className={classes.text}>Announcement</Typography>
                        </ListItem>

                        <ListItem button>
                          <ListItemIcon>
                            <Org />
                          </ListItemIcon>
                          <Typography variant="caption" className={classes.text}>Organization</Typography>
                        </ListItem>

                        <ListItem button>
                          <ListItemIcon>
                            <Event />
                          </ListItemIcon>
                          <Typography variant="caption" className={classes.text}>Event</Typography>
                        </ListItem>
                      </List>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <List component="nav">
                        <ListItem button>
                          <Typography variant="overline" className={classes.text}>Follow Us</Typography>
                        </ListItem>
                        <ListItem button>
                          <ListItemIcon>
                            <SocialIcon network="facebook" color="#171717" style={{height: 25, width: 25}} />
                          </ListItemIcon>
                          <Typography variant="caption" className={classes.text}>Facebook</Typography>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Center>
          </Paper>
        </div>
      );
    }
}

export default withStyles(styles)(Footer);
