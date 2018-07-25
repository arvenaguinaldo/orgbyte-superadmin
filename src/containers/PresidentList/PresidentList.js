import React from 'react';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import classNames from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import paginationstyles from './PresidentList.scss';

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}
const columnData = [
  {id: 'no', numeric: true, disablePadding: false, label: 'No.'},
  {id: 'name', numeric: false, disablePadding: false, label: 'Full Name'},
  {id: 'positionOnOrganization', numeric: false, disablePadding: false, label: 'Position'},
  {id: 'organization', numeric: false, disablePadding: false, label: 'Organization'},
  {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
  {id: 'contactNumber', numeric: false, disablePadding: false, label: 'Contact Number'},
  {id: 'actions', numeric: false, disablePadding: false, label: 'Actions'}
];
class EnhancedTableHead extends React.Component {
   static propTypes = {
     onRequestSort: PropTypes.func.isRequired,
     order: PropTypes.string.isRequired,
     orderBy: PropTypes.string.isRequired
   };
    createSortHandler = property => (event) => {
      this.props.onRequestSort(event, property);
    };
    render() {
      const {order, orderBy} = this.props;
      return (
        <TableHead>
          <TableRow >
            {columnData.map((column) => {
              return (
                <TableCell
                  style={{backgroundColor: '#D3D3D3', color: '#000', fontSize: 20}}
                  key={column.id}
                  numeric={column.numeric}
                  padding={column.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={this.createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
}
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});
let EnhancedTableToolbar = (props) => {
  const {numSelected, classes} = props;
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
  };
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Organization List
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});
class TablePaginationActions extends React.Component {
    static propTypes = {
      classes: PropTypes.object.isRequired,
      count: PropTypes.number.isRequired,
      onChangePage: PropTypes.func.isRequired,
      page: PropTypes.number.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
      theme: PropTypes.object.isRequired
    };
    handleFirstPageButtonClick = (event) => {
      this.props.onChangePage(event, 0);
    };
    handleBackButtonClick = (event) => {
      this.props.onChangePage(event, this.props.page - 1);
    };
    handleNextButtonClick = (event) => {
      this.props.onChangePage(event, this.props.page + 1);
    };
    handleLastPageButtonClick = (event) => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };
    render() {
      const {classes, count, page, rowsPerPage, theme} = this.props;
      return (
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
  TablePaginationActions,
);
let counter = 0;
function createData(no, fullName, positionOnOrganization, organization, email, contactNumber, actions) {
  counter += 1;
  return {counter, no, fullName, positionOnOrganization, organization, email, contactNumber, actions};
}
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

class PresidentList extends React.Component {
  constructor(props) {
    PresidentList.propTypes = {
      classes: PropTypes.object.isRequired
    };
    const {classes} = props;
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'no',
      selected: [],
      data: [
        createData(1, 'Lara Beatrice Hilario', 'PRESIDENT', 'SWITS', 'larabeatricehilario@gmail.com', '09161234567', <div><IconButton className={classes.button} aria-label="Delete">
          <EditIcon />
        </IconButton><IconButton className={classes.button} aria-label="Delete">
          <DeleteIcon />
        </IconButton></div>),
        createData(2, 'Arven Aguinaldo', 'CEO', 'Borek Laser', 'arvenaguinaldo@gmail.com', '09161234567', <div><IconButton className={classes.button} aria-label="Delete">
          <EditIcon />
        </IconButton><IconButton className={classes.button} aria-label="Delete">
          <DeleteIcon />
        </IconButton></div>),
        createData(3, '', '', '', ''),
        createData(4, '', '', '', ''),
        createData(5, '', '', '', ''),
        createData(6, '', '', '', ''),
        createData(7, '', '', '', ''),
        createData(8, '', '', '', ''),
        createData(9, '', '', '', ''),
        createData(10, '', '', '', ''),
        createData(11, '', '', '', ''),
        createData(12, '', '', '', ''),
        createData(13, '', '', '', ''),
        createData(14, '', '', '', ''),
        createData(15, '', '', '', ''),
        createData(16, '', '', '', '')
      ].sort((a, b) => (a.no < b.no ? -1 : 1)),
      page: 0,
      rowsPerPage: 10
    };
  }
    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
      this.setState({order, orderBy});
    };
    handleChangePage = (event, page) => {
      this.setState({page});
    };
    handleChangeRowsPerPage = (event) => {
      this.setState({rowsPerPage: event.target.value});
    };
    render() {
      const {classes} = this.props;
      const {data, order, orderBy, rowsPerPage, page} = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, (data.length - page) * rowsPerPage);
      return (
        <LayoutWithTopbarAndSidebar>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                  .map((n) => {
                    return (
                      <TableRow className={classes.row} key={n.id}>
                        <CustomTableCell component="th" scope="row" style={{width: 60}}>{n.no}</CustomTableCell>
                        <CustomTableCell style={{width: 300}}>{n.fullName}</CustomTableCell>
                        <CustomTableCell style={{width: 400}}>{n.positionOnOrganization}</CustomTableCell>
                        <CustomTableCell style={{width: 300}}>{n.organization}</CustomTableCell>
                        <CustomTableCell style={{width: 300}}>{n.email}</CustomTableCell>
                        <CustomTableCell style={{width: 300}}>{n.contactNumber}</CustomTableCell>
                        <CustomTableCell style={{width: 200}}>{n.actions}</CustomTableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{height: 48 * emptyRows}}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    className={paginationstyles.paginationdiv}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </LayoutWithTopbarAndSidebar>
      );
    }
}

export default withStyles(styles)(PresidentList);
