import React, {Component} from 'react';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LocationIcon from '@material-ui/icons/LocationOn';
import WatchIcon from '@material-ui/icons/WatchLater';
import EventIcon from '@material-ui/icons/Event';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import styles from './EventDetails.scss';

class EventDetails extends Component {
  render() {
    const style = {
      height: 200
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

                <Grid item xs={10} sm={10} md={7} >
                  <Typography variant="display1" color="secondary" >IT Night: Carpe Noctem</Typography>
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
                    End Time: 10:00 PM
                    </Grid>
                  </Grid>
                  <Typography variant="body2" color="secondary" >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam porta euismod nisl vel mollis.
                    Suspendisse laoreet odio quis arcu ultrices, a dignissim ipsum aliquam.
                    Proin vestibulum felis ex, non feugiat magna vestibulum vitae.
                    Quisque maximus tincidunt tellus quis vestibulum. Maecenas scelerisque tortor id fringilla vestibulum.
                    In hac habitasse platea dictumst. Mauris aliquam tincidunt tempus. Phasellus placerat sit amet lectus vitae auctor.
                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque quis consequat eros.
                  </Typography>
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
