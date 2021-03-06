import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Center from 'react-center';
import SwipeableViews from 'react-swipeable-views';
import Moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationToUserSide, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizationToUserSide} from 'redux/actions/organizations';
import fetchInitialData from 'hoc/fetchInitialData';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';
import Announcement from './Announcements';
import Event from './Events';
import OrgShirt from './OrgShirt';
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
  componentDidMount() {
    this.setState({id: this.state.id}); // eslint-disable-line
  }
  componentWillReceiveProps(nextProps) {
    try {
      if (typeof nextProps.organization.organizations.name !== 'undefined') {
        this.setState({id: nextProps.organization.organizations.id});
        this.setState({name: nextProps.organization.organizations.name});
        this.setState({user: nextProps.organization.user.first_name + ' ' + nextProps.organization.user.last_name});
        this.setState({contact: '+63' + nextProps.organization.user.contact_number});
        this.setState({email: nextProps.organization.user.email});
        this.setState({nature: nextProps.organization.organizations.organization_nature_name});
        this.setState({type: nextProps.organization.organizations.organization_type_name});
      }
    } catch (err) {
      console.log('Catch');
    }

  }
  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = (index) => {
    this.setState({value: index});
  };
  render() {
    Moment.locale('en');
    const {theme, organization} = this.props;
    if (!organization.organizations) {
      return null;
    }
    // if (!organization.organizations.logo_blobs) {
    //   return null;
    // }
    console.log(organization);
    return (
      <div>
        <TopBarAndFooter>
          <div style={{height: 50}} />
          <Grid container spacing={0} >
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Card className={styles.OrganizationDetail}>
                <Center>
                  <Avatar
                    alt={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + organization.organizations.logo_blobs[0].filename}
                    src={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + organization.organizations.logo_blobs[0].key}
                    className={styles.OrgAvatar}
                  />
                </Center>
                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text}>
                    Organization name
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>
                    {organization.organizations.name}
                  </Typography>
                </div>

                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text}>
                    President
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>
                    {organization.user.first_name + ' ' + organization.user.last_name}
                  </Typography>
                </div>

                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text}>
                    Established
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>
                    {Moment(this.state.dateOfFormation).format('MMMM DD, YYYY')}
                  </Typography>
                </div>

                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text}>
                    Contact
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>
                    {this.state.contact}
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>
                    {this.state.email}
                  </Typography>
                </div>
                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text}>
                     Type
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>
                    {(this.state.type)}
                  </Typography>
                </div>
                <div className={styles.DetailContainer}>
                  <Typography variant="subtitle1" className={styles.Text}>
                    Nature
                  </Typography>
                  <Typography variant="h6" className={styles.Text}>
                    {(this.state.nature)}
                  </Typography>
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
                    <Announcement id={this.state.id} />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <Event id={this.state.id} />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <OrgShirt id={this.state.id} />
                  </TabContainer>
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
  organization: makeSelectOrganizationToUserSide(),
  meta: makeSelectOrganizationsMeta()
});

const withRedux = connect(mapStateToProps, {fetchOrganizationToUserSide});

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchOrganizationToUserSide(params.acronym);
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles, {withTheme: true})
)(OrganizationProfile);
