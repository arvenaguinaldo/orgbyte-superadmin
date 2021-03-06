import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import moment from 'moment';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {makeSelectShirtOrganization, makeSelectShirtSizes, makeSelectShirtsMeta} from 'redux/selectors/shirts';
import {fetchShirtOrganization} from 'redux/actions/shirts';
import {fetchSizes} from 'redux/actions/shirts';
import fetchInitialData from 'hoc/fetchInitialData';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import {Typography} from '@material-ui/core';

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
  },
  name: {
    fontWeight: 'bold'
  }
};


class OrgShirt extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number,
    shirts: PropTypes.array.isRequired,
    shirtSizes: PropTypes.object
  };
  static defaultProps = {
    shirts: []
  };
  render() {
    const {classes, id, shirts, shirtSizes} = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12} key={id + shirts + shirtSizes}>
            <div className={classes.image}>
              <img src="https://i.postimg.cc/1XMvZ54C/46482905-762860140729270-5836505868274761728-n.jpg" alt="orgShirt" className={classes.orgshirt} />
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="h5" className={classes.name}>
                  SWITS ORG SHIRT
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="h6">
                 PRICE
                  </Typography>
                </ListItemText>
                <ListItemText>
                  <Typography variant="h5" className={classes.name}>
                 Php 250.00
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="h6">
                 DESCRIPTION
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="subtitle2">
                It is a long established fact that a reader will be distracted by the readable content of a page
                  </Typography>
                </ListItemText>
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
}


const mapStateToProps = createStructuredSelector({
  shirt: makeSelectShirtOrganization(),
  shirtSizes: makeSelectShirtSizes(),
  meta: makeSelectShirtsMeta()
});

const mapDispatchToProps = {
  fetchSizes,
  fetchShirtOrganization
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchShirtOrganization(props.id);
  props.fetchSizes();
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles)
)(OrgShirt);
