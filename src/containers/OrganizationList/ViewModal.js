import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import {compose} from 'recompose';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import style from './OrganizationList.scss';

class ViewModal extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    organizations: PropTypes.array.isRequired,
    id: PropTypes.number
  };


  render() {
    const {fullScreen, organizations, id} = this.props;
    console.log(organizations);
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle>{'Member details'}</DialogTitle>
          {organizations.filter(organization => (id === organization.id ? organization : null)).map((organization) => {
            return (
              <div key={organization.id} className={style.ModalContainer}>
                <DialogContent>
                  <Grid container spacing={0}>
                    <Grid item md={7} xs={12} sm={12}>
                      <img
                        src={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + organization.logo_blobs[0].key}
                        alt="orgShirt"
                      />
                    </Grid>
                    <Grid item md={5} xs={12} sm={12}>
                      <List disablePadding>
                        <ListItem>
                          <ListItemText
                            primary={organization.name}
                            secondary="Name"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={organization.acronym}
                            secondary="Acronym"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={organization.recognition_number}
                            secondary="Recognition Number"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={organization.formation}
                            secondary="Date of Formation"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={organization.organization_type_name}
                            secondary="Type"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={organization.college_name}
                            secondary="College"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </DialogContent>
              </div>
            );
          })
          }
        </Dialog>
      </div>
    );
  }
}


export default compose(
  withMobileDialog()
)(ViewModal);
