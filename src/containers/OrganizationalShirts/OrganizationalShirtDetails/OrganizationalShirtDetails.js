import React, {Component} from 'react';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';


import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';
import {makeSelectShirt, makeSelectShirtSizes, makeSelectShirtsMeta} from 'redux/selectors/shirts';
import {fetchShirt} from 'redux/actions/shirts';
import {fetchSizes} from 'redux/actions/shirts';
import fetchInitialData from 'hoc/fetchInitialData';

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
  static propTypes = {
    shirt: PropTypes.object.isRequired,
    shirtSizes: PropTypes.object,
    organization: PropTypes.object
  }
  static defaultProps = {
    shirt: {}
  };
  render() {
    const {shirt, organization, shirtSizes} = this.props;
    const style = {
      height: 500,
      marginTop: '-40px',
      marginLeft: '30px'
    };

    if (!shirt.image_blobs) {
      return null;
    }
    return (
      <LayoutWithTopbarAndSidebar>
        <Paper className={styles.Paper} id={organization.id}>
          <Typography variant="h4" color="secondary" >OrganizationalShirt</Typography>
          <Grid container spacing={0}>

            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>
                <Grid item xs={10} sm={10} md={5} >
                  <div className={styles.detailsDiv}>
                    <ListItem>
                      <Typography variant="h6" className={styles.listTitle}>Name:</Typography>
                      <ListItemText primary={<Typography variant="h6">{shirt.name}</Typography>} />
                    </ListItem>
                    <ListItem>
                      <Typography variant="h6" className={styles.listTitle}>Sizes:</Typography>
                      <ListItemText primary={
                        <Typography variant="h6">
                          {shirtSizes.xxsmall && 'XXS '}
                          {shirtSizes.xsmall && 'XS '}
                          {shirtSizes.small && 'S '}
                          {shirtSizes.medium && 'M '}
                          {shirtSizes.large && 'L '}
                          {shirtSizes.xlarge && 'XL '}
                          {shirtSizes.xxlarge && 'XXL '}
                          {shirtSizes.xxxlarge && '3XL '}
                          {shirtSizes.xxxxlarge && '4XL '}
                        </Typography>

                      }
                      />
                    </ListItem>
                    <ListItem>
                      <Typography variant="h6" className={styles.listTitle}>Price:</Typography>
                      <ListItemText primary={<Typography variant="h6">{'Php  ' + parseFloat(shirt.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Typography>} />
                    </ListItem>
                  </div>
                  <Typography variant="body1" color="secondary" align="justify" className={styles.eventDescription}>
                    {shirt.description}
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={6} >
                  <CardMedia className={styles.eventImage}>
                    <img
                      src={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + shirt.image_blobs[0].key}
                      style={style}
                      alt={shirt.name}
                    />
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

const mapStateToProps = createStructuredSelector({
  shirt: makeSelectShirt(),
  organization: makeSelectCurrentOrganization(),
  shirtSizes: makeSelectShirtSizes(),
  meta: makeSelectShirtsMeta()
});

const mapDispatchToProps = {
  fetchSizes,
  fetchShirt
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchShirt();
  props.fetchSizes();
});

export default compose(
  withRedux,
  withFetchInitialData
)(Home);
