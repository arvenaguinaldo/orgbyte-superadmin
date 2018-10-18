import React, {Component} from 'react';
import QrReader from 'react-qr-reader';
// import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import RemoteSubmitButton from 'containers/RemoteSubmitButton/RemoteSubmitButton';
import styles from './QRScan.scss';

class Home extends Component {
  // static propTypes = {
  //   edit: PropTypes.object.isRequired
  // };
  state = {
    delay: 300,
    result: 'No result'
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    // const {edit} = this.props;
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" color="secondary"> QR Scanner</Typography>
        <Paper className={styles.Paper}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={40}>
                <Grid item xs={6} sm={6} md={6}>
                  <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    className={styles.Scanner}
                    resolution={1000}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <div className={styles.detailsDiv}>
                    <Typography variant="h4" color="secondary">Attendee Details</Typography>
                    <List>
                      <ListItem className={styles.list}>
                        <Typography variant="h6" color="secondary" className={styles.listTitle}>Name:</Typography>
                        <ListItemText primary={<Typography variant="h6" color="secondary">Robles, Jermeiah B.</Typography>} />
                      </ListItem>

                      <ListItem className={styles.list}>
                        <Typography variant="body1" color="secondary" className={styles.listTitle}>Student Number:</Typography>
                        <ListItemText primary={<Typography variant="body1" color="secondary">2014-120436</Typography>} />
                      </ListItem>

                      <ListItem className={styles.list}>
                        <Typography variant="body1" color="secondary" className={styles.listTitle}>College:</Typography>

                        <ListItemText primary={<Typography variant="body1" color="secondary">CICT</Typography>} />
                      </ListItem>

                      <ListItem className={styles.list}>
                        <Typography variant="body1" color="secondary" className={styles.listTitle}>Course:</Typography>
                        <ListItemText primary={<Typography variant="body1" color="secondary">BSIT</Typography>} />
                      </ListItem>

                      <ListItem className={styles.list}>
                        <Typography variant="body1" color="secondary" className={styles.listTitle}>Year/Section/Group:</Typography>
                        <ListItemText primary={<Typography variant="body1" color="secondary">3B-G1</Typography>} />
                      </ListItem>

                      <ListItem className={styles.list}>
                        <Typography variant="body1" color="secondary" className={styles.listTitle}>Email:</Typography>
                        <ListItemText primary={<Typography variant="body1" color="secondary">jeremiah@gmail.com</Typography>} />
                      </ListItem>

                      <ListItem className={styles.list}>
                        <Typography variant="body1" color="secondary" className={styles.listTitle}>Contact Number:</Typography>
                        <ListItemText primary={<Typography variant="body1" color="secondary">09163130373</Typography>} />
                      </ListItem>

                      <ListItem className={styles.list}>
                        <Typography variant="h6" color="secondary" className={styles.listTitle}>Payment Status:</Typography>
                        <ListItemText primary={<Typography variant="h6" color="secondary">PAID</Typography>} />
                      </ListItem>

                    </List>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className={styles.submitButtonDiv}>
            <RemoteSubmitButton>
              SAVE
            </RemoteSubmitButton>
          </div>
        </Paper>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default Home;
