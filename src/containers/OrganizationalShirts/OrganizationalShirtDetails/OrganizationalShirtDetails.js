import React, {Component} from 'react';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

// import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import LocationIcon from '@material-ui/icons/LocationOn';
// import Money from '@material-ui/icons/CheckCircle';
// import WatchIcon from '@material-ui/icons/WatchLater';
// import EventIcon from '@material-ui/icons/Event';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import MenuList from '@material-ui/core/MenuList';
import ListItem from '@material-ui/core/ListItem';
// import EventIcon from '@material-ui/icons/Event';
// import LocationIcon from '@material-ui/icons/LocationOn';
import styles from './OrganizationalShirtDetails.scss';

class Home extends Component {
  render() {
    const src = 'https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png';
    const style = {
      height: 400
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <Paper className={styles.Paper}>
          <Typography variant="h4" color="secondary" >OrganizationalShirt</Typography>
          <Grid container spacing={0}>

            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>
                <Grid item xs={10} sm={10} md={5} >
                  <div className={styles.detailsDiv}>
                    <ListItem>
                      <Typography variant="h6" className={styles.listTitle}>Name:</Typography>
                      <ListItemText primary={<Typography variant="h6">SWITS ORG SHIRT</Typography>} />
                    </ListItem>
                    <ListItem>
                      <Typography variant="h6" className={styles.listTitle}>Sizes:</Typography>
                      <ListItemText primary={<Typography variant="h6">S, M, L, XL, XXL</Typography>} />
                    </ListItem>
                    <ListItem>
                      <Typography variant="h6" className={styles.listTitle}>Price:</Typography>
                      <ListItemText primary={<Typography variant="h6">400.00</Typography>} />
                    </ListItem>
                  </div>
                  <Typography variant="body1" color="secondary" align="justify" className={styles.eventDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam porta euismod nisl vel mollis.
                    Suspendisse laoreet odio quis arcu ultrices, a dignissim ipsum aliquam.
                    Proin vestibulum felis ex, non feugiat magna vestibulum vitae.
                    Quisque maximus tincidunt tellus quis vestibulum. Maecenas scelerisque tortor id fringilla vestibulum.
                    In hac habitasse platea dictumst. Mauris aliquam tincidunt tempus. Phasellus placerat sit amet lectus vitae auctor.
                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque quis consequat eros.
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={6} >
                  <CardMedia className={styles.eventImage}>
                    <img src={src} style={style} alt={src} />
                  </CardMedia>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default Home;
