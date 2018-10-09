import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import EventIcon from '@material-ui/icons/Event';
import CheckCircle from '@material-ui/icons/CheckCircle';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  card: {
    minWidth: 275,
    width: 385
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
  }
});

class ResponsiveDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {fullScreen} = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open responsive dialog</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogContent>
            <Card className={styles.card}>
              <CardMedia
                className={styles.media}
                image="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png"
                title="Society for the Welfare of Information Technolohy Students"
                component="img"
                alt="SWITS LOGO"
                height="400"
                width="200"
              />
              <CardContent>
                <Typography className={styles.title} color="textSecondary">
                Society for the Welfare of Information Technolohy Students
                </Typography>
                <Typography variant="headline" component="h2">
                SWITS
                </Typography>
                <Typography color="textSecondary">
                CICT
                </Typography>
                <Typography component="p">
                President : Lara Beatrice Hilario
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
              <div className={styles.root}>
                <List>
                  <ListItem>
                    <Avatar>
                      <FaceIcon />
                    </Avatar>
                    <ListItemText primary="Current Members" secondary="1300" />
                  </ListItem>
                  <ListItem>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                    <ListItemText primary="Accomplished Events" secondary="20" />
                  </ListItem>
                  <ListItem>
                    <Avatar>
                      <CheckCircle />
                    </Avatar>
                    <ListItemText primary="Years in Service" secondary="5" />
                  </ListItem>
                </List>
              </div>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ResponsiveDialog);
