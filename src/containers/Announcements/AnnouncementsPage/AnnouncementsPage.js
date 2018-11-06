import React, {Component} from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


// import myStyles from './Announcements.scss';

const styles = theme => ({
  root: {
    width: '100%'
  },
  Paper: {
    padding: '50px'
  },
  sendButton: {
    flex: 1
  },
  grid: {
    backgroundColor: '#5F1D24'
  },
  button: {
    margin: 20
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class AnnouncementsPage extends Component {
  static propTypes = {
    classes: PropTypes.object
  };
  render() {
    const columns = ['Subject', 'Recipients', 'Date', 'Author', 'Status'];
    const {classes} = this.props;
    const data = [
      ['Meeting for IT congress 2018', 'Officers', '12-21-2018', 'Lara Beatrice Hilario', 'Ongoing'],
      ['Meeting for IT congress 2018', 'Officers', '12-21-2018', 'Lara Beatrice Hilario', 'Ongoing']
    ];
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4">
            Add Announcement
        </Typography>
        <Button component={Link} to="/admin/addannouncements" variant="contained" color="primary" className={classes.button} >
          Add announcement
        </Button>
        <MUIDataTable
          title={'Existing Announcements'}
          data={data}
          columns={columns}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default withStyles(styles)(AnnouncementsPage);
