import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';

class Soonest extends React.Component {
  render() {
    return (
      <Card>
        <Grid container spacing={8}>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="display1" >
ANNOUNCEMENTS
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card >
              <Grid container spacing={16}>
                <Grid item xs={3}>
                  <Card >
                    <CardMedia

                      image="https://i.postimg.cc/jdsys9Mz/announcement_Balangayan.jpg"
                    />
                  </Card>
                </Grid>
                <Grid item xs={9} >
                  <Paper >
                    <Typography variant="title">
                Announcement Title
                    </Typography>
                    <Typography variant="caption">
                Posted by:
                    </Typography>
                    <Typography variant="body1">
                Announcement Summary asjdbawubaskaaudhba aosdbawodjbaoidub sdja kdwdub asdjawn dasd oauiwd
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default Soonest;
