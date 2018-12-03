import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Search from '@material-ui/icons/Search';
import Columns from '@material-ui/icons/ViewColumn';
import Filter from '@material-ui/icons/FilterList';
import Left from '@material-ui/icons/KeyboardArrowLeft';
import Right from '@material-ui/icons/KeyboardArrowRight';

import styles from './EmptyTable.scss';

class EmptyTable extends Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
  };
  render() {
    const {title, message} = this.props;
    return (
      <Paper className={styles.EmptyTable}>
        <div className={styles.TitleContainer}>
          <Typography variant="h6">
            {title}
          </Typography>
        </div>
        <div className={styles.ButtonContainer}>
          <Tooltip title={'Search'}>
            <IconButton>
              <Search />
            </IconButton>
          </Tooltip>
          <Tooltip title={'View Columns'}>
            <IconButton>
              <Columns />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Filter'}>
            <IconButton>
              <Filter />
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.PaginationContainer}>
          <span className={styles.PaginationSpan}>
            <Typography variant="caption">
                Rows per page:
            </Typography>
          </span>
          <span className={styles.PaginationSpan}>
            <Typography variant="caption">
                0-0 of 0
            </Typography>
          </span>
          <span className={styles.IconSpan}>
            <IconButton>
              <Left />
            </IconButton>
          </span>
          <span className={styles.IconSpan}>
            <IconButton>
              <Right />
            </IconButton>
          </span>
        </div>
        <div className={styles.MessageContainer}>
          <Typography variant="h6" className={styles.Message}>
            {message}
          </Typography>
        </div>
      </Paper>
    );
  }
}

export default EmptyTable;
