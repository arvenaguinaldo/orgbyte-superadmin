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
    <Typography className={OrganizationListStyles.textField_No}>{this.props.data[this.index][0]}</Typography>,
    <TextField defaultValue={this.props.data[this.index][1]} className={OrganizationListStyles.textField_RecogNo} />,
    <TextField defaultValue={this.props.data[this.index][2]} className={OrganizationListStyles.textField_Organization} />,
    <TextField defaultValue={this.props.data[this.index][3]} className={OrganizationListStyles.textField_Type} />,
    <TextField defaultValue={this.props.data[this.index][4]} className={OrganizationListStyles.textField_College} />,
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
  changeHandler: PropTypes.func
};
export default withStyles({name: 'CustomToolbarSelect'})(CustomToolbarSelect);
