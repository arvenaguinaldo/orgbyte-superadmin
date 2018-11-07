import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Center from 'react-center';
import SwipeableViews from 'react-swipeable-views';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import {createStructuredSelector} from 'reselect';
import {makeSelectOrganization, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganization} from 'redux/actions/organizations';
import fetchInitialData from 'hoc/fetchInitialData';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';
import Announcement from './Announcements';
import Event from './Events';
import styles from './OrganizationProfile.scss';

function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class OrganizationProfile extends Component {
  static propTypes = {
    theme: PropTypes.object,
    organization: PropTypes.object
  };
  static defaultProps = {
    organization: {}
  };
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = (index) => {
    this.setState({value: index});
  };
  render() {
    const {theme, organization} = this.props;
    return (
      <div>
        <TopBarAndFooter>
          <Grid container spacing={0} >
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Card className={styles.OrganizationDetail}>
                <Center>
                  <Avatar
                    alt="SWITS"
                    src="https://i.postimg.cc/CxzJrZ0J/SWITS-Logo.png"
                    className={styles.OrgAvatar}
                  />
                </Center>
                <div className={styles.DetailContainer}>
                  <Typography variant="h6" className={styles.Text}>
                    {organization.name}
                  </Typography>
                </div>

                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text} gutterBottom>
                    President
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>Therelyn May Cruz  </Typography>
                </div>

                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text} gutterBottom>
                    Established
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>2001 </Typography>
                </div>

                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text} gutterBottom>
                    Contact
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>+63 906 1234 567 </Typography>
                </div>
              </Card>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <div className={styles.AppBarDiv}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                  >
                    <Tab label="Announcements" />
                    <Tab label="Events" />
                    <Tab label="Org Shirt" />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={this.state.value}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabContainer dir={theme.direction}>
                    <Announcement />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <Event />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>Item Three</TabContainer>
                </SwipeableViews>
              </div>
            </Grid>
          </Grid>
        </TopBarAndFooter>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  meta: makeSelectOrganizationsMeta()
});

const withRedux = connect(mapStateToProps, {fetchOrganization});

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchOrganization(params.id);
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles, {withTheme: true})
)(OrganizationProfile);
