import React, {Component} from 'react';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LocationIcon from '@material-ui/icons/LocationOn';
import Money from '@material-ui/icons/CheckCircle';
import WatchIcon from '@material-ui/icons/WatchLater';
import EventIcon from '@material-ui/icons/Event';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import styles from './EventDetails.scss';

class EventDetails extends Component {
  render() {
    const style = {
      height: 400
    };
    const columns = ['No', 'Student No.', 'Name', 'Section', 'Contact No.'];

    const data = [
      ['1', 'Officers', '2014-120436', 'Jeremiah Robles', '09163130373'],
      ['2', 'Officers', '2014-120436', 'Arven Aguinaldo', '0912345879']

    ];
    const src = 'https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png';

    return (
      <LayoutWithTopbarAndSidebar>
        <Paper className={styles.Paper}>
          <Grid container spacing={0}>

            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>

                <Grid item xs={10} sm={10} md={6} >
                  <Typography variant="display1" color="secondary" >IT Night: Carpe Noctem</Typography>
                  <MenuList>
                    <MenuItem>
                      <ListItemIcon >
                        <EventIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="January 25, 2017" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <LocationIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Venue: Hiyas ng Bulacan" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <WatchIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Start Time: 10:00 AM" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <WatchIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="End Time: 10:00 PM" />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Money />
                      </ListItemIcon>
                      <ListItemText inset primary="Ticket Price: Member - 250, NonBulSUan - 300" />
                    </MenuItem>
                  </MenuList>
                  <Typography variant="body1" color="secondary" align="justify" className={styles.eventDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam porta euismod nisl vel mollis.
                    Suspendisse laoreet odio quis arcu ultrices, a dignissim ipsum aliquam.
                    Proin vestibulum felis ex, non feugiat magna vestibulum vitae.
                    Quisque maximus tincidunt tellus quis vestibulum. Maecenas scelerisque tortor id fringilla vestibulum.
                    In hac habitasse platea dictumst. Mauris aliquam tincidunt tempus. Phasellus placerat sit amet lectus vitae auctor.
                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque quis consequat eros.
                  </Typography>
                  {/* <Typography variant="display1" color="secondary" >IT Night: Carpe Noctem</Typography>
                  <div className={style.detailsDiv}>
                    <Grid container direction="row" alignItems="center" spacing={8}>
                      <Grid item>
                        <EventIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary">January 25, 2017</Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" spacing={8}>
                      <Grid item>
                        <LocationIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary">Venue: Hiyas ng Bulacan</Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" spacing={8}>
                      <Grid item>
                        <WatchIcon color="secondary" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary" >Start Time: 10:00 AM</Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" spacing={8}>
                      <Grid item>
                        <WatchIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary" >End Time: 10:00 PM </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" spacing={8}>
                      <Grid item>
                        <WatchIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary" >Ticket Price: Member - 250, NonBulSUan - 300</Typography>
                      </Grid>
                    </Grid>
                  </div>
                  <Typography variant="body1" color="secondary" align="justify" className={styles.eventDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam porta euismod nisl vel mollis.
                    Suspendisse laoreet odio quis arcu ultrices, a dignissim ipsum aliquam.
                    Proin vestibulum felis ex, non feugiat magna vestibulum vitae.
                    Quisque maximus tincidunt tellus quis vestibulum. Maecenas scelerisque tortor id fringilla vestibulum.
                    In hac habitasse platea dictumst. Mauris aliquam tincidunt tempus. Phasellus placerat sit amet lectus vitae auctor.
                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque quis consequat eros.
                  </Typography> */}
                </Grid>
                <Grid item xs={10} sm={10} md={5} >
                  <CardMedia className={styles.eventImage}>
                    <img src={src} style={style} alt={src} />
                  </CardMedia>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className={styles.actionsDiv}>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Generate Certificate
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Register
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Check-In
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Import
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Edit Event
            </Button>
          </div>
        </Paper>
        <MUIDataTable
          title={'Attendees'}
          data={data}
          columns={columns}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default EventDetails;