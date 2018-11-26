import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import JsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import idtemplate from 'assets/images/membership-id-template.png';
import style from './MembershipPage.scss';

class ViewModal extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    members: PropTypes.array.isRequired,
    id: PropTypes.number,
    organization: PropTypes.object
  };
  onGenerateId = (e, member, id) => {
    const {organization} = this.props;
    e.preventDefault();
    console.log(id);
    const qrcode = require('yaqrcode');
    const base64 = qrcode(id);

    const doc = new JsPDF('p', 'px', [2054, 3373]);

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    doc.addImage(idtemplate, 'PNG', 0, 0, width, height);

    // Student Name
    doc.setFontSize(150);
    doc.setTextColor('#1F1F1F');
    doc.text(member.first_name.toUpperCase() + ' ' + member.last_name.toUpperCase(), width / 2, 1423, null, null, 'center');

    // Student Number
    doc.setFontSize(150);
    doc.setTextColor('#1F1F1F');
    doc.text(member.student_number, width / 2, 1560, null, null, 'center');

    // Organization Name
    doc.setFontSize(125);
    doc.setTextColor('#1F1F1F');
    const organizationName = doc.splitTextToSize(organization.name, 1750);
    doc.text(organizationName, width / 2, 1671, null, null, 'center');

    doc.addImage(base64, 'GIF', 625, 2019, 785, 785);
    doc.addImage('https://i.postimg.cc/fyCSqmq1/Swits.png', 'PNG', 930, 2320, 200, 200); // LEFT IMAGE

    doc.save(member.first_name.toUpperCase() + member.last_name.toUpperCase() + 'MembershipID'); // Display in iframe
    // const membershipId = membershipIdURI.substring(28);

    // return membershipId;
  };

  render() {
    const {fullScreen, members, id} = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle>{'Member details'}</DialogTitle>
          {members.filter(member => (id === member.id ? member : null)).map((member) => {
            return (
              <div key={member.id} className={style.ModalContainer}>
                <DialogContent>
                  <Grid container spacing={0}>
                    <Grid item md={7} xs={12} sm={12}>
                      <QRCode value={member.student_number} size={420} />
                    </Grid>
                    <Grid item md={5} xs={12} sm={12}>
                      <List disablePadding>
                        <ListItem>
                          <ListItemText
                            primary={member.student_number}
                            secondary="Student Number"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={member.first_name + ' ' + member.last_name}
                            secondary="Name"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={member.year_level + member.section + ' - G' + member.group}
                            secondary="Year/Section/Group"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={member.address}
                            secondary="Address"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={member.email}
                            secondary="Email"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={'+63' + member.contact_number}
                            secondary="Contact number"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={e => this.onGenerateId(e, member, member.student_number)} color="primary" autoFocus>
                    Download
                  </Button>
                </DialogActions>
              </div>
            );
          })
          }
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organization: makeSelectCurrentOrganization()
});

const withRedux = connect(mapStateToProps);

export default compose(
  withRedux,
  withMobileDialog()
)(ViewModal);
