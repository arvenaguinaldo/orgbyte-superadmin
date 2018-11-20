import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';

const styles = {
  root: {
    width: '100%'
  },
  tiles: {
    height: '10%',
    width: '10%',
    textAlign: 'center',
    margin: 5,
    padding: 0,
    borderRight: 'solid 2px #5C181D'
  },
  text: {
    color: '#5C181D',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  orgshirt: {
    width: '100%',
    height: '100%'
  },
  details: {
    fontWeight: 'bold',
    fontSize: '20px'
  }
};

function FolderList(props) {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <Typography variant="h5"> SWITS ORG SHIRT</Typography>
      <Grid container>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <div className={classes.image}>
            <img src="https://i.postimg.cc/1XMvZ54C/46482905-762860140729270-5836505868274761728-n.jpg" alt="orgShirt" className={classes.orgshirt} />
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <List>
            <ListItem>
              <ListItemText primary="PRICE" />
              <ListItemText primary="Php 250.00" className={classes.details} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="DESCRIPTION"
                secondary="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

"
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="SIZE" />
            </ListItem>
            <ListItem>
              <div className={classes.tiles}>
                <Center>
                  <ListItemText primary="XS" className={classes.text} />
                </Center>
              </div>
              <div className={classes.tiles}>
                <Center>
                  <ListItemText primary="S" className={classes.text} />
                </Center>
              </div>
              <div className={classes.tiles}>
                <Center>
                  <ListItemText primary="M" className={classes.text} />
                </Center>
              </div>
              <div className={classes.tiles}>
                <Center>
                  <ListItemText primary="L" className={classes.text} />
                </Center>
              </div>
              <div className={classes.tiles}>
                <Center>
                  <ListItemText primary="XL" className={classes.text} />
                </Center>
              </div>
              <div className={classes.tiles}>
                <Center>
                  <ListItemText primary="XXL" className={classes.text} />
                </Center>
              </div>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
