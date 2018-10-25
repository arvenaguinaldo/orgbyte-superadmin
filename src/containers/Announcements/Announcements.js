import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MUIDataTable from 'mui-datatables';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AttechmentIcon from '@material-ui/icons/Attachment';
import Paper from '@material-ui/core/Paper';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {renderSelectField, renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {Typography} from '../../../node_modules/@material-ui/core';
import myStyles from './Announcements.scss';

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
    margin: theme.spacing.unit
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

class Announcements extends Component {
    static propTypes = {
      classes: PropTypes.object
    };
    render() {
      const {classes} = this.props;
      const columns = ['Subject', 'Recipients', 'Date', 'Author', 'Status'];

      const data = [
        ['Meeting for IT congress 2018', 'Officers', '12-21-2018', 'Lara Beatrice Hilario', 'Ongoing'],
        ['Meeting for IT congress 2018', 'Officers', '12-21-2018', 'Lara Beatrice Hilario', 'Ongoing']

      ];
      return (

        <LayoutWithTopbarAndSidebar>
          <Paper className={myStyles.Paper}>
            <Typography variant="h4" color="primary" gutterBottom>Announcements</Typography>
            <form>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12}>

                  <Grid container spacing={40}>

                    <Grid item xs={10} sm={10} md={5} >
                      <Field
                        name="subject"
                        component={renderTextField}
                        label="Subject"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={10} sm={10} md={5}>
                      <Field
                        name="recipients"
                        component={renderSelectField}
                        label="Recipients"
                        fullWidth
                      >
                        <MenuItem value={1}>Co-Admins</MenuItem>
                        <MenuItem value={2}>Members</MenuItem>
                      </Field>
                    </Grid>

                  </Grid>

                  <Button size="small" variant="contained" color="primary">
                    <AttechmentIcon className={classNames(classes.leftIcon, classes.iconSmall)} /> Add attachment
                  </Button>

                  <Grid container spacing={40}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        name="content"
                        component={renderTextField}
                        label="Message"
                        fullWidth
                        multiline
                        rows="9"
                      />
                    </Grid>
                  </Grid>
                  <div className={myStyles.actionsDiv}>
                    <Button size="small" variant="contained" color="primary">
                      Post
                    </Button>
                  </div>

                </Grid>
              </Grid>
            </form>
          </Paper>
          <div />
          <MUIDataTable
            title={'Existing Announcements'}
            data={data}
            columns={columns}
          />
        </LayoutWithTopbarAndSidebar>
      );
    }
}

export default compose(
  reduxForm({
    form: 'AnnouncementsForm',
    destroyOnUnmount: false
  }, null),
  withStyles(styles)
)(Announcements);
