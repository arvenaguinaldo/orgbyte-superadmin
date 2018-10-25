import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Venue from '@material-ui/icons/PinDrop';
import Date from '@material-ui/icons/DateRange';
import Event from '@material-ui/icons/Event';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import More from '@material-ui/icons/ArrowForward';
import Input from '@material-ui/core/Input';
import {CardMedia} from '@material-ui/core';
import TopBar from 'containers/TopBar/Topbar';

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
    backgroundColor: theme.palette.background.paper,
    padding: 'opx'
  },
  toptab: {
    minWidth: 30,
    border: 'white'
  },
  left: {
    textAlign: 'center'
  },
  card: {
    height: '390px'
  },
  card2: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px'
  },
  title: {
    color: 'white'
  },
  eventName: {
    fontWeight: 'bold'
  },
  eventDetails: {
    fontWeight: 'bold',
    lineHeight: '25px'
  },
  paper: {
    padding: '0px',
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)'
    }
  },
  bg: {
    marginTop: '200px'
  },
  paper2: {
    margin: '10px',
    padding: '0px',
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)'
    }
  },
  image: {
    backgroundColor: 'blue',
    height: '200px'
  },
  image2: {
    backgroundColor: 'blue',
    height: '100px  '
  },
  host: {
    backgroundColor: '#d7d7d7'
  },
  divide: {
    paddingTop: '10px'
  },
  icon: {
    padding: '0px',
    fontSize: '20px'
  },
  list: {
    padding: '0px',
    lineHeight: '20px'
  },
  listName: {
    padding: '0px',
    lineHeight: '20px',
    fontWeight: 'bold'
  },
  media: {
    zIndex: '-1'
  },
  card3: {
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingBottom: '20px'
  },
  input: {
    margin: theme.spacing.unit,
    width: '95%'
  },
  head: {
    padding: '10px'
  },
  bg1: {
    marginTop: '-23.5%',
    height: '101%'
  },
  annou: {
    width: '100%',
    height: '100%'
  },
  events1: {
    height: '100%',
    width: '100%'
  },
  logo: {
    width: '300px',
    height: '45px',
    background: '#5f1d24',
    boxShadow: 'none',
    padding: '5px'
  },
  logo1: {
    height: '100%',
    width: '60%'
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

    return (
      <div className={classes.root}>
        <TopBar />

        <Card className={classes.card}>
          <Grid container spacing={0}>
            <Grid item xs={12} />
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Paper className={classes.bg}>
                <Card className={classes.head}>
                  <Paper className={classes.type}>
                    <Input
                      placeholder="Search Organization"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description'
                      }}
                    />
                  </Paper>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={12} />
          </Grid>
          <CardMedia
            className={classes.bg1}
            image="https://preview.ibb.co/kmsk5K/BGLOGIN.jpg"
          />
        </Card>

        <Card className={classes.card2}>
          <Toolbar className={classes.divide}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="h5">
                 EVENTS
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={0}>
                  <Grid item xs={4} />
                  <Grid item xs={4} />
                  <Grid item xs={4}>
                    <Button color="inherit">
                      <Typography variant="caption">
                See more
                      </Typography>
                      <More />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          <CardContent>
            <Grid container spacing={16}>
              <Grid item xs={2} xl={12}>
                <Paper className={classes.paper}>
                  <Card className={classes.image}>
                    <CardMedia
                      className={classes.events1}
                      image="https://preview.ibb.co/eKp4Ee/events.jpg"
                    />
                  </Card>
                  <MenuList component="div" disablePadding>
                    <MenuItem>
                      <ListItemIcon>
                        <Event className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Date className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT DATE</Typography>} className={classes.list} />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Venue className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                    </MenuItem>
                  </MenuList>
                  <Card className={classes.host}>
                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={2} xl={12}>
                <Paper className={classes.paper}>
                  <Card className={classes.image}>
                    <CardMedia
                      className={classes.events1}
                      image="https://preview.ibb.co/eKp4Ee/events.jpg"
                    />
                  </Card>
                  <MenuList component="div" disablePadding>
                    <MenuItem>
                      <ListItemIcon>
                        <Event className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Date className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT DATE</Typography>} className={classes.list} />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Venue className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                    </MenuItem>
                  </MenuList>
                  <Card className={classes.host}>
                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={2} xl={12}>
                <Paper className={classes.paper}>
                  <Card className={classes.image}>
                    <CardMedia
                      className={classes.events1}
                      image="https://preview.ibb.co/eKp4Ee/events.jpg"
                    />
                  </Card>
                  <MenuList component="div" disablePadding>
                    <MenuItem>
                      <ListItemIcon>
                        <Event className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Date className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT DATE</Typography>} className={classes.list} />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Venue className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                    </MenuItem>
                  </MenuList>
                  <Card className={classes.host}>
                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={2} xl={12}>
                <Paper className={classes.paper}>
                  <Card className={classes.image}>
                    <CardMedia
                      className={classes.events1}
                      image="https://preview.ibb.co/eKp4Ee/events.jpg"
                    />
                  </Card>
                  <MenuList component="div" disablePadding>
                    <MenuItem>
                      <ListItemIcon>
                        <Event className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Date className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT DATE</Typography>} className={classes.list} />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Venue className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                    </MenuItem>
                  </MenuList>
                  <Card className={classes.host}>
                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={2} xl={12}>
                <Paper className={classes.paper}>
                  <Card className={classes.image}>
                    <CardMedia
                      className={classes.events1}
                      image="https://preview.ibb.co/eKp4Ee/events.jpg"
                    />
                  </Card>
                  <MenuList component="div" disablePadding>
                    <MenuItem>
                      <ListItemIcon>
                        <Event className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Date className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT DATE</Typography>} className={classes.list} />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Venue className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                    </MenuItem>
                  </MenuList>
                  <Card className={classes.host}>
                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={2} xl={12}>
                <Paper className={classes.paper}>
                  <Card className={classes.image}>
                    <CardMedia
                      className={classes.events1}
                      image="https://preview.ibb.co/eKp4Ee/events.jpg"
                    />
                  </Card>
                  <MenuList component="div" disablePadding>
                    <MenuItem>
                      <ListItemIcon>
                        <Event className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Date className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT DATE</Typography>} className={classes.list} />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Venue className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                    </MenuItem>
                  </MenuList>
                  <Card className={classes.host}>
                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card className={classes.card3}>
          <Toolbar className={classes.divide}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="h5">
                 Announcements
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={0}>
                  <Grid item xs={4} />
                  <Grid item xs={4} />
                  <Grid item xs={4}>
                    <Button color="inherit">
                      <Typography variant="caption">
                See more
                      </Typography>
                      <More />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          <Card className={classes.paper2}>
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Card className={classes.image2}>
                  <CardMedia
                    className={classes.annou}
                    image="https://preview.ibb.co/dUgefK/announcement.jpg"
                  />
                </Card>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6">
                Announcement Title
                </Typography>
                <Typography variant="caption">
                Posted by:
                </Typography>
                <Typography variant="body1">
                Announcement Summary asjdbawubaskaaudhba aosdbawodjbaoidub sdja kdwdub asdjawn dasd oauiwd
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Card className={classes.paper2}>
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Card className={classes.image2}>
                  <CardMedia
                    className={classes.annou}
                    image="https://preview.ibb.co/dUgefK/announcement.jpg"
                  />
                </Card>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6">
                Announcement Title
                </Typography>
                <Typography variant="caption">
                Posted by:
                </Typography>
                <Typography variant="body1">
                Announcement Summary asjdbawubaskaaudhba aosdbawodjbaoidub sdja kdwdub asdjawn dasd oauiwd
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Card className={classes.paper2}>
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Card className={classes.image2}>
                  <CardMedia
                    className={classes.annou}
                    image="https://preview.ibb.co/dUgefK/announcement.jpg"
                  />
                </Card>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6">
                Announcement Title
                </Typography>
                <Typography variant="caption">
                Posted by:
                </Typography>
                <Typography variant="body1">
                Announcement Summary asjdbawubaskaaudhba aosdbawodjbaoidub sdja kdwdub asdjawn dasd oauiwd
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Card className={classes.paper2}>
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Card className={classes.image2}>
                  <CardMedia
                    className={classes.annou}
                    image="https://preview.ibb.co/dUgefK/announcement.jpg"
                  />
                </Card>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6">
                Announcement Title
                </Typography>
                <Typography variant="caption">
                Posted by:
                </Typography>
                <Typography variant="body1">
                Announcement Summary asjdbawubaskaaudhba aosdbawodjbaoidub sdja kdwdub asdjawn dasd oauiwd
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Card>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
