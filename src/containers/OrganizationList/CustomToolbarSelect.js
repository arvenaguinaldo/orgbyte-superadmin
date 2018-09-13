import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import style from './OrganizationList.scss';

import EditOrganizationData from './EditOrganizationData';

class CustomToolbarSelect extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selectedRows: PropTypes.object.isRequired,
    data: PropTypes.array,
    changeHandler: PropTypes.func
  }
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleDelete = () => {
    const tableData = this.props.data;
    const selectedData = this.props.selectedRows.data;
    for (let i = this.props.selectedRows.data.length - 1; i >= 0; i -= 1) {
      tableData.splice(selectedData[i].index, 1);
    }
    const cols = ['Id', 'Name', 'Acronym', 'Recogniton No.', 'Date of Formation'];
    this.props.changeHandler(cols);
  }

  render() {
    const {classes, selectedRows} = this.props;

    const {open} = this.state;

    const selectedRowsLength = Object.keys(selectedRows.data);
    return (
      <div className={style.iconsDiv}>
        {open ? (<EditOrganizationData id={4} open={open} handleClose={this.handleClose} />) : (null)}
        {selectedRowsLength < 1 ? (
          <Tooltip title={'Edit'}>
            <IconButton className={classes.iconButton} onClick={this.handleClickOpen}>
              <EditIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
        ) : (null)}
        <Tooltip title={'Delete'}>
          <IconButton className={classes.iconButton} onClick={this.handleDelete}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles({name: 'CustomToolbarSelect'})(CustomToolbarSelect);
