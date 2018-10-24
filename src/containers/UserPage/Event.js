import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia, MenuItem, Paper} from '@material-ui/core';
import Venue from '@material-ui/icons/PinDrop';
import Event from '@material-ui/icons/Event';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import ListItemText from '@material-ui/core/ListItemText';
import Center from 'react-center';

const styles = {
  card: {
    minWidth: 275,
    padding: 10,
    backgroundColor: 'transparent'
  },
  paper: {
    margin: 10,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  type: {
    color: 'black'},
  media: {
    height: 120,
    width: '100%'
  },
  list: {
    padding: '0px',
    lineHeight: '20px',
    width: '100%'
  },
  listName: {
    padding: '0px',
    lineHeight: '20px',
    fontWeight: 'bold'
  },
  events1: {
    height: '100%',
    width: '100%'
  },
  image: {
    backgroundColor: 'blue',
    height: '200px'
  },
  butt: {
    float: 'right'
  },
  month: {
    color: 'red'
  },
  date: {
    padding: '10px'
  }
};

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card}>
      <Grid container spacing={8}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="display1" className={classes.Heading}>
            UPCOMING EVENTS
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} />
      </Grid>
      <Grid container spacing={0}>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <Card className={classes.image}>
              <CardMedia
                className={classes.events1}
                image="https://i.postimg.cc/43SNX3Qq/launch.jpg"
              />
            </Card>
            <Grid container className={classes.date}>
              <Center>
                <Grid item lg={4} md={4} sm={4} xs={4} >
                  <Center>
                    <Typography variant="body1" className={classes.month}>OCTOBER</Typography>
                  </Center>
                  <Center>
                    <Typography variant="display1">28</Typography>
                  </Center>
                </Grid>
              </Center>
              <Grid item lg={8} md={8} sm={8} xs={8} >
                <MenuList component="div" disablePadding>
                  <MenuItem>
                    <ListItemIcon>
                      <Event className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Venue className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                  </MenuItem>
                </MenuList>
                <Center>
                  <Card className={classes.host}>

                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>

                </Center>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <Card className={classes.image}>
              <CardMedia
                className={classes.events1}
                image="https://i.postimg.cc/43SNX3Qq/launch.jpg"
              />
            </Card>
            <Grid container className={classes.date}>
              <Center>
                <Grid item lg={4} md={4} sm={4} xs={4} >
                  <Center>
                    <Typography variant="body1" className={classes.month}>OCTOBER</Typography>
                  </Center>
                  <Center>
                    <Typography variant="display1">28</Typography>
                  </Center>
                </Grid>
              </Center>
              <Grid item lg={8} md={8} sm={8} xs={8} >
                <MenuList component="div" disablePadding>
                  <MenuItem>
                    <ListItemIcon>
                      <Event className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Venue className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                  </MenuItem>
                </MenuList>
                <Center>
                  <Card className={classes.host}>

                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>

                </Center>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <Card className={classes.image}>
              <CardMedia
                className={classes.events1}
                image="https://i.postimg.cc/43SNX3Qq/launch.jpg"
              />
            </Card>
            <Grid container className={classes.date}>
              <Center>
                <Grid item lg={4} md={4} sm={4} xs={4} >
                  <Center>
                    <Typography variant="body1" className={classes.month}>OCTOBER</Typography>
                  </Center>
                  <Center>
                    <Typography variant="display1">28</Typography>
                  </Center>
                </Grid>
              </Center>
              <Grid item lg={8} md={8} sm={8} xs={8} >
                <MenuList component="div" disablePadding>
                  <MenuItem>
                    <ListItemIcon>
                      <Event className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Venue className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                  </MenuItem>
                </MenuList>
                <Center>
                  <Card className={classes.host}>

                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>

                </Center>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <Card className={classes.image}>
              <CardMedia
                className={classes.events1}
                image="https://i.postimg.cc/43SNX3Qq/launch.jpg"
              />
            </Card>
            <Grid container className={classes.date}>
              <Center>
                <Grid item lg={4} md={4} sm={4} xs={4} >
                  <Center>
                    <Typography variant="body1" className={classes.month}>OCTOBER</Typography>
                  </Center>
                  <Center>
                    <Typography variant="display1">28</Typography>
                  </Center>
                </Grid>
              </Center>
              <Grid item lg={8} md={8} sm={8} xs={8} >
                <MenuList component="div" disablePadding>
                  <MenuItem>
                    <ListItemIcon>
                      <Event className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT NAME</Typography>} className={classes.listName} component="h2" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Venue className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText inset primary={<Typography variant="body1">EVENT VENUE</Typography>} className={classes.list} />
                  </MenuItem>
                </MenuList>
                <Center>
                  <Card className={classes.host}>

                    <Typography variant="caption" className={classes.eventIMAGE}>
                    HOST ORGANIZATION
                    </Typography>
                  </Card>

                </Center>
              </Grid>


            </Grid>
          </Paper>
        </Grid>


      </Grid>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
