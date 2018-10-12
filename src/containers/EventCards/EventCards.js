import React, {Component} from 'react';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import LocationIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './EventCards.scss';

class EventCards extends Component {
  render() {
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="display1" color="primary">Events List</Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>

            <Grid container spacing={40}>
              <Grid item xs={10} sm={10} md={3} >
                <Field
                  name="search"
                  component={renderTextField}
                  label="Search"
                  fullWidth
                />
              </Grid>

              <Grid item xs={10} sm={10} md={2}>
                <Field
                  name="time_period"
                  component={renderSelectField}
                  label="Time Period"
                  fullWidth
                >
                  <MenuItem value={1}>Past</MenuItem>
                  <MenuItem value={2}>Incoming</MenuItem>
                </Field>
              </Grid>

              <Grid item xs={10} sm={10} md={2}>
                <Field
                  name="cost"
                  component={renderSelectField}
                  label="Cost"
                  fullWidth
                >
                  <MenuItem value={1}>Paid</MenuItem>
                  <MenuItem value={2}>Free</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={10} sm={10} md={2}>
                <Field
                  name="type_of_event"
                  component={renderSelectField}
                  label="Type of Event"
                  fullWidth
                >
                  <MenuItem value={1}>Curricular</MenuItem>
                  <MenuItem value={2}>Co-curricular</MenuItem>
                </Field>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
        <Card className={styles.card}>
          <CardMedia
            component="img"
            alt="Event Image"
            height="200"
            width="140"
            image="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png"
            title="Event Image"
            className={styles.cardMedia}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
            7th IT Congress
            </Typography>
            <List disablePadding dense className={styles.list}>
              <ListItem >
                <ListItemIcon>
                  <EventIcon className={styles.listIcon} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" component="p">Mon, Oct 22, 7:00pm</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon className={styles.listIcon} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" component="p">KB-Gym, Malolos Bulacan</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="body2" component="p" className={styles.listIcon}>₱</Typography>
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" component="p">PHP 450.00</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" className={styles.actionsDiv}>
                View Details
            </Button>
          </CardActions>
        </Card>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default compose(
  reduxForm({
    form: 'EmailForm',
    destroyOnUnmount: false
  }, null),
  withStyles(styles)
)(EventCards);
