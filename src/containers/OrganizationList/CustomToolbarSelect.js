import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Cancel';
import OrganizationListStyles from './OrganizationList.scss';


class CustomToolbarSelect extends React.Component {
handleEdit = () => {
  const styles = {
    button: {
      width: 30,
      height: 30,
      padding: 0
    },
    icon: {
      width: 15,
      height: 15
    }
  };
  const {classes} = this.props;
  this.index = this.props.selectedRows.data[0].index;
  this.data = this.props.selectedRows.data;
  this.props.data[this.index] = [
<<<<<<< HEAD
    <Typography className={OrganizationListStyles.textField_No}>{this.props.data[this.index][0]}</Typography>,
=======
    <Typography className={OrganizationListStyles.textField_No} defaultValue={this.props.data[this.index][0]}>{this.props.data[this.index][0]}</Typography>,
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
    <TextField defaultValue={this.props.data[this.index][1]} className={OrganizationListStyles.textField_RecogNo} />,
    <TextField defaultValue={this.props.data[this.index][2]} className={OrganizationListStyles.textField_Organization} />,
    <TextField defaultValue={this.props.data[this.index][3]} className={OrganizationListStyles.textField_Type} />,
    <TextField defaultValue={this.props.data[this.index][4]} className={OrganizationListStyles.textField_College} />,
<<<<<<< HEAD
    <TextField value={this.props.data[this.index][5]} className={OrganizationListStyles.textField_Admin} />,
    <div className={OrganizationListStyles.actionsDiv}>
      <IconButton style={styles.button} iconstyle={styles.icon} className={classes.button} aria-label="Delete"><SaveIcon /></IconButton>,
      <IconButton onClick={this.handleCancel}style={styles.button} iconstyle={styles.icon} className={classes.button} aria-label="Delete"><ClearIcon /></IconButton>
    </div>
  ];
  this.props.changeHandler(['No', 'Recognition no.', 'Organization', 'Type', 'College', 'Admin', 'Actions']);
}
handleDelete = () => {
}
handleCancel = () => {
  this.index = this.props.selectedRows.data[0].index;
  const mydata = this.props.data[this.index][0];
  this.props.changeHandler(['No', 'Recognition no.', 'Organization', 'Type', 'College', 'Admin', 'A'], mydata);
=======
    <TextField defaultValue={this.props.data[this.index][5]} className={OrganizationListStyles.textField_Admin} />,
    <div className={OrganizationListStyles.actionsDiv}>
      <IconButton style={styles.button} iconstyle={styles.icon} className={classes.button} aria-label="Delete"><SaveIcon /></IconButton>,
      <IconButton onClick={this.handleCancel} style={styles.button} iconstyle={styles.icon} className={classes.button} aria-label="Delete"><ClearIcon /></IconButton>
    </div>
  ];
  const columnLength = this.props.columns.length;
  if (this.props.columns[columnLength - 1] !== 'Actions') { this.props.columns.push('Actions'); }
  const cols = ['No', 'Full Name', 'Position', 'Organization', 'Email', 'Contact Number', 'Actions'];
  this.props.changeHandler(cols);
}
handleDelete = () => {
  for (let x = 0; x < this.props.selectedRows.data.length; x += 1) {
    this.props.data.splice(this.props.selectedRows.data[x].index, 1);
    console.log(this.props.selectedRows.data[x].index);
  }
  const cols = ['No', 'Full Name', 'Position', 'Organization', 'Email', 'Contact Number'];
  this.props.changeHandler(cols);
}
handleCancel = () => {
  this.index = this.props.selectedRows.data[0].index;
  this.props.data[this.index] = [
    this.props.data[this.index][0].props.children,
    this.props.data[this.index][1].props.defaultValue,
    this.props.data[this.index][2].props.defaultValue,
    this.props.data[this.index][3].props.defaultValue,
    this.props.data[this.index][4].props.defaultValue,
    this.props.data[this.index][5].props.defaultValue
  ];
  const cols = ['No', 'Full Name', 'Position', 'Organization', 'Email', 'Contact Number'];
  this.props.changeHandler(cols);
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
}
render() {
  const {classes} = this.props;
  return (
    <div className={OrganizationListStyles.iconsDiv}>
      <Tooltip title={'Edit'}>
        <IconButton className={classes.iconButton} onClick={this.handleEdit}>
          <EditIcon className={classes.deleteIcon} />
        </IconButton>
      </Tooltip>,
      <Tooltip title={'Delete'}>
        <IconButton className={classes.iconButton} onClick={this.handleDelete}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
}
CustomToolbarSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedRows: PropTypes.object.isRequired,
  data: PropTypes.array,
<<<<<<< HEAD
  changeHandler: PropTypes.func
=======
  changeHandler: PropTypes.func,
  columns: PropTypes.array
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
};
export default withStyles({name: 'CustomToolbarSelect'})(CustomToolbarSelect);
