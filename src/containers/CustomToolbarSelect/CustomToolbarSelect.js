import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';

import {fetchEdit} from 'redux/actions/edit';
import {archive} from 'redux/actions/archive';

import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// import {EditModal} from 'containers/EditModal/EditModal';

import style from './OrganizationList.scss';


class CustomToolbarSelect extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selectedRows: PropTypes.object.isRequired,
    fetchEdit: PropTypes.func.isRequired,
    archive: PropTypes.func.isRequired,
    dbTable: PropTypes.string.isRequired,
    data: PropTypes.array
  }

  handleEdit = () => {
    const {data, selectedRows, dbTable} = this.props;
    const tableData = data;
    const selectedIndex = selectedRows.data[0].index;
    const selectedId = tableData[selectedIndex]['id'];
    this.props.fetchEdit({table: dbTable, id: selectedId});
  };

  handleDelete = () => {
    const {data, selectedRows, dbTable} = this.props;
    const tableData = data;
    for (let i = 0; i < this.props.selectedRows.data.length; i += 1) {
      const selectedIndex = selectedRows.data[i].index;
      const selectedId = tableData[selectedIndex]['id'];
      console.log(selectedId);
      this.props.archive({table: dbTable, id: selectedId});
      // tableData.splice(selectedData[i].index, 1);
    }
  }

  render() {
    const {classes, selectedRows} = this.props;

    const selectedRowsLength = Object.keys(selectedRows.data);
    return (
      <div className={style.iconsDiv}>
        {selectedRowsLength < 1 ? (
          <Tooltip title={'Edit'}>
            <IconButton className={classes.iconButton} onClick={this.handleEdit}>
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

const mapDispatchToProps = {
  fetchEdit,
  archive
};

const withRedux = connect(null, mapDispatchToProps);

export default compose(
  withRedux,
  withStyles({name: 'CustomToolbarSelect'})
)(CustomToolbarSelect);
