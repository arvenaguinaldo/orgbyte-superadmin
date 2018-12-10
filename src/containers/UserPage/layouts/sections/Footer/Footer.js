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
import {Link} from 'react-router-dom';
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
    padding: 0,
    fontWeight: 'bold'
  },
  content: {
    color: 'white',
    fontWeight: 'none'
  },
  gridrightcont: {
    height: '30%',
    paddingTop: '20px'
  },
  gridRIght: {
    paddingLeft: 10,
    paddingRight: 10
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

                        <Link to={''}>
                          <ListItem button>
                            <ListItemIcon>
                              <Home />
                            </ListItemIcon>
                            <Typography variant="caption" className={classes.text}>Home</Typography>
                          </ListItem>
                        </Link>

                        <Link to={'/announcements'}>
                          <ListItem >
                            <ListItemIcon>
                              <Announcement />
                            </ListItemIcon>
                            <Typography variant="caption" className={classes.text}>Announcement</Typography>
                          </ListItem>
                        </Link>

                        <Link to={'/organizations'}>
                          <ListItem button>
                            <ListItemIcon>
                              <Org />
                            </ListItemIcon>
                            <Typography variant="caption" className={classes.text}>Organization</Typography>
                          </ListItem>
                        </Link>

                        <Link to={'/events'}>
                          <ListItem button>
                            <ListItemIcon>
                              <Event />
                            </ListItemIcon>
                            <Typography variant="caption" className={classes.text}>Event</Typography>
                          </ListItem>
                        </Link>
                      </List>
                    </Grid>


                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <List component="nav">
                        {/* <a href="https://web.facebook.com/ORGBYTE"> */}
                        <ListItem button>
                          <Typography variant="overline" className={classes.text}>Follow Us</Typography>
                        </ListItem>
                        <ListItem button>
                          <ListItemIcon>
                            <SocialIcon network="facebook" color="#171717" style={{height: 25, width: 25}} />
                          </ListItemIcon>
                          <Typography variant="caption" className={classes.text}>Facebook</Typography>
                        </ListItem>
                        {/* </a> */}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridRight}>
                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.gridrightcont}>
                      <Typography variant="caption" className={classes.text}> About Us </Typography>
                      <Typography variant="caption" component="p" className={classes.content}>OrgByte is a non-profit group that aims for the betterment of students and organizations in Bulacan State University. No officials or members of this university is neglected upon the formulation of this project. We are open for suggestions on how we can make our project better.</Typography>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.gridrightcont}>
                      <Typography variant="caption" className={classes.text}> Contact Us </Typography>
                      <Typography variant="caption" component="p" className={classes.content}>You may email us at orgbyte@gmail.com or through our telephone number (044) 794-2468 for your queries and suggestions. You may also like our facebook page facebook/orgbyte for more updates and details.</Typography>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.gridrightcont}>
                      <Typography variant="caption" className={classes.text}> Location  </Typography>
                      <Typography variant="caption" component="pre" className={classes.content}>0421 (APT 4) P. Mabini St. Barihan, Malolos City, 3000, Bulacan
© OrgByte | All rights reserved 2018
                      </Typography>
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
